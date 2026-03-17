"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n/context";

export function ContactHero() {
  const { t } = useI18n();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative py-32 lg:py-40 bg-foreground overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-background/5 skew-x-12 -translate-x-1/4" />

      <div className="relative container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-background/60 text-sm uppercase tracking-[0.3em] mb-6 block">
              {t("contact.hero.label")}
            </span>
          </div>

          <h1
            className={`font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-background font-medium leading-tight text-balance transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {t("contact.hero.title")}
          </h1>

          <p
            className={`mt-8 text-background/70 text-lg md:text-xl max-w-2xl leading-relaxed text-pretty transition-all duration-1000 delay-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {t("contact.hero.subtitle")}
          </p>
        </div>
      </div>
    </section>
  );
}
