import QuoteForm from "@/components/sections/QuoteForm";
import { MailIcon, PhoneIcon } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site";

export default function Quote() {
  return (
    <section
      id="quote"
      aria-labelledby="quote-heading"
      className="on-forest relative bg-forest py-16 text-on-forest sm:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-[var(--spacing-gutter)] lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <span className="label !text-on-forest-dim">Free Website Quote</span>
          <h2 id="quote-heading" className="mt-4 text-[2.15rem] sm:text-5xl">
            Let&apos;s talk about your website.
          </h2>
          <p className="mt-4 text-lg text-on-forest-dim">
            Tell me a little about your business. I read every request myself
            and will reply with an honest recommendation. There&apos;s no cost
            for a quote and no obligation.
          </p>

          <div className="mt-7">
            <p className="text-sm font-semibold">Rather talk now?</p>
            <div className="mt-3 flex flex-col gap-3">
              <a href={`tel:${siteConfig.phone.e164}`} className="btn btn-on-forest justify-start">
                <PhoneIcon className="h-5 w-5" /> Call or text {siteConfig.phone.display}
              </a>
              <a
                href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Website quote request")}`}
                className="btn btn-on-forest justify-start !font-medium"
              >
                <MailIcon className="h-5 w-5 shrink-0" />
                <span className="min-w-0 break-all text-left">{siteConfig.email}</span>
              </a>
            </div>
          </div>
        </div>

        <QuoteForm />
      </div>
    </section>
  );
}
