"use client";

import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ChevronDown, Search } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

interface FAQItem {
  questionKey: string;
  answerKey: string;
  category: string;
}

const faqData: FAQItem[] = [
  // About Materials
  { questionKey: "faq.q1", answerKey: "faq.a1", category: "materials" },
  { questionKey: "faq.q2", answerKey: "faq.a2", category: "materials" },
  { questionKey: "faq.q3", answerKey: "faq.a3", category: "materials" },
  { questionKey: "faq.q4", answerKey: "faq.a4", category: "materials" },
  { questionKey: "faq.q5", answerKey: "faq.a5", category: "materials" },
  // About Products
  { questionKey: "faq.q6", answerKey: "faq.a6", category: "products" },
  { questionKey: "faq.q7", answerKey: "faq.a7", category: "products" },
  { questionKey: "faq.q8", answerKey: "faq.a8", category: "products" },
  // About Services
  { questionKey: "faq.q9", answerKey: "faq.a9", category: "services" },
  { questionKey: "faq.q10", answerKey: "faq.a10", category: "services" },
  { questionKey: "faq.q11", answerKey: "faq.a11", category: "services" },
  { questionKey: "faq.q12", answerKey: "faq.a12", category: "services" },
];

const categories = [
  { key: "all", labelKey: "faq.category.all" },
  { key: "materials", labelKey: "faq.category.materials" },
  { key: "products", labelKey: "faq.category.products" },
  { key: "services", labelKey: "faq.category.services" },
];

function FAQAccordionItem({ questionKey, answerKey, isOpen, onToggle }: {
  questionKey: string;
  answerKey: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const { t } = useI18n();
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={onToggle}
        className="w-full py-6 flex items-start justify-between text-left gap-4 group"
      >
        <h3 className="text-lg font-medium text-foreground group-hover:text-accent transition-colors pr-4">
          {t(questionKey)}
        </h3>
        <ChevronDown
          size={20}
          className={cn(
            "flex-shrink-0 text-muted-foreground transition-transform duration-300 mt-1",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        style={{ height }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div ref={contentRef} className="pb-6 pr-12">
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {t(answerKey)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const { t } = useI18n();
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
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

  const filteredFAQs = faqData.filter((faq) => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      t(faq.questionKey).toLowerCase().includes(searchQuery.toLowerCase()) ||
      t(faq.answerKey).toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary/30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-accent mb-4">
              {t("faq.label")}
            </span>
            <h1 className="text-4xl md:text-5xl font-light text-foreground mb-6 text-balance">
              {t("faq.title")}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("faq.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={sectionRef} className="py-20 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            {/* Search Bar */}
            <div
              className={cn(
                "mb-8 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              <div className="relative">
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t("faq.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                />
              </div>
            </div>

            {/* Category Tabs */}
            <div
              className={cn(
                "flex flex-wrap gap-2 mb-10 transition-all duration-700 delay-100",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              {categories.map((category) => (
                <button
                  key={category.key}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(category.key);
                    setOpenIndex(0);
                  }}
                  className={cn(
                    "px-5 py-2 text-sm uppercase tracking-wider rounded-full transition-all duration-300",
                    selectedCategory === category.key
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                  )}
                >
                  {t(category.labelKey)}
                </button>
              ))}
            </div>

            {/* FAQ List */}
            <div
              className={cn(
                "transition-all duration-700 delay-200",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq, index) => (
                  <FAQAccordionItem
                    key={faq.questionKey}
                    questionKey={faq.questionKey}
                    answerKey={faq.answerKey}
                    isOpen={openIndex === index}
                    onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">{t("faq.noResults")}</p>
                </div>
              )}
            </div>

            {/* Contact CTA */}
            <div
              className={cn(
                "mt-16 p-8 bg-secondary/50 rounded-2xl text-center transition-all duration-700 delay-300",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              <h3 className="text-xl font-medium text-foreground mb-3">
                {t("faq.stillQuestions")}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t("faq.contactPrompt")}
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors"
              >
                {t("faq.contactButton")}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
