"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export function ContactInfo() {
  const { t } = useI18n();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const contactDetails = [
    {
      icon: MapPin,
      titleKey: "contact.info.location",
      details: [
        "Building B, No.16 Shuanghong Road",
        "Haizhou Street, Haining City",
        "Jiaxing, Zhejiang, China",
      ],
      link: null,
    },
    {
      icon: Phone,
      titleKey: "contact.info.phone",
      details: ["+86 198 8490 0913"],
      link: "tel:+8619884900913",
    },
    {
      icon: Mail,
      titleKey: "contact.info.email",
      details: ["commtex@gocommtex.com"],
      link: "mailto:commtex@gocommtex.com",
    },
    {
      icon: Clock,
      titleKey: "contact.info.hours",
      details: [t("contact.info.weekdays"), t("contact.info.saturday"), t("contact.info.sunday")],
      link: null,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`transition-all duration-1000 delay-200 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <span className="text-accent text-sm uppercase tracking-[0.3em] mb-4 block">
        {t("contact.info.label")}
      </span>
      <h2 className="font-serif text-3xl md:text-4xl text-foreground font-medium mb-8">
        {t("contact.info.title")}
      </h2>

      <div className="space-y-8">
        {contactDetails.map((item, index) => (
          <div
            key={item.title}
            className={`flex items-start gap-4 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: `${300 + index * 100}ms` }}
          >
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
              <item.icon className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-serif text-lg text-foreground font-medium mb-1">
                {t(item.titleKey)}
              </h3>
              {item.details.map((detail, i) =>
                item.link ? (
                  <a
                    key={i}
                    href={item.link}
                    className="block text-muted-foreground transition-colors duration-300 hover:text-foreground"
                  >
                    {detail}
                  </a>
                ) : (
                  <p key={i} className="text-muted-foreground">
                    {detail}
                  </p>
                )
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Map Placeholder */}
      <div
        className={`mt-12 aspect-video bg-secondary rounded-lg overflow-hidden relative transition-all duration-1000 delay-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.5!2d120.68!3d30.51!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDMwJzM2LjAiTiAxMjDCsDQwJzQ4LjAiRQ!5e0!3m2!1sen!2scn!4v1600000000000!5m2!1sen!2scn"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Commtex Location"
          className="absolute inset-0"
        />
      </div>

      {/* Additional Info */}
      <div
        className={`mt-8 p-6 bg-secondary rounded-lg transition-all duration-1000 delay-800 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h3 className="font-serif text-lg text-foreground font-medium mb-2">
          {t("contact.info.quickResponse")}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {t("contact.info.quickResponseText")}
        </p>
      </div>
    </div>
  );
}
