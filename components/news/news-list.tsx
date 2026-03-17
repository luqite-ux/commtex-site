"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getAllNewsArticles } from "@/lib/news-data";
import { ArrowRight } from "lucide-react";

export function NewsList() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const articles = getAllNewsArticles();

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
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Link
              key={article.id}
              href={`/news/${article.slug}`}
              className={`group bg-card border border-border rounded-lg overflow-hidden transition-all duration-700 hover:shadow-xl hover:border-accent/30 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${100 + index * 100}ms` }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={article.coverImage || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <span className="text-muted-foreground text-sm">
                  {article.date}
                </span>
                <h2 className="font-serif text-xl text-foreground font-medium mt-2 mb-3 group-hover:text-accent transition-colors">
                  {article.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-2 mt-4 text-accent text-sm font-medium">
                  Read More
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
