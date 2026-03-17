"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { Search, Palette, Factory, Truck, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Search,
    titleKey: "process.step1.title",
    descKey: "process.step1.desc",
  },
  {
    icon: Palette,
    titleKey: "process.step2.title",
    descKey: "process.step2.desc",
  },
  {
    icon: Factory,
    titleKey: "process.step3.title",
    descKey: "process.step3.desc",
  },
  {
    icon: Truck,
    titleKey: "process.step4.title",
    descKey: "process.step4.desc",
  },
  {
    icon: CheckCircle,
    titleKey: "process.step5.title",
    descKey: "process.step5.desc",
  },
];

export function ProcessSection() {
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
            {t("process.label")}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-medium text-balance">
            {t("process.title")}
          </h2>
          <p className="mt-6 text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("process.subtitle")}
          </p>
        </div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.titleKey}
                className={`relative transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${200 + index * 150}ms` }}
              >
                {/* Step Card */}
                <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-accent/30 transition-all duration-300 group h-full">
                  {/* Step Number */}
                  <div className="relative z-10 w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-4 mx-auto lg:mx-0 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                    <step.icon className="w-6 h-6 text-accent group-hover:text-background transition-colors duration-300" />
                  </div>

                  {/* Step Number Badge */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-accent text-background text-sm font-semibold flex items-center justify-center">
                    {index + 1}
                  </div>

                  <h3 className="font-serif text-lg text-foreground font-medium mb-2 text-center lg:text-left">
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed text-center lg:text-left">
                    {t(step.descKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
