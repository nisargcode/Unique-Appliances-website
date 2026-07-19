"use client";

import { useState } from "react";
import { OffersSection } from "@/components/offers-section";
import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { CategoryShowcase } from "@/components/category-showcase";
import { AboutShowcase } from "@/components/about-showcase";
import { FeaturedProducts } from "@/components/featured-products";
import { SnapshotGallery } from "@/components/snapshot-gallery";
import { ServiceCallout } from "@/components/service-callout";
import { SiteFooter } from "@/components/site-footer";

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <AboutShowcase />
        <CategoryShowcase onSelectCategory={setSelectedCategory} />
        <FeaturedProducts selectedCategory={selectedCategory} />
        <SnapshotGallery selectedCategory={selectedCategory} />
        <OffersSection />
        <ServiceCallout />
      </main>
      <SiteFooter />
    </div>
  );
}
