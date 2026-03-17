"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

const heroSlides = [
  {
    image: "/images/hero-factory-1.jpg",
    alt: "Modern textile manufacturing facility with advanced weaving machinery",
  },
  {
    image: "/images/hero-factory-3.jpg",
    alt: "Luxury fabric warehouse with premium wool and cashmere textiles",
  },
];

export function HeroSection() {
  const { t } = useI18n();
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.image}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-foreground/50" />
      </div>

      {/* Carousel Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-background/10 backdrop-blur-sm border border-background/20 text-background rounded-full transition-all duration-300 hover:bg-background/20 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-background/10 backdrop-blur-sm border border-background/20 text-background rounded-full transition-all duration-300 hover:bg-background/20 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide
                ? "w-8 h-2 bg-background"
                : "w-2 h-2 bg-background/40 hover:bg-background/60"
            } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center">
        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block text-background/80 text-sm uppercase tracking-[0.3em] mb-6">
            Since 2007 | 18 Years of Excellence
          </span>
        </div>

        <h1
          className={`font-serif text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-background font-medium leading-tight text-balance transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-2xl md:text-3xl lg:text-4xl font-sans font-light tracking-[0.2em] block mb-4">{t("hero.brand")}</span>
          {t("hero.title1")}
          <br />
          <span className="italic">{t("hero.title2")}</span>
        </h1>

        <p
          className={`mt-8 text-background/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-pretty transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {t("hero.subtitle")}
        </p>

        <div
          className={`mt-12 flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-900 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 bg-background text-foreground px-8 py-4 text-sm uppercase tracking-widest transition-all duration-300 hover:bg-background/90 hover:gap-4 group"
          >
            {t("hero.cta.products")}
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 border border-background text-background px-8 py-4 text-sm uppercase tracking-widest transition-all duration-300 hover:bg-background hover:text-foreground"
          >
            {t("hero.cta.contact")}
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1100 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-2 text-background/60">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-background/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-background animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
