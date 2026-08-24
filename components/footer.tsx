"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { FOOTER_COMPANY_NAME, useContactSettings } from "@/lib/hooks/use-contact-settings";

export function Footer() {
  const { t } = useI18n();
  const { contact } = useContactSettings();
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4">
              <Link href="/" aria-label="Commtex home" className="inline-block max-w-full rounded bg-white p-1">
                <Image
                  src="/images/logo-footer.png"
                  alt="Commtex - Companion Matrix Textile"
                  width={213}
                  height={80}
                  className="h-16 w-auto max-w-full object-contain"
                  priority
                />
              </Link>
              <div className="w-px h-10 bg-background/30" />
              <Image
                src="/images/brands/zhiji-logo.png"
                alt="ZHIJI - 知集"
                width={160}
                height={64}
                className="h-16 w-auto max-w-full object-contain"
              />
            </div>
            <p className="mt-6 text-background/70 text-sm leading-relaxed">
              {t("footer.description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-6">{t("footer.quickLinks")}</h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: t("nav.home") },
                { href: "/about", label: t("nav.about") },
                { href: "/products", label: t("nav.products") },
                { href: "/news", label: t("nav.news") },
                { href: "/contact", label: t("nav.contact") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-background/70 text-sm transition-colors duration-300 hover:text-background"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-6">Products</h4>
            <ul className="space-y-3">
              {["Wool Fabrics", "Cashmere", "Yak Fiber", "Alpaca", "Silk", "Lyocell"].map((product) => (
                <li key={product}>
                  <Link
                    href="/products"
                    className="text-background/70 text-sm transition-colors duration-300 hover:text-background"
                  >
                    {product}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-6">{t("footer.contact")}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-background/70 mt-0.5 shrink-0" />
                <span className="text-background/70 text-sm">
                  {contact.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-background/70 shrink-0" />
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="text-background/70 text-sm transition-colors duration-300 hover:text-background"
                >
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-background/70 shrink-0" />
                <a
                  href={`mailto:${contact.email}`}
                  className="text-background/70 text-sm transition-colors duration-300 hover:text-background"
                >
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-background/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/50 text-sm">
              {contact.copyright || `© ${new Date().getFullYear()} ${FOOTER_COMPANY_NAME} ${t("footer.copyright")}`}
            </p>
            <p className="text-background/50 text-sm">
              Premium Natural Fiber Fabrics Since 2007
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
