"use client";

import Image from "next/image";
import { useEffect, useCallback, useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface LightboxImage {
  src: string;
  alt: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageLightbox({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setIsZoomed(false);
  }, [initialIndex, isOpen]);

  const goNext = useCallback(() => {
    if (images.length <= 1 || isAnimating) return;
    setIsAnimating(true);
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsAnimating(false), 300);
  }, [images.length, isAnimating]);

  const goPrev = useCallback(() => {
    if (images.length <= 1 || isAnimating) return;
    setIsAnimating(true);
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsAnimating(false), 300);
  }, [images.length, isAnimating]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, goNext, goPrev]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 md:p-6">
        <div className="text-white/70 text-sm font-medium">
          {images.length > 1 && (
            <span>
              {currentIndex + 1} / {images.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsZoomed((z) => !z)}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label={isZoomed ? "Zoom out" : "Zoom in"}
          >
            {isZoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Close lightbox"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Image container */}
      <div
        className={cn(
          "relative z-[1] w-full h-full flex items-center justify-center p-12 md:p-20 transition-transform duration-300 cursor-grab active:cursor-grabbing",
          isZoomed && "cursor-zoom-out"
        )}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            if (isZoomed) {
              setIsZoomed(false);
            } else {
              onClose();
            }
          }
        }}
      >
        <div
          className={cn(
            "relative max-w-full max-h-full transition-all duration-300",
            isZoomed ? "scale-150 cursor-zoom-out" : "scale-100 cursor-zoom-in"
          )}
          style={{
            width: "100%",
            height: "100%",
          }}
          onClick={(e) => {
            e.stopPropagation();
            setIsZoomed((z) => !z);
          }}
        >
          <Image
            src={currentImage.src || "/placeholder.svg"}
            alt={currentImage.alt}
            fill
            className="object-contain select-none"
            sizes="100vw"
            priority
          />
        </div>
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 md:p-6">
          <div className="flex justify-center gap-2 overflow-x-auto pb-1">
            {images.map((img, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setCurrentIndex(index);
                  setIsZoomed(false);
                }}
                className={cn(
                  "relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all",
                  currentIndex === index
                    ? "border-white ring-1 ring-white/30 opacity-100"
                    : "border-transparent opacity-50 hover:opacity-80"
                )}
              >
                <Image
                  src={img.src || "/placeholder.svg"}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
