"use client";

import { useEffect, useRef, useState } from "react";
import { Heart, Users, Sparkles, Lightbulb } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export function AboutValues() {
  const { t } = useI18n();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const values = [
    {
      icon: Heart,
      titleKey: "about.values.strivers",
      descKey: "about.values.striversDesc",
    },
    {
      icon: Users,
      titleKey: "about.values.customers",
      descKey: "about.values.customersDesc",
    },
    {
      icon: Sparkles,
      titleKey: "about.values.quality",
      descKey: "about.values.qualityDesc",
    },
    {
      icon: Lightbulb,
      titleKey: "about.values.innovation",
      descKey: "about.values.innovationDesc",
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
    <section ref={sectionRef} className="py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-6 lg:px-12">
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-accent text-sm uppercase tracking-[0.3em] mb-4 block">
            {t("about.values.label")}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-medium text-balance">
            {t("about.values.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <div
              key={value.titleKey}
              className={`group p-8 lg:p-10 bg-card border border-border rounded-lg transition-all duration-700 hover:shadow-lg hover:border-accent/30 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-110">
                  <value.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-serif text-xl lg:text-2xl text-foreground font-medium mb-3">
                    {t(value.titleKey)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(value.descKey)}
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
