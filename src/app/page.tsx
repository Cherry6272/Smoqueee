"use client";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CategoryShowcase } from "@/components/CategoryShowcase";
import { BrandStory } from "@/components/BrandStory";
import { FeaturedEdit } from "@/components/FeaturedEdit";
import { StoreLocation } from "@/components/StoreLocation";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <BrandStory />
      <CategoryShowcase />
      <FeaturedEdit />
      <StoreLocation />
    </main>
  );
}
