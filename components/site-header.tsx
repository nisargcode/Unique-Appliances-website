"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { shop, telHref } from "@/lib/shop";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Services", href: "#services" },
  { label: "Offers", href: "#offers" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/85 shadow-sm backdrop-blur-md"
          : "bg-background/40 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-18 sm:px-6 lg:px-8">
        {/* Logo */}
        <a
          href="#home"
          className="group flex items-center gap-3 transition-all duration-300"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/25 transition-all duration-300 group-hover:-rotate-6 group-hover:scale-115 group-hover:shadow-lg group-hover:shadow-primary/40">
            <span className="font-display text-lg font-extrabold tracking-tight">
              UA
            </span>
          </span>
          <span className="flex flex-col leading-none transition-all duration-300 group-hover:translate-x-1">
            <span className="font-display text-lg font-bold tracking-tight text-foreground sm:text-xl transition-colors duration-300 group-hover:text-primary">
              Unique{" "}
              <span className="text-primary transition-colors duration-300 group-hover:text-accent">
                Appliances
              </span>
            </span>
            <span className="text-[11px] font-medium text-foreground/70 group-hover:text-primary/70">
              Sales &amp; Service
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative rounded-lg px-3.5 py-2 text-sm font-semibold text-foreground/80 transition-all duration-300 hover:text-primary hover:-translate-y-0.5"
            >
              {link.label}
              <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-linear-to-r from-accent to-primary transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        {/* Call CTA + mobile toggle */}
        <div className="flex items-center gap-2">
          <a
            href={telHref(shop.phonePrimary)}
            className="group hidden items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-bold text-accent-foreground shadow-md shadow-accent/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/50 hover:scale-105 sm:inline-flex"
          >
            <Phone className="size-4 transition-transform duration-300 group-hover:rotate-12" />
            Call Now
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-secondary md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-border bg-background/95 backdrop-blur-md transition-[max-height,opacity] duration-300 md:hidden",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="group rounded-xl px-4 py-3 text-base font-semibold text-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:translate-x-1 hover:-translate-y-0.5"
            >
              {link.label}
            </a>
          ))}
          <a
            href={telHref(shop.phonePrimary)}
            className="group mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-base font-bold text-accent-foreground transition-all duration-300 hover:shadow-lg hover:shadow-accent/40 hover:-translate-y-0.5"
          >
            <Phone className="size-5 transition-transform duration-300 group-hover:rotate-12" />
            Call {shop.phonePrimary}
          </a>
        </nav>
      </div>
    </header>
  );
}
