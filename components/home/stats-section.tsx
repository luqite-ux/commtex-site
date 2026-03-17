"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/context";

export function StatsSection() {
  const { t } = useI18n();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const stats = [
    { value: "18+", labelKey: "stats.years" },
    { value: "10,000", labelKey: "stats.facility" },
    { value: "50+", labelKey: "stats.partners" },
    { value: "100+", labelKey: "stats.clients" },
  ];

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
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/factory.jpg"
          alt="Modern textile production facility"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-foreground/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-background/60 text-sm uppercase tracking-[0.3em] mb-4 block">
            {t("stats.label")}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-background font-medium text-balance">
            {t("stats.title")}
          </h2>
          <p className="mt-6 text-background/70 text-lg leading-relaxed">
            From raw material selection to final delivery, we maintain the highest
            standards at every step of our integrated production process.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <div className="font-serif text-4xl md:text-5xl lg:text-6xl text-background font-medium mb-2">
                {stat.value}
              </div>
              <div className="text-background/60 text-sm uppercase tracking-wider">
                {t(stat.labelKey)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
