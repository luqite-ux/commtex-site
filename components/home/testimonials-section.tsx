"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quoteKey: "testimonials.quote1",
    author: "Marie Dubois",
    roleKey: "testimonials.role1",
    company: "Maison de Mode, Paris",
    rating: 5,
  },
  {
    quoteKey: "testimonials.quote2",
    author: "Hans Mueller",
    roleKey: "testimonials.role2",
    company: "Textil AG, Munich",
    rating: 5,
  },
  {
    quoteKey: "testimonials.quote3",
    author: "Isabella Rossi",
    roleKey: "testimonials.role3",
    company: "Milano Fashion House",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const { t } = useI18n();
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
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

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const goToPrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-foreground text-background overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-accent text-sm uppercase tracking-[0.3em] mb-4 block">
            {t("testimonials.label")}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-background font-medium text-balance">
            {t("testimonials.title")}
          </h2>
        </div>

        {/* Testimonial Carousel */}
        <div
          className={`relative max-w-4xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="text-center">
                    <Quote className="w-12 h-12 text-accent mx-auto mb-8 opacity-50" />

                    {/* Stars */}
                    <div className="flex justify-center gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-accent text-accent"
                        />
                      ))}
                    </div>

                    <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl text-background/90 leading-relaxed mb-8 italic">
                      &ldquo;{t(testimonial.quoteKey)}&rdquo;
                    </blockquote>

                    <div>
                      <p className="font-medium text-lg text-background">
                        {testimonial.author}
                      </p>
                      <p className="text-background/60 text-sm">
                        {t(testimonial.roleKey)}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={goToPrev}
              className="w-12 h-12 rounded-full border border-background/30 flex items-center justify-center text-background/70 hover:bg-background hover:text-foreground transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-accent w-8"
                      : "bg-background/30 hover:bg-background/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="w-12 h-12 rounded-full border border-background/30 flex items-center justify-center text-background/70 hover:bg-background hover:text-foreground transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
