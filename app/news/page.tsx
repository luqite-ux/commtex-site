import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { NewsHero } from "@/components/news/news-hero";
import { NewsList } from "@/components/news/news-list";
import { getArticles } from "@/lib/articles-db";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Industry Insights | Commtex ",
  description: "Stay updated with the latest news, events, and announcements from Commtex - your trusted partner in premium natural fiber fabrics.",
};

export default async function NewsPage() {
  const articles = await getArticles();
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <NewsHero />
      <NewsList articles={articles} />
      <Footer />
    </main>
  );
}
