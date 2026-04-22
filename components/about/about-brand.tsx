"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/context";

export function AboutBrand() {
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
    <section ref={sectionRef} className="py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Logo and Brand Identity */}
          <div
            className={`flex items-center justify-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="relative w-full max-w-md aspect-[3/2] bg-card rounded-lg border border-border p-8 flex items-center justify-center shadow-sm">
              <Image
                src="/images/brands/zhiji-logo.png"
                alt="ZHIJI Brand Logo"
                width={360}
                height={180}
                className="object-contain"
              />
            </div>
          </div>

          {/* Content */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <span className="text-accent text-sm uppercase tracking-[0.3em] mb-4 block">
              {t("about.brand.label")}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-medium mb-6 text-balance">
              {t("about.brand.title")}
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{t("about.brand.p1")}</p>
              <p>{t("about.brand.p2")}</p>
            </div>
          </div>
        </div>

        {/* Second Row - Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mt-24">
          {/* Content */}
          <div
            className={`order-2 lg:order-1 transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <span className="text-accent text-sm uppercase tracking-[0.3em] mb-4 block">
              {t("about.brand.philosophy.label")}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-medium mb-6 text-balance">
              {t("about.brand.philosophy.title")}
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{t("about.brand.p3")}</p>
              <p>{t("about.brand.p4")}</p>
            </div>
          </div>

          {/* Highlight Card */}
          <div
            className={`order-1 lg:order-2 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <div className="bg-card border border-border rounded-lg p-8 lg:p-10 shadow-sm">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-accent font-serif text-xl font-medium">20+</span>
                  </div>
                  <div>
                    <h4 className="text-foreground font-medium">{t("about.brand.years")}</h4>
                    <p className="text-muted-foreground text-sm">{t("about.brand.yearsDesc")}</p>
                  </div>
                </div>
                <div className="h-px bg-border" />
                <blockquote className="text-foreground font-serif text-lg italic leading-relaxed">
                  {t("about.brand.quote")}
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
