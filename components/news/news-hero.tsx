"use client";

import { useEffect, useState } from "react";

export function NewsHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative pt-32 pb-20 bg-secondary">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          <span
            className={`text-accent text-sm uppercase tracking-widest transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            News Center
          </span>
          <h1
            className={`font-serif text-4xl md:text-5xl lg:text-6xl text-foreground font-medium mt-4 mb-6 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Latest Updates
          </h1>
          <p
            className={`text-muted-foreground text-lg leading-relaxed transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Stay informed about our company events, industry insights, and the latest developments in premium textile manufacturing.
          </p>
        </div>
      </div>
    </section>
  );
}
