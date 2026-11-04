import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import worker, { type Env } from "./index.ts";

const URL_QUOTE = "https://patrickhourihan.com/api/quote";
const noEmail = { name: "Sam Rivera", need: "New website" };
const valid = { ...noEmail, email: "sam@example.com" };

type Call = { url: string; init: RequestInit };
let calls: Call[];
let resendStatus: number | "network-error";
const realFetch = globalThis.fetch;

beforeEach(() => {
  calls = [];
  resendStatus = 200;
  globalThis.fetch = (async (url: string, init: RequestInit) => {
    calls.push({ url, init });
    if (resendStatus === "network-error") throw new Error("down");
    return new Response("{}", { status: resendStatus });
  }) as typeof fetch;
});
afterEach(() => {
  globalThis.fetch = realFetch;
});

const env = (overrides: Partial<Env> = {}): Env => ({
  ASSETS: { fetch: async () => new Response("static page") },
  RESEND_API_KEY: "test-key",
  QUOTE_TO: "patrick@example.com",
  QUOTE_FROM: "Site <quotes@example.com>",
  ...overrides,
});

const post = (body: unknown, headers: Record<string, string> = {}) =>
  new Request(URL_QUOTE, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

const sentEmail = () => JSON.parse(calls[0].init.body as string);

test("delivers a valid request to the configured inbox with reply-to", async () => {
  const res = await worker.fetch(post({ ...valid, business: "Rivera Plumbing" }), env());
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });
  assert.equal(calls[0].url, "https://api.resend.com/emails");
  const email = sentEmail();
  assert.deepEqual(email.to, ["patrick@example.com"]);
  assert.equal(email.reply_to, "sam@example.com");
  assert.equal(email.subject, "Quote request: New website (Rivera Plumbing)");
});

test("a phone number alone is enough, and omits reply-to", async () => {
  const res = await worker.fetch(post({ ...noEmail, phone: "(413) 555-0100" }), env());
  assert.equal(res.status, 200);
  assert.equal("reply_to" in sentEmail(), false);
});

test("rejects missing contact details, name, need, and bad formats without sending", async () => {
  const bad = [
    noEmail,
    { ...valid, name: "   " },
    { ...valid, need: "Free money" },
    { ...valid, email: "not-an-email" },
    { ...valid, phone: "12" },
    "this is not json",
    "null",
  ];
  for (const body of bad) {
    const res = await worker.fetch(post(body), env());
    assert.equal(res.status, 400, JSON.stringify(body));
  }
  assert.equal(calls.length, 0);
});

test("honeypot reports success but sends nothing", async () => {
  const res = await worker.fetch(post({ ...valid, fax: "bot" }), env());
  assert.equal(res.status, 200);
  assert.equal(calls.length, 0);
});

test("escapes HTML and strips header injection from the subject", async () => {
  await worker.fetch(
    post({
      ...valid,
      business: "Acme\r\nBcc: victim@example.com",
      message: "<script>alert(1)</script>",
    }),
    env(),
  );
  const email = sentEmail();
  assert.equal(/[\r\n]/.test(email.subject), false);
  assert.equal(email.html.includes("<script>"), false);
  assert.ok(email.html.includes("&lt;script&gt;"));
});

test("blocks other origins and allows our own", async () => {
  const blocked = await worker.fetch(post(valid, { Origin: "https://evil.example" }), env());
  assert.equal(blocked.status, 403);
  const sandboxed = await worker.fetch(post(valid, { Origin: "null" }), env());
  assert.equal(sandboxed.status, 403);
  assert.equal(calls.length, 0);
  const allowed = await worker.fetch(post(valid, { Origin: "https://patrickhourihan.com" }), env());
  assert.equal(allowed.status, 200);
});

test("rejects oversized bodies and non-POST methods", async () => {
  const big = await worker.fetch(post({ ...valid, message: "x".repeat(25_000) }), env());
  assert.equal(big.status, 413);
  const get = await worker.fetch(new Request(URL_QUOTE), env());
  assert.equal(get.status, 405);
  assert.equal(get.headers.get("Allow"), "POST");
});

test("returns 503 when email is not configured, so the form can fall back", async () => {
  const res = await worker.fetch(post(valid), env({ RESEND_API_KEY: undefined }));
  assert.equal(res.status, 503);
  assert.equal(calls.length, 0);
});

test("returns 502 when Resend fails or cannot be reached", async () => {
  resendStatus = 500;
  assert.equal((await worker.fetch(post(valid), env())).status, 502);
  resendStatus = "network-error";
  assert.equal((await worker.fetch(post(valid), env())).status, 502);
});

test("returns 429 when the rate limit is exceeded, without sending", async () => {
  const res = await worker.fetch(
    post(valid),
    env({ QUOTE_LIMITER: { limit: async () => ({ success: false }) } }),
  );
  assert.equal(res.status, 429);
  assert.equal(calls.length, 0);
});

test("everything else is served from static assets", async () => {
  const res = await worker.fetch(new Request("https://patrickhourihan.com/"), env());
  assert.equal(await res.text(), "static page");
  assert.equal(calls.length, 0);
});
