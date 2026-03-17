"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getNewsArticleBySlug } from "@/lib/news-data";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";

export default function NewsArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const article = getNewsArticleBySlug(slug);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <Link
            href="/news"
            className={`inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-300 mb-8 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <ArrowLeft size={16} />
            Back to News
          </Link>
          
          <div className="max-w-4xl">
            <span
              className={`text-accent text-sm uppercase tracking-widest transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {article.date}
            </span>
            <h1
              className={`font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-medium mt-4 mb-6 leading-tight transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {article.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            {/* Article Content */}
            <p
              className={`text-foreground text-lg leading-relaxed mb-12 transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {article.content}
            </p>

            {/* Image Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {article.images.map((image, index) => (
                <div
                  key={index}
                  className={`group relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${400 + index * 50}ms` }}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white text-sm font-medium">{image.caption}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* About Us Link */}
            <div
              className={`border-t border-border pt-12 transition-all duration-700 delay-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="bg-secondary rounded-xl p-8 text-center">
                <h3 className="font-serif text-2xl text-foreground font-medium mb-4">
                  Learn More About Us
                </h3>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  Discover our story, values, and the dedicated team behind Commtex's premium natural fiber fabrics.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  About Us
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors text-3xl"
            onClick={() => setSelectedImage(null)}
          >
            &times;
          </button>
          
          <button
            type="button"
            className="absolute left-4 md:left-8 text-white/70 hover:text-white transition-colors p-2"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(selectedImage === 0 ? article.images.length - 1 : selectedImage - 1);
            }}
          >
            <ArrowLeft size={32} />
          </button>
          
          <div className="relative max-w-5xl max-h-[80vh] w-full h-full">
            <Image
              src={article.images[selectedImage].src || "/placeholder.svg"}
              alt={article.images[selectedImage].alt}
              fill
              className="object-contain"
            />
            <p className="absolute bottom-4 left-0 right-0 text-center text-white text-lg">
              {article.images[selectedImage].caption}
            </p>
          </div>
          
          <button
            type="button"
            className="absolute right-4 md:right-8 text-white/70 hover:text-white transition-colors p-2"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(selectedImage === article.images.length - 1 ? 0 : selectedImage + 1);
            }}
          >
            <ArrowRight size={32} />
          </button>
        </div>
      )}

      <Footer />
    </main>
  );
}
