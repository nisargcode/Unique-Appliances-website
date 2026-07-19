"use client";

import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/lib/config";
import { Reveal } from "@/components/reveal";
import { X } from "lucide-react";

type Scheme = {
  _id: string;
  title: string;
  description: string;
  image: { url: string; publicId: string };
  active: boolean;
};

export function OffersSection() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/schemes`);
        const json = await res.json();
        const activeOnly = (json.data || []).filter((s: Scheme) => s.active);
        setSchemes(activeOnly);
      } catch (error) {
        console.log("Error fetching schemes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, []);

  if (!loading && schemes.length === 0) {
    return null;
  }

  return (
    <section
      id="offers"
      className="bg-[#423ca3] relative py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-3xl font-bold uppercase tracking-[0.2em] text-[#FFFF00]">
            Current Offers
          </p>
          <h2 className="mt-3 text-balance text-3xl font-extrabold sm:text-4xl">
            <span className="text-foreground">Deals</span>{" "}
            <span className="text-foreground">you don't want to miss</span>
          </h2>
        </Reveal>

        {loading && (
          <p className="mt-12 text-center text-sm text-foreground">
            Loading offers...
          </p>
        )}

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {schemes.map((scheme, i) => (
            <Reveal key={scheme._id} as="article" delay={i * 80}>
              <button
                type="button"
                onClick={() => setSelectedScheme(scheme)}
                className="group w-full overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-video overflow-hidden bg-secondary">
                  <img
                    src={scheme.image?.url || "/placeholder.svg"}
                    alt={scheme.title}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-foreground">
                    {scheme.title}
                  </h3>
                  <p className="mt-2 text-sm text-foreground">
                    {scheme.description}
                  </p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Larger image view modal */}
      {selectedScheme && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8"
          onClick={() => setSelectedScheme(null)}
        >
          <div
            className="relative max-h-[95vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-card p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedScheme(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black/80"
            >
              <X className="size-6" />
            </button>

            <img
              src={selectedScheme.image.url}
              alt={selectedScheme.title}
              className="w-full rounded-xl object-contain"
            />

            <h3 className="mt-4 text-xl font-bold text-foreground">
              {selectedScheme.title}
            </h3>
            <p className="mt-2 text-sm text-foreground">
              {selectedScheme.description}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
