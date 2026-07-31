"use client";

import React from "react"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ZoomIn } from "lucide-react";
import type { Product } from "@/lib/products-data";
import { ImageLightbox } from "@/components/ui/image-lightbox";

// Transform real products to display format
const toDisplayProducts = (realProducts: Product[]) => realProducts.map((p) => ({
  name: p.name,
  category: p.category,
  description: p.features[0]?.content || "",
  features: p.specifications.slice(1, 4).map((s) => s.value),
  image: p.mainImage,
  featured: true,
  slug: p.slug,
  articleNumber: p.articleNumber,
}));

export function ProductsGrid({ sourceProducts }: { sourceProducts: Product[] }) {
  const allProducts = toDisplayProducts(sourceProducts);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<{ src: string; alt: string }[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const openLightbox = (e: React.MouseEvent, product: (typeof allProducts)[0]) => {
    e.preventDefault();
    e.stopPropagation();
    setLightboxImages([{ src: product.image, alt: product.name }]);
    setLightboxImageIndex(0);
    setLightboxOpen(true);
  };

  const categories = ["All", ...new Set(allProducts.map((p) => p.category))];
  const products = allProducts; // Declare the products variable

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

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
    <section ref={sectionRef} className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Category Filter */}
        <div
          className={`flex flex-wrap gap-4 mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 text-sm uppercase tracking-widest border transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent text-foreground border-border hover:border-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => {
            const hasDetailPage = Boolean(product.slug);

            return (
              <Link
                key={product.name}
                href={`/products/${product.slug}`}
                className={`group bg-card border border-border rounded-lg overflow-hidden transition-all duration-700 hover:shadow-xl hover:border-accent/30 ${hasDetailPage ? "cursor-pointer" : ""} ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${100 + index * 50}ms` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className={`object-cover transition-transform duration-700 ${
                      hoveredIndex === index ? "scale-110" : "scale-100"
                    }`}
                  />
                  {product.featured && (
                    <div className="absolute top-4 left-4 w-10 h-10 bg-background/90 backdrop-blur-sm rounded-full p-1.5 shadow-sm">
                      <Image
                        src="/images/logo-icon.png"
                        alt="Featured"
                        width={28}
                        height={28}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  {/* Zoom button */}
                  <button
                    type="button"
                    onClick={(e) => openLightbox(e, product)}
                    className="absolute top-4 right-4 w-9 h-9 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background hover:scale-110 z-10"
                    aria-label="Zoom image"
                  >
                    <ZoomIn size={16} />
                  </button>
                  {hasDetailPage && (
                    <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                      View Details
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-accent text-xs uppercase tracking-widest">
                    {product.category}
                  </span>
                  <h3 className="font-serif text-2xl text-foreground font-medium mt-2 mb-1">
                    {product.name}
                  </h3>
                  {"articleNumber" in product && product.articleNumber && (
                    <p className="text-muted-foreground text-xs mb-3">
                      Article No. {product.articleNumber}
                    </p>
                  )}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <ImageLightbox
        images={lightboxImages}
        initialIndex={lightboxImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  );
}
