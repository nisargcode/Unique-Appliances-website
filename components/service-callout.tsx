import { CheckCircle2, MessageCircle, Phone, Wrench } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { shop, telHref, waHref } from "@/lib/shop";

const perks = [
  "Doorstep repair & installation",
  "Trained, verified technicians",
  "Service for all major brands",
  "Genuine spare parts",
];

export function ServiceCallout() {
  return (
    <section id="services" className="gradient-page-bg py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="gradient-band relative overflow-hidden rounded-3xl px-6 py-12 text-primary-foreground shadow-2xl shadow-primary/30 sm:px-10 sm:py-14 lg:px-16">
            {/* decorative */}
            <div
              className="animate-spin-slow pointer-events-none absolute -right-20 -top-20 size-72 rounded-full border-[3px] border-dashed border-primary-foreground/15"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-24 -left-16 size-72 rounded-full bg-accent/25 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative grid items-center gap-10 lg:grid-cols-2">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-4 py-1.5 text-sm font-semibold backdrop-blur">
                  <Wrench className="size-4" />
                  Repair &amp; Installation
                </span>
                <h2 className="mt-5 text-balance text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.75rem]">
                  Need a repair or installation? We service what we sell.
                </h2>
                <p className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-primary-foreground/85">
                  From quick fixes to full installations, our expert team keeps
                  your appliances running like new. Book a visit in seconds.
                </p>

                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {perks.map((perk) => (
                    <li
                      key={perk}
                      className="flex items-center gap-2.5 text-sm font-medium"
                    >
                      <CheckCircle2 className="size-5 shrink-0 text-accent" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action card */}
              <div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 p-6 backdrop-blur-md sm:p-8">
                <p className="text-center text-sm font-semibold text-primary-foreground/80">
                  Talk to us right now
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  <a
                    href={waHref(
                      `Hi ${shop.name}, I need a repair / installation service.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="animate-pulse-ring group flex items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 py-5 text-lg font-extrabold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#20bc59] hover:shadow-xl hover:shadow-[#25D366]/40"
                  >
                    <MessageCircle className="size-6 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" />
                    WhatsApp Us
                  </a>
                  <a
                    href={telHref(shop.phonePrimary)}
                    className="group flex items-center justify-center gap-3 rounded-2xl bg-accent px-6 py-5 text-lg font-extrabold text-accent-foreground shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-xl hover:shadow-primary/40"
                  >
                    <Phone className="size-6 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                    Call {shop.phonePrimary}
                  </a>
                </div>
                <p className="mt-5 text-center text-sm text-primary-foreground/75">
                  Or dial{" "}
                  <a
                    href={telHref(shop.phoneSecondary)}
                    className="font-bold text-primary-foreground underline-offset-2 hover:underline"
                  >
                    {shop.phoneSecondary}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
