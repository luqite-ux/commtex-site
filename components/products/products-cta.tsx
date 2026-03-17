"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Mail } from "lucide-react";

export function ProductsCTA() {
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
    <section ref={sectionRef} className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-accent text-sm uppercase tracking-[0.3em] mb-4 block">
              Get Started
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-medium text-balance">
              Request Samples Today
            </h2>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
              Interested in our fabrics? Contact us to request samples or
              discuss your specific requirements. Our team is ready to help you
              find the perfect materials for your collection.
            </p>
          </div>

          <div
            className={`mt-10 flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-8 py-4 text-sm uppercase tracking-widest transition-all duration-300 hover:bg-foreground/90 hover:gap-4 group"
            >
              Contact Us
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <a
              href="mailto:promenade@txztextile.com?subject=Sample Request"
              className="inline-flex items-center justify-center gap-2 border border-foreground text-foreground px-8 py-4 text-sm uppercase tracking-widest transition-all duration-300 hover:bg-foreground hover:text-background"
            >
              <Mail size={16} />
              Request Samples
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
