"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/context";

export function AboutNameOrigin() {
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
        <div className="max-w-4xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-accent text-sm uppercase tracking-[0.3em] mb-4 block">
              {t("about.name.label")}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-medium mb-8 text-balance">
              {t("about.name.title")}
            </h2>
          </div>

          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-12 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Companion */}
            <div className="bg-background p-8 lg:p-10 rounded-lg border border-border">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="font-serif text-2xl text-accent font-medium">C</span>
              </div>
              <h3 className="font-serif text-2xl text-foreground font-medium mb-4">
                {t("about.name.companion")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("about.name.companionDesc")}
              </p>
            </div>

            {/* Matrix */}
            <div className="bg-background p-8 lg:p-10 rounded-lg border border-border">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="font-serif text-2xl text-accent font-medium">M</span>
              </div>
              <h3 className="font-serif text-2xl text-foreground font-medium mb-4">
                {t("about.name.matrix")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("about.name.matrixDesc")}
              </p>
            </div>
          </div>

          <div
            className={`mt-12 p-8 lg:p-10 bg-foreground text-background rounded-lg transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="font-serif text-xl lg:text-2xl italic leading-relaxed text-balance">
              {t("about.name.conclusion")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
