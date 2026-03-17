"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductsHero } from "@/components/products/products-hero";
import { ProductsGrid } from "@/components/products/products-grid";
import { ProductsFeatures } from "@/components/products/products-features";
import { ProductsCTA } from "@/components/products/products-cta";

export default function ProductsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ProductsHero />
      <ProductsGrid />
      <ProductsFeatures />
      <ProductsCTA />
      <Footer />
    </main>
  );
}
