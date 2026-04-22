"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import Image from "next/image";

const brands = [
  {
    id: "zhiji",
    name: "知集 ZHIJI",
    logo: "/images/brands/zhiji-logo.png",
    descKey: "brands.zhiji.desc",
  },
];

export function BrandsSection() {
  const { t } = useI18n();
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-accent text-sm uppercase tracking-[0.3em] mb-4 block">
            {t("brands.label")}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-medium text-balance">
            {t("brands.title")}
          </h2>
          <p className="mt-6 text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("brands.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
          {brands.map((brand, index) => (
            <div
              key={brand.id}
              className={`group bg-secondary rounded-2xl p-8 md:p-12 transition-all duration-500 hover:shadow-xl ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Logo */}
                <div className="flex-shrink-0 w-48 h-48 relative bg-background rounded-xl p-4 flex items-center justify-center">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={180}
                    height={180}
                    className="object-contain"
                  />
                </div>

                {/* Description */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-serif text-2xl md:text-3xl text-foreground font-medium mb-4">
                    {brand.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(brand.descKey)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
