"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AboutHero } from "@/components/about/about-hero";
import { AboutNameOrigin } from "@/components/about/about-name-origin";
import { AboutStory } from "@/components/about/about-story";
import { FactoryGallery } from "@/components/about/factory-gallery";
import { AboutValues } from "@/components/about/about-values";
import { AboutTimeline } from "@/components/about/about-timeline";
import { AboutCTA } from "@/components/about/about-cta";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <AboutHero />
      <AboutNameOrigin />
      <AboutStory />
      <FactoryGallery />
      <AboutValues />
      <AboutTimeline />
      <AboutCTA />
      <Footer />
    </main>
  );
}
