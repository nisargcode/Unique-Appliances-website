"use client";

import { useState, useEffect } from "react";
import { Reveal } from "@/components/reveal";
import { API_BASE_URL } from "@/lib/config";
import { X } from "lucide-react";

type Snapshot = {
  _id: string;
  image: { url: string; publicId: string };
  category: string;
  description?: string;
};

export function SnapshotGallery({
  selectedCategory,
}: {
  selectedCategory: string | null;
}) {
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSnap, setSelectedSnap] = useState<Snapshot | null>(null);

  useEffect(() => {
    const fetchSnapshots = async () => {
      setLoading(true);
      try {
        const url = selectedCategory
          ? `${API_BASE_URL}/api/snapshots?category=${selectedCategory}`
          : `${API_BASE_URL}/api/snapshots`;

        const res = await fetch(url);
        const json = await res.json();
        setSnapshots(json.data);
      } catch (error) {
        console.log("Error fetching snapshots:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSnapshots();
  }, [selectedCategory]);

  if (loading) {
    return (
      <p className="mt-12 text-center text-sm text-foreground">
        Loading snapshots...
      </p>
    );
  }

  if (!loading && snapshots.length === 0) {
    return null;
  }

  return (
    <section className="gradient-hero relative py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
            From Our Shop
          </p>
          <h2 className="mt-3 text-balance text-3xl font-extrabold sm:text-4xl">
            <span className="text-gradient">Real installs,</span>{" "}
            <span className="text-foreground">real customers</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {snapshots.map((snap, i) => (
            <Reveal key={snap._id} as="div" delay={i * 60}>
              <button
                type="button"
                onClick={() => setSelectedSnap(snap)}
                className="group w-full overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-square overflow-hidden bg-secondary">
                  <img
                    src={snap.image?.url || "/placeholder.svg"}
                    alt={snap.description || "Shop snapshot"}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                {snap.description && (
                  <p className="p-3 text-xs text-foreground">
                    {snap.description}
                  </p>
                )}
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Larger image view modal */}
      {selectedSnap && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8"
          onClick={() => setSelectedSnap(null)}
        >
          <div
            className="relative max-h-[95vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-card p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedSnap(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black/80"
            >
              <X className="size-6" />
            </button>

            <img
              src={selectedSnap.image.url}
              alt={selectedSnap.description || "Shop snapshot"}
              className="w-full rounded-xl object-cover"
            />

            {selectedSnap.description && (
              <p className="mt-4 text-sm text-foreground">
                {selectedSnap.description}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
