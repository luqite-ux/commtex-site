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
import { getProducts } from "@/lib/products-db";
import { getArticles } from "@/lib/articles-db";

export const revalidate = 60;

export default async function HomePage() {
  const [products, articles] = await Promise.all([getProducts(), getArticles()]);
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <MaterialsSection />
      <ProductsPreview sourceProducts={products} />
      <ProcessSection />
      <StatsSection />
      <TestimonialsSection />
      <CertificationsSection />
      <NewsPreview articles={articles} />
      <CTASection />
      <Footer />
    </main>
  );
}
