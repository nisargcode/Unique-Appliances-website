"use client";
import { API_BASE_URL } from "@/lib/config";

import { useState, useEffect } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { shop, waHref } from "@/lib/shop";
import { categories } from "@/lib/categories";

type Product = {
  _id: string;
  name: string;
  category: string;
  brand: string;
  description: string;
  images: { url: string; publicId: string }[];
  badge?: string;
};

export function FeaturedProducts({
  selectedCategory,
}: {
  selectedCategory: string | null;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [galleryProduct, setGalleryProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url = selectedCategory
          ? `${API_BASE_URL}/api/products?category=${selectedCategory}`
          : `${API_BASE_URL}/api/products`;

        const res = await fetch(url);
        const json = await res.json();
        setProducts(json.data);
      } catch (error) {
        console.log("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const getCategoryLabel = (categoryId: string) => {
    const match = categories.find((c) => c.id === categoryId);
    return match ? match.label : "";
  };

  return (
    <section
      id="products"
      className="gradient-hero relative py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
              Featured Products
            </p>
            <h2 className="mt-3 text-balance text-3xl font-extrabold sm:text-4xl">
              <span className="text-gradient">Handpicked favourites</span>{" "}
              <span className="text-foreground">this season</span>
            </h2>
          </div>

          <a
            href={waHref(
              `Hi ${shop.name}, please share your latest product catalogue.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-colors hover:text-accent"
          >
            Ask for full catalogue
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>

        {loading && (
          <p className="mt-12 text-center text-sm text-foreground">
            Loading products...
          </p>
        )}

        {!loading && selectedCategory && products.length === 0 && (
          <p className="mt-12 text-center text-sm text-foreground">
            No products in this category yet.
          </p>
        )}

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, i) => (
            <Reveal
              key={product._id}
              as="article"
              delay={i * 80}
              className="h-full"
            >
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/15 hover:border-primary/20">
                <div className="relative aspect-4/3 overflow-hidden bg-secondary">
                  {product.badge && (
                    <span
                      className="absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-xs font-bold text-white shadow-md transition-all duration-300 group-hover:scale-110"
                      style={{
                        backgroundImage:
                          "linear-gradient(120deg, var(--brand-violet), var(--brand-indigo))",
                      }}
                    >
                      {product.badge}
                    </span>
                  )}
                  <img
                    src={product.images?.[0]?.url || "/placeholder.svg"}
                    alt={product.name}
                    className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="mt-2 text-xs font-bold uppercase tracking-wide text-primary transition-colors duration-300 group-hover:text-accent">
                    {getCategoryLabel(product.category)}
                  </p>
                  <h3 className="mt-1 text-base font-bold leading-snug text-foreground transition-colors duration-300 group-hover:text-primary">
                    {product.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground transition-all duration-300 group-hover:text-foreground">
                    {product.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="leading-tight">
                      <span className="block text-xs text-foreground"></span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setGalleryProduct(product)}
                      className="shine inline-flex items-center gap-1.5 rounded-full gradient-brand px-4 py-2.5 text-sm font-bold text-primary-foreground transition-all duration-300 hover:brightness-110 hover:shadow-lg hover:shadow-primary/30"
                    >
                      View All Images
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Image gallery modal */}
      {galleryProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8"
          onClick={() => setGalleryProduct(null)}
        >
          <div
            className="relative max-h-[95vh] w-full max-w-6xl overflow-y-auto rounded-2xl bg-card p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setGalleryProduct(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black/80"
            >
              <X className="size-6" />
            </button>

            <h3 className="mb-6 text-2xl font-bold text-foreground">
              {galleryProduct.name}
            </h3>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {galleryProduct.images.map((img, idx) => (
                <img
                  key={img.publicId || idx}
                  src={img.url}
                  alt={`${galleryProduct.name} photo ${idx + 1}`}
                  className="h-112 w-full rounded-xl object-contain"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
