"use client";

import { useEffect, useRef, useState } from "react";

const milestones = [
  {
    year: "2007",
    title: "Foundation",
    description:
      "Commtex was established in Jiaxing, Zhejiang, beginning our journey in premium natural fiber fabrics.",
  },
  {
    year: "2012",
    title: "Expansion",
    description:
      "Expanded our production facility and established partnerships with international fashion brands.",
  },
  {
    year: "2017",
    title: "10 Year Anniversary",
    description:
      "Celebrated a decade of excellence with the opening of our 10,000 sqm modern production facility.",
  },
  {
    year: "2020",
    title: "Global Reach",
    description:
      "Extended our supply chain network to serve fashion brands across Europe, America, and Asia.",
  },
  {
    year: "2025",
    title: "Innovation Leader",
    description:
      "Continuing to innovate in sustainable natural fiber processing and premium fabric development.",
  },
];

export function AboutTimeline() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    <section ref={sectionRef} className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div
          className={`text-center max-w-3xl mx-auto mb-16 lg:mb-24 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-accent text-sm uppercase tracking-[0.3em] mb-4 block">
            Our Journey
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-medium text-balance">
            Milestones of Excellence
          </h2>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-border lg:-translate-x-px" />

          {/* Milestones */}
          <div className="space-y-12 lg:space-y-16">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className={`relative flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-0 transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${200 + index * 150}ms` }}
              >
                {/* Left Content (even) / Right Content (odd) on desktop */}
                <div
                  className={`lg:w-1/2 lg:pr-12 ${
                    index % 2 === 0 ? "lg:text-right" : "lg:order-2 lg:pl-12 lg:pr-0"
                  }`}
                >
                  <div className="pl-10 lg:pl-0">
                    <span className="font-serif text-3xl lg:text-4xl text-accent font-medium">
                      {milestone.year}
                    </span>
                    <h3 className="font-serif text-xl lg:text-2xl text-foreground font-medium mt-2 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Center Dot */}
                <div className="absolute left-4 lg:left-1/2 w-3 h-3 rounded-full bg-accent lg:-translate-x-1/2 mt-2 lg:mt-0" />

                {/* Spacer for opposite side on desktop */}
                <div className={`hidden lg:block lg:w-1/2 ${index % 2 === 0 ? "lg:order-2" : ""}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
