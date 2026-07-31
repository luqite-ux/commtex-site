"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ImageLightbox } from "@/components/ui/image-lightbox";
import { ChevronLeft, ChevronRight, Mail, ArrowLeft, ZoomIn } from "lucide-react";
import type { Product } from "@/lib/products-data";

export function ProductDetailClient({ product }: { product: Product }) {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [galleryLightboxOpen, setGalleryLightboxOpen] = useState(false);
  const [colorLightboxOpen, setColorLightboxOpen] = useState(false);
  const [colorLightboxIndex, setColorLightboxIndex] = useState(0);

  if (!product) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <section className="pt-28 pb-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="font-serif text-3xl font-semibold text-foreground mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">The product you are looking for does not exist.</p>
            <Button asChild>
              <Link href="/products">Back to Products</Link>
            </Button>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const nextImage = () => {
    setIsImageLoaded(false);
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setIsImageLoaded(false);
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb */}
      <section className="pt-28 pb-4 px-4">
        <div className="max-w-7xl mx-auto">
          <Link 
            href="/products" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-secondary rounded-lg overflow-hidden group">
                <Image
                  src={product.images[currentImageIndex].src || "/placeholder.svg"}
                  alt={product.images[currentImageIndex].alt}
                  fill
                  className={`object-cover transition-opacity duration-500 cursor-pointer ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setIsImageLoaded(true)}
                  onClick={() => setGalleryLightboxOpen(true)}
                  priority
                />

                {/* Zoom Button */}
                <button
                  type="button"
                  onClick={() => setGalleryLightboxOpen(true)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background hover:scale-110"
                  aria-label="Zoom image"
                >
                  <ZoomIn size={18} />
                </button>
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {product.images.length}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsImageLoaded(false);
                      setCurrentImageIndex(index);
                    }}
                    className={`relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                      currentImageIndex === index 
                        ? 'border-accent ring-2 ring-accent/20' 
                        : 'border-transparent hover:border-border'
                    }`}
                  >
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              {/* Title */}
              <div className="space-y-2">
                <p className="text-accent font-medium tracking-wide uppercase text-sm">{product.category}</p>
                <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
                  {product.name}
                </h1>
                <p className="text-muted-foreground">Article No. {product.articleNumber}</p>
              </div>

              {/* Specifications Table */}
              <div className="space-y-4">
                <h2 className="font-serif text-xl font-semibold text-foreground">Specifications</h2>
                <div className="border border-border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <tbody>
                      {product.specifications.map((spec, index) => (
                        <tr 
                          key={spec.label}
                          className={index % 2 === 0 ? 'bg-secondary/50' : 'bg-background'}
                        >
                          <td className="px-4 py-3 font-medium text-foreground border-r border-border w-1/3">
                            {spec.label}
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h2 className="font-serif text-xl font-semibold text-foreground">Product Details</h2>
                <div className="space-y-4">
                  {product.features.map((feature) => (
                    <div key={feature.title} className="space-y-2">
                      <h3 className="font-medium text-foreground">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {feature.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="flex-1">
                  <Link href="/contact">
                    <Mail className="w-4 h-4 mr-2" />
                    Request Sample
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="flex-1 bg-transparent">
                  <Link href="/contact">
                    Get Quote
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Color Options Section */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-8 text-center">
            Available Color Options
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {product.colorCategories.map((category, catIdx) => (
              <div key={category.title} className="space-y-3">
                <h3 className="font-medium text-foreground">{category.title}</h3>
                <div
                  className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer"
                  onClick={() => {
                    setColorLightboxIndex(catIdx);
                    setColorLightboxOpen(true);
                  }}
                >
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={`${category.title} color options`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  <button
                    type="button"
                    className="absolute top-3 right-3 w-9 h-9 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background hover:scale-110"
                    aria-label="Zoom image"
                  >
                    <ZoomIn size={16} />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground">
                  {category.colors}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Lightbox */}
      <ImageLightbox
        images={product.images.map((img) => ({ src: img.src, alt: img.alt }))}
        initialIndex={currentImageIndex}
        isOpen={galleryLightboxOpen}
        onClose={() => setGalleryLightboxOpen(false)}
      />

      {/* Color Options Lightbox */}
      <ImageLightbox
        images={product.colorCategories.map((cat) => ({
          src: cat.image,
          alt: `${cat.title} color options`,
        }))}
        initialIndex={colorLightboxIndex}
        isOpen={colorLightboxOpen}
        onClose={() => setColorLightboxOpen(false)}
      />

      <Footer />
    </main>
  );
}
