"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n/context";
import { LanguageSelector } from "@/components/language-selector";

export function Header() {
  const { t } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/products", label: t("nav.products") },
    { href: "/faq", label: t("nav.faq") },
    { href: "/news", label: t("nav.news") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-background/95 backdrop-blur-md",
        isScrolled ? "shadow-sm py-4" : "py-6"
      )}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="transition-all duration-300 hover:opacity-80 flex items-center gap-3"
          >
            <Image
              src="/images/logo-icon.png"
              alt="Commtex"
              width={60}
              height={60}
              className="h-14 md:h-16 w-auto"
              priority
            />
            <span className="font-semibold text-lg md:text-xl tracking-wide text-foreground">COMMTEX</span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <ul className="hidden md:flex items-center justify-center gap-10 flex-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm uppercase tracking-widest text-muted-foreground transition-all duration-300 hover:text-foreground relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-foreground after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Language Selector */}
          <div className="hidden md:flex items-center">
            <LanguageSelector />
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-500",
            isMobileMenuOpen ? "max-h-64 opacity-100 mt-6" : "max-h-0 opacity-0"
          )}
        >
          <ul className="flex flex-col gap-4 pb-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm uppercase tracking-widest text-muted-foreground transition-all duration-300 hover:text-foreground block py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-t border-border pt-4 pb-2">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
}
