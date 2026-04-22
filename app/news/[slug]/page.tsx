"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Simple markdown-like content renderer
function renderContent(content: string, images?: { src: string; alt: string; caption: string }[]) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let currentParagraph: string[] = [];
  let inCallout = false;
  let calloutContent: string[] = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(' ').trim();
      if (text) {
        elements.push(
          <p key={elements.length} className="text-foreground leading-relaxed mb-6 text-justify">
            {renderInlineFormatting(text)}
          </p>
        );
      }
      currentParagraph = [];
    }
  };

  const renderInlineFormatting = (text: string): React.ReactNode => {
    // Handle bold text with **
    const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
        return <em key={i} className="italic">{part.slice(1, -1)}</em>;
      }
      return part;
    });
  };

  const renderInlineImage = (index: number) => {
    if (!images || !images[index]) return null;
    const img = images[index];
    return (
      <figure key={`img-${elements.length}`} className="my-8">
        <div className="relative aspect-[16/10] rounded-lg overflow-hidden">
          <Image
            src={img.src || "/placeholder.svg"}
            alt={img.alt}
            fill
            className="object-cover"
          />
        </div>
        {img.caption && (
          <figcaption className="mt-3 text-center text-sm text-muted-foreground italic">
            {img.caption}
          </figcaption>
        )}
      </figure>
    );
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Handle inline images ![image](index)
    const imageMatch = line.trim().match(/^!\[image\]\((\d+)\)$/);
    if (imageMatch) {
      flushParagraph();
      const imageIndex = parseInt(imageMatch[1], 10);
      const imageElement = renderInlineImage(imageIndex);
      if (imageElement) {
        elements.push(imageElement);
      }
      continue;
    }
    
    // Handle callout blocks
    if (line.trim() === ':::callout') {
      flushParagraph();
      inCallout = true;
      calloutContent = [];
      continue;
    }
    
    if (line.trim() === ':::' && inCallout) {
      // Render callout
      elements.push(
        <div key={elements.length} className="border-l-4 border-accent pl-6 py-4 my-8 bg-secondary/30">
          {renderContent(calloutContent.join('\n'), images)}
        </div>
      );
      inCallout = false;
      continue;
    }
    
    if (inCallout) {
      calloutContent.push(line);
      continue;
    }

    // Handle horizontal rule
    if (line.trim() === '---') {
      flushParagraph();
      elements.push(<hr key={elements.length} className="my-12 border-border" />);
      continue;
    }

    // Handle headings
    if (line.startsWith('### ')) {
      flushParagraph();
      const headingText = line.slice(4);
      elements.push(
        <h3 key={elements.length} className="font-serif text-xl md:text-2xl text-foreground font-semibold mt-10 mb-4 leading-tight">
          {headingText}
        </h3>
      );
      continue;
    }

    if (line.startsWith('## ')) {
      flushParagraph();
      const headingText = line.slice(3);
      elements.push(
        <h2 key={elements.length} className="font-serif text-2xl md:text-3xl text-[#8B4513] font-semibold mt-12 mb-6 leading-tight">
          {headingText}
        </h2>
      );
      continue;
    }

    // Handle empty lines
    if (line.trim() === '') {
      flushParagraph();
      continue;
    }

    // Regular text - add to current paragraph
    currentParagraph.push(line);
  }

  flushParagraph();
  
  return elements;
}

export default function NewsArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const { data: article, isLoading } = useSWR(`/api/news/${slug}`, fetcher);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    if (article) {
      setIsVisible(true);
    }
  }, [article]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-16 flex items-center justify-center">
          <div className="text-muted-foreground">Loading...</div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!article) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-16 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-serif text-foreground mb-4">Article Not Found</h1>
          <Link href="/news" className="text-accent hover:underline">
            Back to News
          </Link>
        </div>
        <Footer />
      </main>
    );
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
              className={`font-serif text-3xl md:text-4xl lg:text-5xl text-[#8B4513] font-medium mt-4 mb-6 leading-tight transition-all duration-700 delay-200 ${
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
            <article
              className={`prose prose-lg max-w-none transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {renderContent(article.content, article.images)}
            </article>

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
