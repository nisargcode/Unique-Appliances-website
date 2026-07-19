"use client";

import {
  AirVent,
  Droplets,
  Flame,
  Refrigerator,
  Tv,
  WashingMachine,
  Waves,
  Wind,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { categories } from "@/lib/categories";

export function CategoryShowcase({
  onSelectCategory,
}: {
  onSelectCategory: (id: string) => void;
}) {
  return (
    <section
      id="offers"
      className="gradient-hero relative py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
            Shop By Category
          </p>
          <h2 className="mt-3 text-balance text-3xl font-extrabold sm:text-4xl">
            <span className="text-foreground">Everything for your home,</span>{" "}
            <span className="text-gradient">under one roof</span>
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-foreground">
            Tap a category to explore the appliances we sell and service across
            Vadodara.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {categories.map(({ id, label, icon: Icon, from, to }, i) => (
            <Reveal key={id} as="div" delay={i * 60}>
              <a
                href="#products"
                onClick={() => onSelectCategory(id)}
                className="group relative flex h-full flex-col items-center gap-4 overflow-hidden rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-xl hover:shadow-primary/15"
              >
                <span
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(160deg, color-mix(in oklch, ${from} 12%, transparent), transparent 70%)`,
                  }}
                  aria-hidden="true"
                />
                <span
                  className="relative flex size-16 items-center justify-center rounded-2xl text-white shadow-md transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${from}, ${to})`,
                  }}
                >
                  <Icon className="size-8 transition-transform duration-500 group-hover:scale-115" />
                </span>
                <span className="relative text-sm font-bold text-foreground sm:text-base transition-transform duration-300 group-hover:scale-105">
                  {label}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
