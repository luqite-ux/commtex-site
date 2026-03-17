"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const factoryImages = [
  {
    src: "/images/factory-real-1.jpg",
    alt: "Modern textile manufacturing equipment",
    title: "Advanced Manufacturing",
  },
  {
    src: "/images/factory-real-2.jpg",
    alt: "Fabric processing facility",
    title: "Processing Facility",
  },
  {
    src: "/images/factory-real-3.jpg",
    alt: "Modern production workspace",
    title: "Production Workshop",
  },
  {
    src: "/images/factory-fabrics.jpg",
    alt: "Premium fabric collection",
    title: "Fabric Collection",
  },
  {
    src: "/images/factory-culture.jpg",
    alt: "Company culture wall",
    title: "Company Culture",
  },
];

export function FactoryGallery() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
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
    <section ref={sectionRef} className="py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-accent text-sm uppercase tracking-[0.3em] mb-4 block">
            Our Facilities
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-medium mb-6 text-balance">
            Modern Production Environment
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Take a glimpse into our 10,000 square meter state-of-the-art
            production facility, equipped with advanced machinery and maintained
            to the highest standards.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {factoryImages.map((image, index) => (
            <div
              key={image.src}
              className={`group relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${100 + index * 100}ms` }}
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-background font-medium">{image.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full aspect-video">
            <Image
              src={factoryImages[selectedImage].src || "/placeholder.svg"}
              alt={factoryImages[selectedImage].alt}
              fill
              className="object-contain"
            />
          </div>
          <button
            className="absolute top-6 right-6 text-background text-4xl hover:opacity-70 transition-opacity"
            onClick={() => setSelectedImage(null)}
          >
            &times;
          </button>
        </div>
      )}
    </section>
  );
}
