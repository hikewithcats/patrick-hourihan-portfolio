"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { QUOTE_NEEDS } from "@/lib/quote";
import { siteConfig } from "@/lib/site";

type Field = "name" | "email" | "phone" | "need";
type Status = "idle" | "sending" | "sent" | "failed";

const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function validate(values: Record<string, string>) {
  const errors: Partial<Record<Field, string>> = {};
  if (!values.name) errors.name = "Please add your name.";
  if (values.email && !emailPattern.test(values.email)) {
    errors.email = "Please check your email address.";
  }
  if (values.phone && values.phone.replace(/\D/g, "").length < 7) {
    errors.phone = "Please check your phone number.";
  }
  if (!values.email && !values.phone) {
    errors.email = "Please add an email or a phone number.";
  }
  if (!values.need) errors.need = "Please choose what you need.";
  return errors;
}

/** Keeps what the visitor typed if the form cannot send. */
function mailtoFrom(values: Record<string, string>) {
  const body = [
    `Name: ${values.name}`,
    `Business: ${values.business}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone}`,
    `Needs: ${values.need}`,
    `Current website: ${values.website}`,
    "",
    values.message,
  ].join("\n");
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent("Website quote request")}&body=${encodeURIComponent(body)}`;
}

export default function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [formError, setFormError] = useState("");
  const [submitted, setSubmitted] = useState<Record<string, string>>({});
  const outcome = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "sent" || status === "failed") outcome.current?.focus();
  }, [status]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(
      Array.from(new FormData(form), ([key, value]) => [key, String(value).trim()]),
    );

    const found = validate(values);
    setErrors(found);
    setFormError("");
    const firstInvalid = (["name", "email", "phone", "need"] as Field[]).find((f) => found[f]);
    if (firstInvalid) {
      (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }

    setSubmitted(values);
    setStatus("sending");
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        setStatus("sent");
        return;
      }
      if (response.status === 400) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        setFormError(data?.error ?? "Please check the form and try again.");
        setStatus("idle");
        return;
      }
      setStatus("failed");
    } catch {
      setStatus("failed");
    }
  }

  if (status === "sent") {
    const firstName = submitted.name?.split(/\s+/)[0];
    return (
      <div
        ref={outcome}
        tabIndex={-1}
        role="status"
        className="rounded-2xl bg-surface p-6 text-fg outline-none sm:p-8"
      >
        <h3 className="text-3xl">Thanks, {firstName}.</h3>
        <p className="mt-3 text-fg-dim">
          Your request is on its way to me. I&apos;ll review it and get back to
          you personally.
        </p>
        <p className="mt-4 text-fg-dim">
          Want to talk sooner? Call or text{" "}
          <a href={`tel:${siteConfig.phone.e164}`} className="linkline whitespace-nowrap">
            {siteConfig.phone.display}
          </a>
          .
        </p>
      </div>
    );
  }

  const describe = (field: Field) => (errors[field] ? `${field}-error` : undefined);

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-label="Free website quote request"
      className="rounded-2xl bg-surface p-5 text-fg sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Label text="Your name" htmlFor="name" className="sm:col-span-1">
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            autoCapitalize="words"
            maxLength={120}
            required
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={describe("name")}
            className="field"
          />
          <FieldError id="name-error" message={errors.name} />
        </Label>

        <Label text="Business name" optional htmlFor="business">
          <input
            id="business"
            name="business"
            type="text"
            autoComplete="organization"
            autoCapitalize="words"
            maxLength={160}
            className="field"
          />
        </Label>

        <Label text="Email" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={254}
            aria-invalid={!!errors.email}
            aria-describedby={describe("email")}
            className="field"
          />
          <FieldError id="email-error" message={errors.email} />
        </Label>

        <Label text="Phone" htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={40}
            aria-invalid={!!errors.phone}
            aria-describedby={describe("phone")}
            className="field"
          />
          <FieldError id="phone-error" message={errors.phone} />
        </Label>
        <p className="-mt-2 text-sm text-fg-faint sm:col-span-2">
          Email or phone, whichever you prefer.
        </p>

        <Label text="What do you need?" htmlFor="need" className="sm:col-span-2">
          <select
            id="need"
            name="need"
            required
            aria-required="true"
            defaultValue=""
            aria-invalid={!!errors.need}
            aria-describedby={describe("need")}
            className="field"
          >
            <option value="" disabled>
              Choose one
            </option>
            {QUOTE_NEEDS.map((need) => (
              <option key={need} value={need}>
                {need}
              </option>
            ))}
          </select>
          <FieldError id="need-error" message={errors.need} />
        </Label>

        <Label text="Current website" optional htmlFor="website" className="sm:col-span-2">
          <input
            id="website"
            name="website"
            type="text"
            inputMode="url"
            autoComplete="url"
            autoCapitalize="none"
            autoCorrect="off"
            maxLength={300}
            placeholder="yourbusiness.com"
            className="field"
          />
        </Label>

        <Label
          text="Tell me a little about your business and goals"
          optional
          htmlFor="message"
          className="sm:col-span-2"
        >
          <textarea id="message" name="message" rows={4} maxLength={5000} className="field" />
        </Label>

        {/* Honeypot: hidden from people, tempting to bots. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Fax
            <input name="fax" type="text" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
      </div>

      {formError && (
        <p role="alert" className="mt-4 text-sm font-medium text-[#b3261e]">
          {formError}
        </p>
      )}

      {status === "failed" && (
        <div
          ref={outcome}
          tabIndex={-1}
          role="alert"
          className="mt-5 rounded-xl border border-accent bg-bg p-4 outline-none"
        >
          <p className="font-semibold">Your request didn&apos;t go through.</p>
          <p className="mt-1 text-[0.9375rem] leading-snug text-fg-dim">
            That&apos;s on my end, and what you typed is still here. You can send
            it by email with one tap, or call or text me.
          </p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <a href={mailtoFrom(submitted)} className="btn btn-primary">
              Send by Email
            </a>
            <a href={`tel:${siteConfig.phone.e164}`} className="btn btn-quiet">
              Call {siteConfig.phone.display}
            </a>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn btn-primary mt-5 w-full"
      >
        {status === "sending"
          ? "Sending..."
          : status === "failed"
            ? "Try Sending Again"
            : "Get My Free Quote"}
      </button>
      <p className="mt-3 text-center text-sm text-fg-faint">
        I only use your details to respond to this request.
      </p>
    </form>
  );
}

function Label({
  text,
  htmlFor,
  optional = false,
  className = "",
  children,
}: {
  text: string;
  htmlFor: string;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="text-[0.9375rem] font-medium">
        {text}
        {optional && <span className="font-normal text-fg-faint"> (optional)</span>}
      </label>
      {children}
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-sm font-medium text-[#b3261e]">
      {message}
    </p>
  );
}
