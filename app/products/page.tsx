import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductsHero } from "@/components/products/products-hero";
import { ProductsGrid } from "@/components/products/products-grid";
import { ProductsFeatures } from "@/components/products/products-features";
import { ProductsCTA } from "@/components/products/products-cta";
import { getProducts } from "@/lib/products-db";

export const revalidate = 60;

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <main className="min-h-screen">
      <Header />
      <ProductsHero />
      <ProductsGrid sourceProducts={products} />
      <ProductsFeatures />
      <ProductsCTA />
      <Footer />
    </main>
  );
}
