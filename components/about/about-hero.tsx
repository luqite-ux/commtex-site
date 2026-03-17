"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n/context";

export function AboutHero() {
  const { t } = useI18n();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[60vh] lg:min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/factory-fabrics.jpg"
          alt="Commtex colorful fabric collection"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center py-24">
        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block text-background/80 text-sm uppercase tracking-[0.3em] mb-6">
            {t("about.hero.label")}
          </span>
        </div>

        <h1
          className={`font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-background font-medium leading-tight text-balance transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {t("about.hero.title")}
        </h1>

        <p
          className={`mt-8 text-background/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-pretty transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {t("about.hero.subtitle")}
        </p>
      </div>
    </section>
  );
}
