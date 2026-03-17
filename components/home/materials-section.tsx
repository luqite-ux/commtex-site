"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronRight, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { products } from "@/lib/products-data";

const materials = [
  {
    name: "Wool",
    nameKey: "materials.wool",
    image: "/images/materials/wool.jpg",
    descKey: "materials.woolDesc",
    // Match products by category keywords
    categoryMatch: ["Wool Blend"],
  },
  {
    name: "Cashmere",
    nameKey: "materials.cashmere",
    image: "/images/materials/cashmere.jpg",
    descKey: "materials.cashmereDesc",
    categoryMatch: ["Cashmere"],
  },
  {
    name: "Yak",
    nameKey: "materials.yak",
    image: "/images/materials/yak.jpg",
    descKey: "materials.yakDesc",
    categoryMatch: ["Yak"],
  },
  {
    name: "Alpaca",
    nameKey: "materials.alpaca",
    image: "/images/materials/alpaca.jpg",
    descKey: "materials.alpacaDesc",
    categoryMatch: ["Alpaca Blend"],
  },
  {
    name: "Silk",
    nameKey: "materials.silk",
    image: "/images/materials/silk.jpg",
    descKey: "materials.silkDesc",
    categoryMatch: ["Silk"],
  },
];

function getMaterialProducts(categoryMatch: string[]) {
  return products.filter((p) =>
    categoryMatch.some((cat) => p.category.includes(cat))
  );
}

export function MaterialsSection() {
  const { t } = useI18n();
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleToggle = (index: number) => {
    setActiveIndex(index);
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-secondary overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-accent text-sm uppercase tracking-[0.3em] mb-4 block">
            {t("materials.label")}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-medium text-balance">
            {t("materials.title")}
          </h2>
          <p className="mt-6 text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("materials.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Material Showcase Image */}
          <div
            className={`relative aspect-[4/3] rounded-2xl overflow-hidden transition-all duration-1000 delay-200 sticky top-32 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            {materials.map((material, index) => (
              <div
                key={material.name}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === activeIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={material.image || "/placeholder.svg"}
                  alt={material.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="font-serif text-3xl md:text-4xl text-background font-medium mb-2">
                    {t(material.nameKey)}
                  </h3>
                  <p className="text-background/80 text-lg">
                    {t(material.descKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Material Selector with Products */}
          <div
            className={`space-y-3 transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            {materials.map((material, index) => {
              const materialProducts = getMaterialProducts(
                material.categoryMatch
              );
              const isExpanded = expandedIndex === index;
              const isActive = activeIndex === index;

              return (
                <div
                  key={material.name}
                  className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                    isActive
                      ? "bg-background border-accent shadow-lg"
                      : "bg-transparent border-border hover:bg-background/50 hover:border-accent/50"
                  }`}
                >
                  {/* Material Header */}
                  <button
                    type="button"
                    onClick={() => handleToggle(index)}
                    className="w-full text-left p-5 md:p-6 group"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-full overflow-hidden border-2 shrink-0 transition-all duration-300 ${
                          isActive ? "border-accent" : "border-border"
                        }`}
                      >
                        <Image
                          src={material.image || "/placeholder.svg"}
                          alt={material.name}
                          width={48}
                          height={48}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4
                          className={`font-serif text-lg md:text-xl font-medium transition-colors duration-300 ${
                            isActive ? "text-accent" : "text-foreground"
                          }`}
                        >
                          {t(material.nameKey)}
                        </h4>
                        <p className="text-muted-foreground text-sm mt-0.5 line-clamp-1">
                          {t(material.descKey)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        {materialProducts.length > 0 && (
                          <span className="text-xs text-muted-foreground hidden sm:block">
                            {materialProducts.length}{" "}
                            {materialProducts.length === 1
                              ? "product"
                              : "products"}
                          </span>
                        )}
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isActive
                              ? "bg-accent text-background"
                              : "bg-secondary text-muted-foreground group-hover:bg-accent/10"
                          }`}
                        >
                          <span className="text-sm font-medium">
                            0{index + 1}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Expanded Product Links */}
                  <div
                    className={`transition-all duration-500 ease-in-out ${
                      isExpanded
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                    } overflow-hidden`}
                  >
                    {materialProducts.length > 0 ? (
                      <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                        <div className="border-t border-border/60 pt-4 space-y-1">
                          {materialProducts.map((product) => (
                            <Link
                              key={product.id}
                              href={`/products/${product.slug}`}
                              className="group/link flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-secondary/80 transition-all duration-200"
                            >
                              <div className="w-10 h-10 rounded-lg overflow-hidden border border-border/60 shrink-0">
                                <Image
                                  src={
                                    product.mainImage || "/placeholder.svg"
                                  }
                                  alt={product.name}
                                  width={40}
                                  height={40}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground group-hover/link:text-accent transition-colors line-clamp-1">
                                  {product.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {product.articleNumber}
                                </p>
                              </div>
                              <ArrowRight
                                size={14}
                                className="text-muted-foreground group-hover/link:text-accent group-hover/link:translate-x-0.5 transition-all shrink-0"
                              />
                            </Link>
                          ))}
                        </div>

                        {/* View All in Category */}
                        <Link
                          href="/products"
                          className="mt-3 flex items-center justify-center gap-2 py-2 text-xs text-accent hover:text-accent/80 uppercase tracking-wider font-medium transition-colors"
                        >
                          {t("nav.products")}
                          <ChevronRight size={14} />
                        </Link>
                      </div>
                    ) : (
                      <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                        <div className="border-t border-border/60 pt-4">
                          <p className="text-sm text-muted-foreground text-center italic py-2">
                            Coming soon
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
