"use client";

import { useEffect, useRef, useState } from "react";
import { Palette, Ruler, Truck, MessageSquare } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Custom Colors",
    description:
      "Work with our design team to create custom color variations that match your brand identity and seasonal collections.",
  },
  {
    icon: Ruler,
    title: "Custom Specifications",
    description:
      "We offer flexible specifications including weight, width, and weave patterns to meet your exact requirements.",
  },
  {
    icon: MessageSquare,
    title: "Sample Service",
    description:
      "Request fabric samples before placing bulk orders. We provide quick sample delivery worldwide.",
  },
  {
    icon: Truck,
    title: "Global Shipping",
    description:
      "Efficient logistics network ensuring timely delivery to fashion houses across Europe, America, and Asia.",
  },
];

export function ProductsFeatures() {
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
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-accent text-sm uppercase tracking-[0.3em] mb-4 block">
            Our Services
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-medium text-balance">
            Tailored to Your Needs
          </h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            Beyond premium fabrics, we offer comprehensive services to support
            your fashion business from concept to delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group text-center p-8 bg-card border border-border rounded-lg transition-all duration-700 hover:shadow-lg hover:border-accent/30 hover:-translate-y-1 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-110">
                <service.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-serif text-xl text-foreground font-medium mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
