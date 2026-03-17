"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

export function AboutCTA() {
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
    <section ref={sectionRef} className="py-24 lg:py-32 bg-foreground">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-background font-medium text-balance">
              Ready to Partner With Us?
            </h2>
            <p className="mt-6 text-background/70 text-lg leading-relaxed max-w-2xl mx-auto">
              Discover how Commtex can elevate your fashion collections with our
              premium natural fiber fabrics. Let&apos;s create something exceptional
              together.
            </p>
          </div>

          <div
            className={`mt-10 flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-background text-foreground px-8 py-4 text-sm uppercase tracking-widest transition-all duration-300 hover:bg-background/90 hover:gap-4 group"
            >
              View Products
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border border-background text-background px-8 py-4 text-sm uppercase tracking-widest transition-all duration-300 hover:bg-background hover:text-foreground"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
