export interface NewsImage {
  src: string;
  alt: string;
  caption: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  coverImage: string;
  images: NewsImage[];
}

export const newsArticles: NewsArticle[] = [
  {
    id: "1",
    slug: "2025-annual-celebration",
    title: "A Night to Remember: Commtex Teams Gather for 2025 Annual Festivities",
    excerpt: "At Commtex, we believe that our strength lies not only in the innovative products we create but also in the vibrant, dedicated team behind them.",
    content: `At Commtex, we believe that our strength lies not only in the innovative products we create but also in the vibrant, dedicated team behind them. As we close another remarkable year, we're thrilled to share a glimpse of our recent Annual Celebration—a night dedicated to honoring our collective achievements, fostering camaraderie, and strengthening the bonds that make our work meaningful.`,
    date: "January 2025",
    coverImage: "/images/news/2025-annual/05-big-family.jpg",
    images: [
      {
        src: "/images/news/2025-annual/01-show-time.jpg",
        alt: "Team performance on stage",
        caption: "Show Time"
      },
      {
        src: "/images/news/2025-annual/02-fabrics-display.jpg",
        alt: "Display corner with clothes made from our fabrics",
        caption: "A corner with clothes made by our fabrics"
      },
      {
        src: "/images/news/2025-annual/03-happy-show.jpg",
        alt: "Team members performing a fun show",
        caption: "A happy show"
      },
      {
        src: "/images/news/2025-annual/04-awarding-honor.jpg",
        alt: "Award ceremony moment",
        caption: "The moment of awarding honor"
      },
      {
        src: "/images/news/2025-annual/05-big-family.jpg",
        alt: "Commtex team group photo",
        caption: "Our big FAMILY"
      },
      {
        src: "/images/news/2025-annual/06-trophies.jpg",
        alt: "Crystal trophies for outstanding staff members",
        caption: "Trophies for the outstanding staff"
      },
      {
        src: "/images/news/2025-annual/07-annual-report.jpg",
        alt: "Team member presenting the annual report",
        caption: "Annual report"
      },
      {
        src: "/images/news/2025-annual/08-caishen.jpg",
        alt: "Caishen - God of Fortune bringing prosperity",
        caption: "Caishen, an auspicious symbol of prosperity and fortune in Chinese culture"
      },
      {
        src: "/images/news/2025-annual/09-backdrop.jpg",
        alt: "Festive red New Year backdrop with gifts",
        caption: "Gifts & New Year background wall"
      },
      {
        src: "/images/news/2025-annual/10-little-angel.jpg",
        alt: "A little girl surrounded by gift boxes",
        caption: "A little cutie angel"
      },
      {
        src: "/images/news/2025-annual/11-new-year-wish.jpg",
        alt: "New Year wish card on dining table",
        caption: "New Year's wish"
      }
    ]
  }
];

export function getNewsArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((article) => article.slug === slug);
}

export function getAllNewsArticles(): NewsArticle[] {
  return newsArticles;
}
