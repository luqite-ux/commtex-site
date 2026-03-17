"use client";

import { useEffect, useState } from "react";

export function ProductsHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative py-32 lg:py-40 bg-secondary overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 translate-x-1/4" />

      <div className="relative container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-accent text-sm uppercase tracking-[0.3em] mb-6 block">
              Our Collection
            </span>
          </div>

          <h1
            className={`font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground font-medium leading-tight text-balance transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Premium Natural
            <br />
            <span className="italic">Fiber Fabrics</span>
          </h1>

          <p
            className={`mt-8 text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed text-pretty transition-all duration-1000 delay-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Explore our extensive range of natural fiber fabrics, carefully
            curated for autumn/winter fashion collections. From luxurious
            cashmere to sustainable lyocell, we offer materials that combine
            comfort, warmth, and style.
          </p>
        </div>
      </div>
    </section>
  );
}
