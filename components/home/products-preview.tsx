"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/products-data";
import { useI18n } from "@/lib/i18n/context";

// Get first 4 real products for homepage preview
const toPreview = (allProducts: Product[]) => allProducts.slice(0, 4).map((p) => ({
  name: p.name,
  description: p.features[0]?.content?.slice(0, 80) + "..." || "",
  image: p.mainImage,
  slug: p.slug,
  articleNumber: p.articleNumber,
}));

export function ProductsPreview({ sourceProducts }: { sourceProducts: Product[] }) {
  const products = toPreview(sourceProducts);
  const { t } = useI18n();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-6 lg:px-12">
        <div
          className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <span className="text-accent text-sm uppercase tracking-[0.3em] mb-4 block">
              {t("products.label")}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-medium text-balance">
              {t("products.title")}
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-foreground text-sm uppercase tracking-widest transition-all duration-300 hover:gap-4 group self-start lg:self-auto"
          >
            {t("products.viewAll")}
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Link
              key={product.name}
              href={`/products/${product.slug}`}
              className={`group relative overflow-hidden rounded-lg aspect-[3/4] transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className={`object-cover transition-all duration-700 ${
                  hoveredIndex === index ? "scale-110" : "scale-100"
                }`}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent transition-opacity duration-500 ${
                  hoveredIndex === index ? "opacity-90" : "opacity-70"
                }`}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-2xl text-background font-medium mb-2">
                  {product.name}
                </h3>
                <p
                  className={`text-background/80 text-sm transition-all duration-500 ${
                    hoveredIndex === index
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  {product.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
