"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { Award, Globe, BadgeCheck } from "lucide-react";

const certifications = [
  {
    icon: Award,
    nameKey: "certifications.grs",
    descKey: "certifications.grsDesc",
  },
  {
    icon: Globe,
    nameKey: "certifications.bsci",
    descKey: "certifications.bsciDesc",
  },
  {
    icon: BadgeCheck,
    nameKey: "certifications.rws",
    descKey: "certifications.rwsDesc",
  },
];

export function CertificationsSection() {
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
    <section ref={sectionRef} className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-accent text-sm uppercase tracking-[0.3em] mb-4 block">
            {t("certifications.label")}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-medium text-balance">
            {t("certifications.title")}
          </h2>
          <p className="mt-6 text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("certifications.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {certifications.map((cert, index) => (
            <div
              key={cert.nameKey}
              className={`group p-6 bg-background rounded-xl border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-500 text-center ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                <cert.icon className="w-8 h-8 text-accent group-hover:text-background transition-colors duration-300" />
              </div>
              <h3 className="font-serif text-sm font-medium text-foreground mb-1">
                {t(cert.nameKey)}
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {t(cert.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
