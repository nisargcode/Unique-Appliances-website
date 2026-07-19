import {
  Clock,
  CircleUserRound,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { shop, telHref, waHref } from "@/lib/shop";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Services", href: "#services" },
  { label: "Offers", href: "#offers" },
  { label: "Contact", href: "#contact" },
];

export function SiteFooter() {
  return (
    <footer id="contact" className="gradient-hero border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand + contact */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-black shadow-md">
                <span className="font-display text-lg font-extrabold">UA</span>
              </span>
              <span className="font-display text-xl font-bold text-black">
                Unique <span className="text-black">Appliances</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-black">
              {shop.tagline}. Serving Vadodara with trusted appliances and
              dependable after-sales service.
            </p>

            <div className="mt-6 space-y-3 text-sm">
              <a
                href={telHref(shop.phonePrimary)}
                className="group flex items-center gap-3 font-medium text-black transition-all duration-300 hover:text-primary hover:translate-x-1"
              >
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                  <Phone className="size-4" />
                </span>
                {shop.phonePrimary} / {shop.phoneSecondary}
              </a>

              <a
                href={`https://instagram.com/${shop.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 font-medium text-black transition-all duration-300 hover:text-primary hover:translate-x-1"
              >
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                  <CircleUserRound className="size-4" />
                </span>
                @{shop.instagram}
              </a>

              <a
                href={`https://www.instagram.com/bhulesh.panchal/`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 font-medium text-black transition-all duration-300 hover:text-primary hover:translate-x-1"
              >
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                  <CircleUserRound className="size-4" />
                </span>
                Bhulesh Panchal
              </a>
            </div>
          </div>

          {/* Quick links + hours */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-4">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-black">
                Quick Links
              </h3>
              <ul className="mt-4 space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center text-sm text-black transition-all duration-300 hover:text-primary hover:translate-x-1"
                    >
                      <span className="mr-0 h-px w-0 bg-primary transition-all duration-300 group-hover:mr-2 group-hover:w-4" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-black">
                <Clock className="size-4 text-primary" /> Hours
              </h3>
              <ul className="mt-4 space-y-3">
                {shop.hours.map((h) => (
                  <li key={h.day} className="text-sm">
                    <span className="block font-semibold text-black">
                      {h.day}
                    </span>
                    <span className="text-black">{h.time}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-start gap-2 text-sm text-black">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{shop.address}</span>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-black">
              Find Us
            </h3>
            <div className="mt-4 overflow-hidden rounded-2xl border border-border shadow-sm">
              <iframe
                title="Unique Appliances location on Google Maps"
                src={shop.mapsEmbedUrl}
                className="h-56 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-sm text-black">
            &copy; {new Date().getFullYear()} Unique Appliances. All rights
            reserved.
          </p>
          <p className="text-sm text-black">
            Customer Care:{" "}
            <a
              href={telHref(shop.customerCare)}
              className="font-semibold text-black hover:text-primary"
            >
              {shop.customerCare}
            </a>
          </p>
        </div>
      </div>

      {/* Floating WhatsApp */}

      <a
        href={waHref(`Hi ${shop.name}, I have a query.`)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="animate-pulse-ring fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:scale-125 hover:shadow-2xl hover:shadow-[#25D366]/60"
      >
        <MessageCircle className="size-7 transition-transform duration-300 group-hover:rotate-12" />
      </a>
    </footer>
  );
}
