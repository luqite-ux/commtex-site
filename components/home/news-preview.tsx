"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { ArrowRight, Calendar } from "lucide-react";
import { newsArticles } from "@/lib/news-data";

export function NewsPreview() {
  const { t } = useI18n();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Get latest 3 news articles
  const latestNews = newsArticles.slice(0, 3);

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
    <section ref={sectionRef} className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div
          className={`flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <span className="text-accent text-sm uppercase tracking-[0.3em] mb-4 block">
              {t("newsPreview.label")}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-medium text-balance">
              {t("newsPreview.title")}
            </h2>
          </div>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-foreground text-sm uppercase tracking-widest transition-all duration-300 hover:gap-4 group self-start lg:self-auto"
          >
            {t("newsPreview.viewAll")}
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestNews.map((article, index) => (
            <Link
              key={article.slug}
              href={`/news/${article.slug}`}
              className={`group block transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
                <Image
                  src={article.coverImage || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                <Calendar size={14} />
                <span>{article.date}</span>
              </div>
              <h3 className="font-serif text-xl text-foreground font-medium group-hover:text-accent transition-colors duration-300 line-clamp-2">
                {article.title}
              </h3>
              <p className="mt-2 text-muted-foreground text-sm line-clamp-2">
                {article.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
