import {
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Star,
  Wrench,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { shop, waHref } from "@/lib/shop";

const trustPoints = [
  {
    icon: ShieldCheck,
    label: "Trusted Local Store",
    color: "var(--brand-violet)",
  },
  { icon: Wrench, label: "Sales + Repair Service", color: "var(--brand-teal)" },
  {
    icon: Star,
    label: "Top Brands, Fair Prices",
    color: "var(--brand-orange)",
  },
];

export function HeroSection() {
  return (
    <section id="home" className="gradient-hero relative overflow-hidden">
      {/* decorative background */}
      <div
        className="pointer-events-none absolute inset-0 bg-grid opacity-40"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-(--brand-violet)/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-1/4 top-0 size-64 rounded-full bg-(--brand-violet)/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 size-80 rounded-fullbg-(--brand-violet)/25 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20 lg:gap-16 lg:px-8">
        {/* Copy */}
        <div className="order-2 md:order-1">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-black/70 px-4 py-1.5 text-sm font-semibold text-primary shadow-sm backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              Vadodara&apos;s Home Appliance Experts
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
              Welcome to{" "}
              <span
                className="relative whitespace-nowrap bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, rgba(131,58,180,1) 6%, rgba(243,31,41,1) 100%, rgba(253,29,29,1) 24%, rgba(252,107,50,1) 69%, rgba(252,138,59,1) 50%, rgba(252,176,69,1) 100%)",
                }}
              >
                Unique Appliances
                <svg
                  className="absolute -bottom-2 left-0 h-3 w-full text-accent/70"
                  viewBox="0 0 300 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 9C60 3 140 3 298 7"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-foreground">
              Your friendly neighbourhood store for washing machines, ACs,
              geysers, RO purifiers, refrigerators and more. Quality you can
              trust, prices you&apos;ll love, and expert repair &amp;
              installation for everything we sell.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#products"
                className="group inline-flex items-center justify-center gap-2 rounded-full gradient-brand px-7 py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/50"
              >
                Browse Products
                <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-110" />
              </a>
              <a
                href={waHref(
                  `Hi ${shop.name}, I'd like to know more about your appliances.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary/20 bg-card px-7 py-4 text-base font-bold text-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md hover:bg-primary/5"
              >
                <MessageCircle className="size-5 text-[#25D366] transition-transform duration-300 group-hover:scale-110" />
                Chat on WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              {trustPoints.map(({ icon: Icon, label, color }) => (
                <li
                  key={label}
                  className="group flex items-center gap-2 text-sm font-semibold text-foreground/80 transition-all duration-300 hover:text-foreground hover:scale-105"
                >
                  <span
                    className="flex size-8 items-center justify-center rounded-lg text-white shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:scale-110"
                    style={{ backgroundColor: color }}
                  >
                    <Icon className="size-4 transition-transform duration-300 group-hover:scale-125" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Featured banner image */}
        <div className="order-1 md:order-2">
          <Reveal delay={120}>
            <div className="relative mx-auto max-w-3xl">
              <div
                className="gradient-ring absolute -inset-1.5 -z-10 rounded-[2rem] opacity-90 blur-[2px]"
                aria-hidden="true"
              />
              <div className="group relative overflow-hidden rounded-[1.75rem] border-4 border-card bg-card shadow-2xl shadow-primary/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-3xl hover:shadow-primary/40">
                <img
                  src="/images/card.jpeg"
                  alt="Unique Appliances - Banner"
                  className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.08]"
                />
              </div>

              {/* Floating badge */}
              <div className="animate-float absolute -bottom-5 -left-5 flex items-center gap-3 rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-xl backdrop-blur transition-all duration-300 hover:shadow-2xl hover:scale-105">
                <span className="flex size-10 items-center justify-center rounded-xl bg-accent/15 text-accent transition-transform duration-300">
                  <ShieldCheck className="size-5" />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-bold text-foreground">
                    Genuine Brands
                  </p>
                  <p className="text-xs text-foreground/70">Warranty backed</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
