"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection } from "@/components/home/features-section";
import { MaterialsSection } from "@/components/home/materials-section";
import { ProductsPreview } from "@/components/home/products-preview";
import { ProcessSection } from "@/components/home/process-section";
import { StatsSection } from "@/components/home/stats-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { CertificationsSection } from "@/components/home/certifications-section";
import { NewsPreview } from "@/components/home/news-preview";
import { CTASection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <MaterialsSection />
      <ProductsPreview />
      <ProcessSection />
      <StatsSection />
      <TestimonialsSection />
      <CertificationsSection />
      <NewsPreview />
      <CTASection />
      <Footer />
    </main>
  );
}
