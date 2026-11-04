/**
 * Cloudflare Worker for patrickhourihan.com.
 *
 * Everything is the static export in `out/`, served through the ASSETS binding,
 * except POST /api/quote, which emails a quote request to Patrick through
 * Resend. wrangler.jsonc routes only /api/* here first, so static pages never
 * pay for a Worker invocation.
 *
 * Secret:   RESEND_API_KEY (`npx wrangler secret put RESEND_API_KEY`)
 * Vars:     QUOTE_TO, QUOTE_FROM (see wrangler.jsonc)
 *
 * Until the secret exists this returns 503, and the form offers a prefilled
 * email plus call/text instead, so a visitor is never stuck.
 */

import { QUOTE_NEEDS } from "../lib/quote.ts";

export interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  RESEND_API_KEY?: string;
  QUOTE_TO?: string;
  QUOTE_FROM?: string;
  QUOTE_LIMITER?: { limit(options: { key: string }): Promise<{ success: boolean }> };
}

const MAX_BODY_CHARS = 20_000;
const SEND_TIMEOUT_MS = 10_000;

const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...headers },
  });

const text = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

/** Strips control characters so visitor input can never inject email headers. */
const oneLine = (value: string) => value.replace(/[\u0000-\u001f\u007f]+/g, " ").trim();

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );

async function handleQuote(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") {
    return json({ ok: false, error: "Method not allowed." }, 405, { Allow: "POST" });
  }

  // Browsers always send Origin on a cross-site POST; only our own pages may submit.
  const origin = request.headers.get("Origin");
  if (origin && origin !== new URL(request.url).origin) {
    return json({ ok: false, error: "Not allowed." }, 403);
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_CHARS) {
    return json({ ok: false, error: "That message is too long." }, 413);
  }

  let data: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") throw new Error("not an object");
    data = parsed as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  // Honeypot: a hidden field people never fill in. Report success and drop it.
  if (text(data.fax, 200)) return json({ ok: true });

  const name = oneLine(text(data.name, 120));
  const business = oneLine(text(data.business, 160));
  const email = oneLine(text(data.email, 254));
  const phone = oneLine(text(data.phone, 40));
  const need = oneLine(text(data.need, 60));
  const website = oneLine(text(data.website, 300));
  const message = text(data.message, 5000);

  if (!name) return json({ ok: false, error: "Please add your name." }, 400);
  if (!QUOTE_NEEDS.includes(need)) {
    return json({ ok: false, error: "Please choose what you need." }, 400);
  }
  if (!email && !phone) {
    return json({ ok: false, error: "Please add an email or phone number." }, 400);
  }
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ ok: false, error: "Please check your email address." }, 400);
  }
  if (phone && phone.replace(/\D/g, "").length < 7) {
    return json({ ok: false, error: "Please check your phone number." }, 400);
  }

  if (env.QUOTE_LIMITER) {
    const key = request.headers.get("CF-Connecting-IP") ?? "unknown";
    const { success } = await env.QUOTE_LIMITER.limit({ key });
    if (!success) return json({ ok: false, error: "Too many requests." }, 429);
  }

  if (!env.RESEND_API_KEY || !env.QUOTE_TO || !env.QUOTE_FROM) {
    console.error("quote: email is not configured");
    return json({ ok: false, error: "Email is not configured." }, 503);
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Business", business || "Not provided"],
    ["Email", email || "Not provided"],
    ["Phone", phone || "Not provided"],
    ["Needs", need],
    ["Current website", website || "Not provided"],
    ["Message", message || "Not provided"],
  ];

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.QUOTE_FROM,
        to: [env.QUOTE_TO],
        ...(email ? { reply_to: email } : {}),
        subject: `Quote request: ${need}${business ? ` (${business})` : ""}`,
        text: rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
        html: `<h2>New website quote request</h2><table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">${rows
          .map(
            ([label, value]) =>
              `<tr><td style="color:#555;vertical-align:top"><strong>${escapeHtml(label)}</strong></td><td style="white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
          )
          .join("")}</table>`,
      }),
      signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
    });
    if (!response.ok) {
      // Status only: never log what the visitor wrote.
      console.error(`quote: Resend responded ${response.status}`);
      return json({ ok: false, error: "The email could not be sent." }, 502);
    }
  } catch {
    console.error("quote: could not reach Resend");
    return json({ ok: false, error: "The email could not be sent." }, 502);
  }

  return json({ ok: true });
}

const worker = {
  fetch(request: Request, env: Env): Promise<Response> {
    if (new URL(request.url).pathname === "/api/quote") return handleQuote(request, env);
    return env.ASSETS.fetch(request);
  },
};

export default worker;
