"use client";

import { useEffect, useRef, useState } from "react";
import { Award, Factory, Users, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export function FeaturesSection() {
  const { t } = useI18n();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const features = [
    {
      icon: Award,
      titleKey: "features.experience.title",
      descKey: "features.experience.desc",
    },
    {
      icon: Factory,
      titleKey: "features.factory.title",
      descKey: "features.factory.desc",
    },
    {
      icon: Users,
      titleKey: "features.partners.title",
      descKey: "features.partners.desc",
    },
    {
      icon: Sparkles,
      titleKey: "features.quality.title",
      descKey: "features.quality.desc",
    },
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
    <section ref={sectionRef} className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div
          className={`text-center max-w-3xl mx-auto mb-16 lg:mb-24 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-accent text-sm uppercase tracking-[0.3em] mb-4 block">
            {t("features.label")}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-medium text-balance">
            {t("features.title")}
          </h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            {t("features.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group p-8 bg-card border border-border rounded-lg transition-all duration-700 hover:shadow-lg hover:border-accent/30 hover:-translate-y-1 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-110">
                <feature.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-serif text-xl text-foreground font-medium mb-3">
                {t(feature.titleKey)}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t(feature.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
