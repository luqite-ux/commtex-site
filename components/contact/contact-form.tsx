"use client";

import React from "react"

import { useState, useEffect, useRef } from "react";
import { Send, CheckCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export function ContactForm() {
  const { t } = useI18n();
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after delay
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
      });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div
      ref={sectionRef}
      className={`transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <span className="text-accent text-sm uppercase tracking-[0.3em] mb-4 block">
        {t("contact.form.label")}
      </span>
      <h2 className="font-serif text-3xl md:text-4xl text-foreground font-medium mb-8">
        {t("contact.form.title")}
      </h2>

      {isSubmitted ? (
        <div className="bg-secondary p-8 rounded-lg text-center">
          <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
          <h3 className="font-serif text-2xl text-foreground font-medium mb-2">
            {t("contact.form.success")}
          </h3>
          <p className="text-muted-foreground">
            {t("contact.form.successMsg")}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {t("contact.form.name")} *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {t("contact.form.email")} *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300"
                placeholder="john@company.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {t("contact.form.company")}
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300"
                placeholder="Your Company"
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {t("contact.form.subject")} *
              </label>
              <select
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300"
              >
                <option value="">{t("contact.form.selectSubject")}</option>
                <option value="sample-request">{t("contact.form.sampleRequest")}</option>
                <option value="product-inquiry">{t("contact.form.productInquiry")}</option>
                <option value="partnership">{t("contact.form.partnership")}</option>
                <option value="custom-order">{t("contact.form.customOrder")}</option>
                <option value="other">{t("contact.form.other")}</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-foreground mb-2"
            >
              {t("contact.form.message")} *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300 resize-none"
              placeholder="Tell us about your requirements..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-8 py-4 text-sm uppercase tracking-widest transition-all duration-300 hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed group w-full md:w-auto"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                {t("contact.form.sending")}
              </>
            ) : (
              <>
                {t("contact.form.send")}
                <Send
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
