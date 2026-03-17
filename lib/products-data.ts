export interface ProductImage {
  src: string;
  alt: string;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductFeature {
  title: string;
  content: string;
}

export interface ColorCategory {
  title: string;
  image: string;
  colors: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  articleNumber: string;
  category: string;
  mainImage: string;
  images: ProductImage[];
  specifications: ProductSpecification[];
  features: ProductFeature[];
  colorCategories: ColorCategory[];
}

export const products: Product[] = [
  {
    id: "1",
    slug: "ss250403zs",
    name: "Double-faced Wool Fabric",
    articleNumber: "SS250403ZS",
    category: "Wool Blend",
    mainImage: "/images/products/ss250403zs/main.jpg",
    images: [
      { src: "/images/products/ss250403zs/main.jpg", alt: "Double-faced Wool Fabric - Main View" },
      { src: "/images/products/ss250403zs/detail.jpg", alt: "Double-faced Wool Fabric - Detail View" },
      { src: "/images/products/ss250403zs/colors-light.jpg", alt: "Color Options - Light Tones" },
      { src: "/images/products/ss250403zs/colors-dark.jpg", alt: "Color Options - Dark Tones" },
      { src: "/images/products/ss250403zs/colors-purple.jpg", alt: "Color Options - Purple & Grey Tones" },
      { src: "/images/products/ss250403zs/colors-special.jpg", alt: "Color Options - Special Colors" },
    ],
    specifications: [
      { label: "Article Number", value: "SS250403ZS" },
      { label: "Weight", value: "860 G/M" },
      { label: "Width", value: "148 ± 2 cm" },
      { label: "Composition", value: "70% Wool, 10% Cashmere, 20% Tencel" },
    ],
    features: [
      {
        title: "Features",
        content: "It boasts excellent warmth retention paired with good air permeability. The addition of Tencel reduces the wrinkling tendency of pure wool fabrics, while enhancing drapability and antistatic properties. With moderate strength, it is more durable than pure cashmere fabrics and easier to maintain."
      },
      {
        title: "Texture",
        content: "It feels soft and smooth, featuring the delicate softness of cashmere and the crisp texture of wool. Tencel fibers bring a fresh skin-friendly touch without any roughness."
      },
      {
        title: "Appearance",
        content: "The fabric surface has a soft and natural luster without harsh glare. It has a flat and fine texture with good drapability. Garments made from it have a neat silhouette, combining casual and exquisite styles, making it ideal for high-quality autumn and winter clothing."
      }
    ],
    colorCategories: [
      {
        title: "Light Tones",
        image: "/images/products/ss250403zs/colors-light.jpg",
        colors: "Off White, Cloud White, Grey White, Morning Sand White, Misty Almond, Honey Camel, Light Blue, Light Orchid Blue, Oat Green, Olive Grey, Dusty Rose"
      },
      {
        title: "Dark Tones",
        image: "/images/products/ss250403zs/colors-dark.jpg",
        colors: "Star Brown Green, Warm Velvet Brown, Deep Ink Black, Navy Blue, Black Navy, Origin Black, Double-faced options available"
      },
      {
        title: "Purple & Grey Tones",
        image: "/images/products/ss250403zs/colors-purple.jpg",
        colors: "Deep Coffee, Steel Grey, Smoke Purple, Light Grey, Twilight Purple, Misty Grey, Dark Purple, Gunmetal Grey, Elegant Purple, Dusk Grey"
      },
      {
        title: "Special Colors",
        image: "/images/products/ss250403zs/colors-special.jpg",
        colors: "Star Brown Green/Dusk Grey (Double-faced), Black/Dusk Grey (Double-faced), Rouge Red, Misty Almond/Cloud White (Double-faced)"
      }
    ]
  },
  {
    id: "2",
    slug: "zd2580a2cs",
    name: "Yak Hair Fabric",
    articleNumber: "ZD2580A2CS",
    category: "Yak",
    mainImage: "/images/products/zd2580a2cs/main.jpg",
    images: [
      { src: "/images/products/zd2580a2cs/main.jpg", alt: "Yak Hair Fabric - Main View" },
      { src: "/images/products/zd2580a2cs/texture.jpg", alt: "Yak Hair Fabric - Texture Detail" },
      { src: "/images/products/zd2580a2cs/colors-layered.jpg", alt: "Color Options - Layered View" },
      { src: "/images/products/zd2580a2cs/colors-swatch.jpg", alt: "Color Options - Swatch Card" },
      { src: "/images/products/zd2580a2cs/colors-stacked.jpg", alt: "Color Options - Stacked View" },
      { src: "/images/products/zd2580a2cs/colors-grid.jpg", alt: "Color Options - Grid View" },
      { src: "/images/products/zd2580a2cs/colors-detail.jpg", alt: "Color Options - Detail View" },
    ],
    specifications: [
      { label: "Article Number", value: "ZD2580A2CS" },
      { label: "Weight", value: "420 G/M" },
      { label: "Width", value: "150~155 cm" },
      { label: "Composition", value: "100% Yak Hair" },
    ],
    features: [
      {
        title: "Features",
        content: "It has far better warmth retention than ordinary wool while being lighter in weight. Its natural hollow fiber structure ensures excellent air permeability, preventing stuffiness when worn. The fibers are tough, wear-resistant and anti-pilling. It also has good moisture absorption, quickly absorbing and releasing moisture to keep the skin dry, and possesses natural antistatic properties, which are not easy to attract dust."
      },
      {
        title: "Texture",
        content: "It feels soft and smooth to the touch, with a delicate hand feel similar to cashmere, but is stiffer than cashmere and not easy to deform. It is skin-friendly and comfortable without any itchy feeling."
      },
      {
        title: "Appearance",
        content: "The surface shows a soft matte luster, which is low-key and high-grade. The fleece is full and fluffy with a fine and uniform texture."
      }
    ],
    colorCategories: [
      {
        title: "Neutral Tones",
        image: "/images/products/zd2580a2cs/colors-swatch.jpg",
        colors: "Natural Blue, Light Grey, Matcha Green, Charcoal, Natural Purple, Navy Blue, Maca Red, Black, Deep Maca"
      },
      {
        title: "Warm Tones",
        image: "/images/products/zd2580a2cs/colors-layered.jpg",
        colors: "Charcoal Grey, Chocolate Brown, Natural Beige"
      },
      {
        title: "Rich Colors",
        image: "/images/products/zd2580a2cs/colors-stacked.jpg",
        colors: "Burgundy Wine, Slate Blue, Camel Beige, Warm Brown"
      },
      {
        title: "Classic Collection",
        image: "/images/products/zd2580a2cs/colors-grid.jpg",
        colors: "Deep Burgundy, Cream White, Charcoal Grey, Coffee Brown"
      }
    ]
  },
  {
    id: "3",
    slug: "zd033510cl",
    name: "Single-faced Knitted Woolen Fabric",
    articleNumber: "ZD033510CL",
    category: "Wool Blend",
    mainImage: "/images/products/zd033510cl/main.jpg",
    images: [
      { src: "/images/products/zd033510cl/main.jpg", alt: "Single-faced Knitted Woolen Fabric - Main View" },
    ],
    specifications: [
      { label: "Article Number", value: "ZD033510CL" },
      { label: "Weight", value: "330 G/M" },
      { label: "Width", value: "150~155 cm" },
      { label: "Composition", value: "90% Wool, 5% Cashmere, 5% Silk" },
    ],
    features: [
      {
        title: "Style",
        content: "Long-messy pile texture with a natural and casual aesthetic. Boasts a natural and casual long & messy pile texture that creates unique visual interest."
      },
      {
        title: "Texture",
        content: "The well-proportioned texture looks elegant, combining the warmth of wool with the softness of cashmere and the subtle sheen of silk for a luxurious hand feel."
      },
      {
        title: "Application",
        content: "Ideal for high-end casual or luxury autumn and winter clothing. Perfect for coats, jackets, and statement pieces that require both warmth and sophisticated style."
      }
    ],
    colorCategories: [
      {
        title: "Available Colors",
        image: "/images/products/zd033510cl/main.jpg",
        colors: "1Z New Deep Carbon Ash"
      }
    ]
  },
  {
    id: "4",
    slug: "sd07021asxw",
    name: "Single-faced Woven Woolen Twill Fabric",
    articleNumber: "SD07021ASXW",
    category: "Wool Blend",
    mainImage: "/images/products/sd07021asxw/main.jpg",
    images: [
      { src: "/images/products/sd07021asxw/main.jpg", alt: "Woven Woolen Twill Fabric - Main View" },
      { src: "/images/products/sd07021asxw/detail.jpg", alt: "Woven Woolen Twill Fabric - Detail View" },
      { src: "/images/products/sd07021asxw/colors.jpg", alt: "Woven Woolen Twill Fabric - Color Options" },
    ],
    specifications: [
      { label: "Article Number", value: "SD07021ASXW" },
      { label: "Weight", value: "380 G/M" },
      { label: "Width", value: "148 ± 2 cm" },
      { label: "Composition", value: "90% Wool, 10% Cashmere" },
    ],
    features: [
      {
        title: "Pattern",
        content: "Clear and regular twill lines create a classic diagonal weave pattern that adds visual depth and sophistication to the fabric surface."
      },
      {
        title: "Surface Quality",
        content: "Clean and fine surface without obvious impurities. The premium wool and cashmere blend ensures a refined, high-quality appearance suitable for luxury garments."
      },
      {
        title: "Texture & Appearance",
        content: "Full and soft touch with a low-key and high-grade appearance. The twill texture enhances the layering and three-dimensional sense of the fabric, perfect for structured coats and tailored pieces."
      }
    ],
    colorCategories: [
      {
        title: "Available Colors",
        image: "/images/products/sd07021asxw/colors.jpg",
        colors: "1B3# Mixed Coffee Twill"
      }
    ]
  },
  {
    id: "5",
    slug: "sd02019601",
    name: "Single-faced Woven Woolen Fabric",
    articleNumber: "SD02019601",
    category: "Wool Blend",
    mainImage: "/images/products/sd02019601/main.jpg",
    images: [
      { src: "/images/products/sd02019601/main.jpg", alt: "Single-faced Woven Woolen Fabric - Main View" },
      { src: "/images/products/sd02019601/detail.jpg", alt: "Single-faced Woven Woolen Fabric - Detail View" },
    ],
    specifications: [
      { label: "Article Number", value: "SD02019601" },
      { label: "Weight", value: "630-650 G/M" },
      { label: "Width", value: "148 ± 2 cm" },
      { label: "Composition", value: "90% Wool, 10% Cashmere" },
    ],
    features: [
      {
        title: "Surface Quality",
        content: "Smooth and fine surface without obvious grain. The fabric exhibits a gentle and natural luster that speaks to its premium quality and craftsmanship."
      },
      {
        title: "Finish",
        content: "Clean fabric with soft and neat fleece finish. The meticulous finishing process ensures a refined appearance suitable for luxury garments."
      },
      {
        title: "Application",
        content: "Ideal for high-end autumn and winter coats, jackets, and tailored outerwear. The substantial weight provides excellent warmth while the premium blend ensures comfort and durability."
      }
    ],
    colorCategories: [
      {
        title: "Available Colors",
        image: "/images/products/sd02019601/main.jpg",
        colors: "1A Camel Color"
      }
    ]
  },
  {
    id: "6",
    slug: "ss250404",
    name: "Double-faced Wool Fabric",
    articleNumber: "SS250404",
    category: "Wool Blend",
    mainImage: "/images/products/ss250404/main.jpg",
    images: [
      { src: "/images/products/ss250404/main.jpg", alt: "Double-faced Wool Fabric - Main View" },
      { src: "/images/products/ss250404/colors.jpg", alt: "Double-faced Wool Fabric - Color Options" },
    ],
    specifications: [
      { label: "Article Number", value: "SS250404" },
      { label: "Weight", value: "860 G/M" },
      { label: "Width", value: "148 ± 2 cm" },
      { label: "Composition", value: "70% Wool, 10% Cashmere, 20% Tencel" },
    ],
    features: [
      {
        title: "Features",
        content: "It boasts excellent warmth retention paired with good air permeability. The addition of Tencel reduces the wrinkling tendency of pure wool fabrics, while enhancing drapability and antistatic properties. With moderate strength, it is more durable than pure cashmere fabrics and easier to maintain."
      },
      {
        title: "Texture",
        content: "It feels soft and smooth, featuring the delicate softness of cashmere and the crisp texture of wool. Tencel fibers bring a fresh skin-friendly touch without any roughness."
      },
      {
        title: "Appearance",
        content: "The fabric surface has a soft and natural luster without harsh glare. It has a flat and fine texture with good drapability. Garments made from it have a neat silhouette, combining casual and exquisite styles, making it ideal for high-quality autumn and winter clothing."
      }
    ],
    colorCategories: [
      {
        title: "Available Colors",
        image: "/images/products/ss250404/colors.jpg",
        colors: "Morning Sand White (Light), Dusk Grey, Cloud White (Light), Navy Blue, Warm Velvet Brown, Ink Black, Moxi Red, Black/Dusk Grey"
      }
    ]
  },
  {
    id: "7",
    slug: "sd248042cs",
    name: "Single-faced Woven Woolen Fabric with Long Straight Pile",
    articleNumber: "SD248042CS",
    category: "Alpaca Blend",
    mainImage: "/images/products/sd248042cs/main.jpg",
    images: [
      { src: "/images/products/sd248042cs/main.jpg", alt: "Long Straight Pile Woolen Fabric - Main View" },
      { src: "/images/products/sd248042cs/colors-swatch.jpg", alt: "Color Options - Swatch Card" },
      { src: "/images/products/sd248042cs/colors-display.jpg", alt: "Color Options - Display" },
      { src: "/images/products/sd248042cs/colors-layered.jpg", alt: "Color Options - Layered View" },
      { src: "/images/products/sd248042cs/texture.jpg", alt: "Fabric Texture Detail" },
    ],
    specifications: [
      { label: "Article Number", value: "SD248042CS" },
      { label: "Weight", value: "680 G/M" },
      { label: "Width", value: "148 ± 2 cm" },
      { label: "Composition", value: "52% Wool, 30% Alpaca, 18% Nylon" },
    ],
    features: [
      {
        title: "Features",
        content: "Soft skin-friendly touch, warm like wool plus fluffy alpaca feel, lightweight without oppression. Nylon blended for better pilling and wrinkle resistance, stiff shape retention, durable and easy care."
      },
      {
        title: "Texture",
        content: "The long straight pile creates a luxuriously soft and fluffy hand feel. The combination of wool warmth and alpaca's signature softness delivers exceptional comfort."
      },
      {
        title: "Appearance",
        content: "Features a distinctive long straight pile texture that adds visual depth and tactile interest. The fabric has an elegant, sophisticated look ideal for statement outerwear pieces."
      }
    ],
    colorCategories: [
      {
        title: "Available Colors",
        image: "/images/products/sd248042cs/colors-swatch.jpg",
        colors: "Natural White, Cherry Blossom Pink, Rose Red, Snowflake Purple, Golden Camel, Coffee, Dark Grey, Black"
      }
    ]
  },
  {
    id: "8",
    slug: "sdf8955n",
    name: "Single-faced Woven Woolen Fabric",
    articleNumber: "SDF8955N",
    category: "Wool Blend",
    mainImage: "/images/products/sdf8955n/main.jpg",
    images: [
      { src: "/images/products/sdf8955n/main.jpg", alt: "Single-faced Woven Woolen Fabric - Main View" },
      { src: "/images/products/sdf8955n/detail.jpg", alt: "Single-faced Woven Woolen Fabric - Detail View" },
      { src: "/images/products/sdf8955n/colors.jpg", alt: "Color Options - Swatches" },
      { src: "/images/products/sdf8955n/swatch.jpg", alt: "Color Options - Full Swatch Card" },
    ],
    specifications: [
      { label: "Article Number", value: "SDF8955N" },
      { label: "Weight", value: "330 G/M" },
      { label: "Width", value: "148 ± 2 cm" },
      { label: "Composition", value: "94% Wool, 5% Cashmere, 1% Other" },
    ],
    features: [
      {
        title: "Surface Quality",
        content: "Smooth and neat single-side surface with soft natural luster. No messy floating hair, delivering a smooth and regular overall finish."
      },
      {
        title: "Texture",
        content: "The premium wool and cashmere blend creates a refined, high-quality hand feel. Soft yet structured, ideal for tailored garments."
      },
      {
        title: "Application",
        content: "Perfect for sophisticated autumn and winter outerwear including coats, blazers, and tailored suits. The lightweight yet warm construction makes it versatile for various applications."
      }
    ],
    colorCategories: [
      {
        title: "Available Colors",
        image: "/images/products/sdf8955n/swatch.jpg",
        colors: "Nut Coffee, Niro Grey, Sea Cucumber Coffee, Nanmi Grey"
      }
    ]
  },
  {
    id: "9",
    slug: "ss250407lm",
    name: "Double-faced Wool Fabric",
    articleNumber: "SS250407LM",
    category: "Wool Blend",
    mainImage: "/images/products/ss250407lm/main.jpg",
    images: [
      { src: "/images/products/ss250407lm/main.jpg", alt: "Double-faced Wool Fabric - Main View" },
      { src: "/images/products/ss250407lm/colors-layered.jpg", alt: "Color Options - Layered View" },
      { src: "/images/products/ss250407lm/swatch.jpg", alt: "Color Options - Swatch Card" },
      { src: "/images/products/ss250407lm/colors-detail.jpg", alt: "Color Options - Detail View" },
      { src: "/images/products/ss250407lm/texture.jpg", alt: "Fabric Texture Detail" },
    ],
    specifications: [
      { label: "Article Number", value: "SS250407LM" },
      { label: "Weight", value: "750 G/M" },
      { label: "Width", value: "148 ± 2 cm" },
      { label: "Composition", value: "70% Wool, 10% Cashmere, 20% Tencel" },
    ],
    features: [
      {
        title: "Features",
        content: "It boasts excellent warmth retention paired with good air permeability. The addition of Tencel reduces the wrinkling tendency of pure wool fabrics, while enhancing drapability and antistatic properties. With moderate strength, it is more durable than pure cashmere fabrics and easier to maintain."
      },
      {
        title: "Texture",
        content: "It feels soft and smooth, featuring the delicate softness of cashmere and the crisp texture of wool. Tencel fibers bring a fresh skin-friendly touch without any roughness."
      },
      {
        title: "Appearance",
        content: "The fabric surface has a soft and natural luster without harsh glare. It has a flat and fine texture with good drapability. Garments made from it have a neat silhouette, combining casual and exquisite styles, making it ideal for high-quality autumn and winter clothing."
      }
    ],
    colorCategories: [
      {
        title: "Available Colors",
        image: "/images/products/ss250407lm/swatch.jpg",
        colors: "Star Brown Green, Dusk Grey, Deep Coffee, Ink Black, Elegant Purple"
      }
    ]
  },
  {
    id: "10",
    slug: "ss2356265bzs",
    name: "Yak Hair Fabric",
    articleNumber: "SS2356265BZS",
    category: "Yak",
    mainImage: "/images/products/ss2356265bzs/main.jpg",
    images: [
      { src: "/images/products/ss2356265bzs/main.jpg", alt: "Yak Hair Fabric - Main View" },
      { src: "/images/products/ss2356265bzs/texture.jpg", alt: "Yak Hair Fabric - Texture Detail" },
      { src: "/images/products/ss2356265bzs/detail.jpg", alt: "Yak Hair Fabric - Fiber Detail" },
    ],
    specifications: [
      { label: "Article Number", value: "SS2356265BZS" },
      { label: "Weight", value: "780-800 G/M" },
      { label: "Width", value: "148 ± 2 cm" },
      { label: "Composition", value: "100% Yak Hair" },
    ],
    features: [
      {
        title: "Features",
        content: "It has far better warmth retention than ordinary wool while being lighter in weight. Its natural hollow fiber structure ensures excellent air permeability, preventing stuffiness when worn. The fibers are tough, wear-resistant and anti-pilling. It also has good moisture absorption, quickly absorbing and releasing moisture to keep the skin dry, and possesses natural antistatic properties, which are not easy to attract dust."
      },
      {
        title: "Texture",
        content: "It feels soft and smooth to the touch, with a delicate hand feel similar to cashmere, but is stiffer than cashmere and not easy to deform. It is skin-friendly and comfortable without any itchy feeling."
      },
      {
        title: "Appearance",
        content: "The surface shows a soft matte luster, which is low-key and high-grade. The fleece is full and fluffy with a fine and uniform texture."
      }
    ],
    colorCategories: [
      {
        title: "Available Colors",
        image: "/images/products/ss2356265bzs/main.jpg",
        colors: "1C3# Coffee Color"
      }
    ]
  },
  {
    id: "11",
    slug: "ss238016cs",
    name: "Double-faced Wool Fabric",
    articleNumber: "SS238016CS",
    category: "Alpaca Blend",
    mainImage: "/images/products/ss238016cs/main-new.jpg",
    images: [
      { src: "/images/products/ss238016cs/main-new.jpg", alt: "Double-faced Wool Fabric - Main View" },
      { src: "/images/products/ss238016cs/detail-1.jpg", alt: "Double-faced Wool Fabric - Texture Detail" },
      { src: "/images/products/ss238016cs/detail-2.jpg", alt: "Double-faced Wool Fabric - Color Variants" },
      { src: "/images/products/ss238016cs/colors.jpg", alt: "Double-faced Wool Fabric - Color Card" },
      { src: "/images/products/ss238016cs/swatches.jpg", alt: "Double-faced Wool Fabric - Fabric Swatches" },
    ],
    specifications: [
      { label: "Article Number", value: "SS238016CS" },
      { label: "Color", value: "1D White" },
      { label: "Weight", value: "820 G/M" },
      { label: "Width", value: "148 \u00B1 2 cm" },
      { label: "Composition", value: "67% Wool, 15% Suri Alpaca, 18% Nylon" },
    ],
    features: [
      {
        title: "Features",
        content: "This fabric has a soft, plush texture with a subtle, elegant sheen. It offers excellent warmth retention, good drapability, and enhanced durability and wrinkle resistance from the nylon component."
      },
      {
        title: "Texture",
        content: "The suri alpaca fibers add a luxurious, silky feel, creating a uniquely smooth hand feel that combines the warmth of wool with the refined softness of alpaca."
      },
      {
        title: "Appearance",
        content: "Making it ideal for high-end winter garments like coats and tailored pieces. The fabric surface has a beautiful, natural luster with a refined double-faced construction."
      }
    ],
    colorCategories: [
      {
        title: "Color Card",
        image: "/images/products/ss238016cs/colors.jpg",
        colors: "White, Cream, Grey, Charcoal, Wine Red, Black, Brown, Camel"
      },
      {
        title: "Fabric Swatches",
        image: "/images/products/ss238016cs/swatches.jpg",
        colors: "White, Camel Brown, Purple, Grey Beige"
      }
    ]
  },
  {
    id: "12",
    slug: "ss02023592cs",
    name: "Double-faced Wool Fabric",
    articleNumber: "SS02023592CS",
    category: "Wool Blend",
    mainImage: "/images/products/ss02023592cs/main-new.jpg",
    images: [
      { src: "/images/products/ss02023592cs/main-new.jpg", alt: "Double-faced Wool Fabric - Main View" },
      { src: "/images/products/ss02023592cs/detail-1.jpg", alt: "Double-faced Wool Fabric - Double Side View" },
      { src: "/images/products/ss02023592cs/detail-2.jpg", alt: "Double-faced Wool Fabric - Texture Detail" },
      { src: "/images/products/ss02023592cs/colors.jpg", alt: "Double-faced Wool Fabric - Color Card" },
    ],
    specifications: [
      { label: "Article Number", value: "SS02023592CS" },
      { label: "Color", value: "1AG5456# Dark Black Grey D" },
      { label: "Weight", value: "830-850 G/M" },
      { label: "Width", value: "148 \u00B1 2 cm" },
      { label: "Composition", value: "92% Wool, 8% Camel Hair" },
    ],
    features: [
      {
        title: "Features",
        content: "This fabric delivers exceptional warmth and a luxuriously soft feel, combining the natural insulation of wool with the silky smoothness of camel hair. It has a dense, plush texture that retains heat effectively, while the wool base ensures good shape retention and breathability."
      },
      {
        title: "Texture",
        content: "The camel hair adds a subtle, elegant luster and enhances the fabric's overall softness, creating a supremely comfortable hand feel with natural warmth."
      },
      {
        title: "Appearance",
        content: "Making it perfect for high-quality winter coats and cold-weather garments. The dense, plush surface has a refined double-faced construction with elegant dark charcoal grey coloring."
      }
    ],
    colorCategories: [
      {
        title: "Full Color Range",
        image: "/images/products/ss02023592cs/colors.jpg",
        colors: "Pink, Rose, Beige, Camel, Brown, Chocolate, Coffee, Light Blue, Sky Blue, Grey, Charcoal, Black, Wine Red, Burgundy, Navy, Light Green, Olive"
      }
    ]
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getAllProducts(): Product[] {
  return products;
}
