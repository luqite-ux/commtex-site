import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seedDatabase() {
  try {
    console.log('Starting data migration...')

    // Insert news articles
    console.log('Inserting news articles...')
    const { error: newsError } = await supabase.from('news').insert([
      {
        slug: '2026-cashmere-color-trends',
        title: 'Tactile Blank Space & Emotional Spectrum: An In-Depth Analysis of 2026 Cashmere Industry Color Trends',
        excerpt: 'After Pantone named Cloud Dancer as the 2026 Color of the Year, the global fashion scene has embraced a shift toward quiet, texture-driven elegance.',
        content: newsData[0].content,
        cover_image: '/images/news/2026-cashmere-trends/cover.jpg',
        published_at: '2026-03-01'
      },
      {
        slug: '2025-annual-celebration',
        title: 'A Night to Remember: Commtex Teams Gather for 2025 Annual Festivities',
        excerpt: 'At Commtex, we believe that our strength lies in the vibrant, dedicated team behind our success.',
        content: newsData[1].content,
        cover_image: '/images/news/2025-annual/05-big-family.jpg',
        published_at: '2025-01-15'
      }
    ])

    if (newsError) {
      console.error('Error inserting news:', newsError)
    } else {
      console.log('✓ News articles inserted successfully')
    }

    // Insert products
    console.log('Inserting products...')
    for (const product of productsData) {
      const { error } = await supabase.from('products').insert([{
        id: product.slug,
        name: product.name,
        article_number: product.article_number,
        category: product.category,
        main_image: product.main_image,
        specifications: product.specifications,
        features: product.features,
        color_categories: product.color_categories,
        created_at: new Date().toISOString()
      }])

      if (error) {
        console.error(`Error inserting product ${product.slug}:`, error)
      } else {
        console.log(`✓ Inserted: ${product.name}`)
      }
    }

    console.log('✓ Data migration completed successfully!')
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
}
  {
    slug: "2026-cashmere-color-trends",
    title: "Tactile Blank Space & Emotional Spectrum: An In-Depth Analysis of 2026 Cashmere Industry Color Trends",
    excerpt: "After Pantone named Cloud Dancer as the 2026 Color of the Year, the global fashion scene has embraced a shift toward quiet, texture-driven elegance—and no material embodies this movement better than cashmere.",
    content: `After Pantone Color Institute named Cloud Dancer as the 2026 Color of the Year, the global fashion scene has embraced a collective shift toward quiet, texture-driven elegance—and no material embodies this movement better than cashmere, the coveted "soft gold" of luxury fibers. As a premium natural fiber, cashmere measures just one-sixth the diameter of a human hair, with a built-in soft luminosity that strips away the harsh industrial edge of ordinary white, restoring a skin-like warmth that makes this year's signature white a perfect match for cashmere.

But the 2026 color story for cashmere is far from a one-note show centered on a single shade of white. From the fall-winter trends released by leading authority APLF to the runway presentations of top luxury brands like Loro Piana, one core shift stands out: cashmere colors are moving beyond mere visual eye-grabbing to speak deeply to emotional comfort, mental refuge, and a return to nature. Below, we break down the three core color trends shaping the 2026 cashmere industry, combining global fashion insights and on-the-ground industry practice to help industry players nail their product development direction.

## 1. The Year's Defining Tone: Decoding Authentic Cashmere Hues Through Cloud Dancer

To fully grasp the 2026 cashmere color trends, you first have to understand the soul of this signature white.

Cloud Dancer is not the bleached, cold white found in mass-market fabrics. It's a warm, sun-kissed soft white—true to the natural tone of raw cashmere sun-dried in the highland breeze. For this premium white to shine on cashmere, only top-tier raw materials will do: fine white cashmere with a diameter of 15.5 microns or less can deliver a silk-like halo, whether used in its raw white state or lightly dyed, rather than a flat, lifeless chalk white.

This white wave reflects a seismic shift in consumer tastes. After years of information overload and visual fatigue, shoppers are craving "breathing room" and "blank space" in their wardrobes. White is no longer an afterthought or a background shade; it takes center stage on cashmere pieces, symbolizing renewal, clarity, and inner peace.

What's more, this signature white never stands alone on the 2026 fall-winter runways. Anchored by the year's key hue, cashmere color palettes lean fully into "raw, unfiltered authenticity". Take Loro Piana's 2026-2027 Fall-Winter collection, *Nomadic Daydream*, which draws color inspiration straight from oil paintings and natural landscapes: soft apricot, ash gray, and deep chestnut serve as calm foundations, while ochre and terracotta add free-spirited depth. This earth-grown color logic forms the complete 2026 cashmere color spectrum.

![image](0)

## 2. 2026 Core Cashmere Color Families: Striking the Balance Between Emotion and Texture

Drawing on feedback from the Intertextile Home Textiles Fair, APLF fashion trend forecasts, and Milan designer previews, the 2026 cashmere color trends fall into three core categories. Each aligns perfectly with cashmere's inherent properties, boasts strong practicality for production, and serves as a critical guide for product development.

### 2.1 Healing & Refuge Hues: Misty Mineral Tones to Amplify Cashmere's Soothing Effect

This palette is an extension of Cloud Dancer and the leading color direction for 2026 cashmere, encompassing mist gray, tundra green, midnight blue, and terracotta. All these shades carry a soft gray undertone, as if draped in a fine cashmere veil, with a hazy, muted finish.

APLF dubs this palette "Resonance of Soft Light Perception"—in short, colors that are gentle, understated, and act as a soft landing for the mind. For cashmere design, this palette is incredibly versatile: midnight blue on woolen cashmere replaces the heaviness of solid black, offering depth without feeling oppressive; terracotta and ochre tap into the rustic, retro charm of the "quiet refuge" trend, creating effortless high-end layers when styled in tonal matches. Best of all, cashmere's plush, buttery texture amplifies the calming power of these hues to the fullest.

![image](1)

### 2.2 Natural Raw Hues: Undyed Luxury, Returning to Cashmere's True Value

As sustainable fashion takes hold, cashmere color palettes are embracing minimalism. Undyed natural shades—raw cashmere white, sand, and light camel—have secured a major spot in 2026 trends. This is no empty eco-friendly gimmick; it's the industry's re-recognition of cashmere's innate fiber beauty.

The market data speaks for itself: 62% of consumers are willing to buy certified sustainable cashmere products, and undyed natural tones are a visible, tangible mark of ethical integrity. This trend is pushing the cashmere supply chain to evolve: farms must implement meticulous sorting to ensure uniform, pure raw fiber color; designers can no longer rely on bold dyes to stand out, instead using stitch variations—like chunky knits, ribbing, and reverse stockinette—to create light-and-shadow texture within a single tone, keeping "natural cashmere" refined, not plain. This marks a critical shift: cashmere's value is no longer judged by how vibrant the dye is, but by how exceptional the fiber itself is.

![image](2)

### 2.3 Energy Accent Hues: Restrained Bold Shades That Preserve Cashmere's Luxury

While calm healing defines 2026 cashmere trends, fashion still needs small moments of surprise. Bright shades—vibrant orange-yellow, coral red, sapphire blue, and metallic copper—enter the mix as subtle supporting accents.

Unlike the bold, all-over color blocking of the past, bright hues are used with extreme restraint on cashmere this year, focusing on **micro color blocking** and **hidden lining accents**: think pops of color inside a cashmere sweater's neckline, along pocket edges, or as tiny details in jacquard patterns, never overshadowing cashmere's soft, luxurious texture. Some designers pair cashmere with subtle embellishments like crystals or feather accents to mimic the glint of melting ice, adding personality for younger shoppers without compromising cashmere's refined appeal—brightening without overwhelming.

![image](3)

## 3. The Industry Logic Behind the Trends: Color as a Core Strategic Pillar for Cashmere

The 2026 cashmere color trends are not a last-minute design choice—they are a core strategy woven through the entire supply chain, from raw materials and spinning to weaving and marketing, setting new standards for the entire cashmere industry.

First, value restructuring at the raw material stage. The rise of Cloud Dancer and natural hues has boosted the market standing of premium white raw cashmere: eco-certified white cashmere raw materials now see an average 12% export premium, and fibers with consistent fineness and pure color hold far greater pricing power. In contrast, ordinary dark cashmere that lacks a warm, rich texture and feels flat risks being phased out by the market.

Second, technological innovation in production. Premium cashmere color relies on expert craftsmanship: to achieve the soft mist finish on light-toned cashmere, eco-friendly techniques like waterless dyeing and plant dyeing (madder root, persimmon) are moving from concept to mass production. For deep shades like forest green and midnight blue, spinning mills must create layered depth (not flat dullness) using blended yarns and chenille fabrics—a key competitive advantage for manufacturers.

Third, a mindset shift in design. One rule defines cashmere design today: color exists to serve texture. Cashmere's signature softness and plushness are the star; color is a complement, not the main event. Designers need a synesthetic eye, anticipating how a shade of ochre will catch the light on a 2/28nm double weave, or how milling will enhance its warmth. Merging color seamlessly with cashmere's fiber and structure is the true key to riding the trends.

## Conclusion

The 2026 cashmere color trends represent a fundamental shift from "eye-catching aesthetics" to "self-centric comfort". From the serene power of Cloud Dancer to the nurturing warmth of mineral tones and the restrained pop of accent hues, color is no longer an isolated visual element—it is a bridge connecting emotion, cashmere texture, and a sustainable future.

For the Chinese cashmere industry, this moment is both a challenge and an opportunity: moving beyond the rough, resource-heavy export model to refine the color and texture of every single fiber is the path to global competitiveness. When cashmere's buttery softness meets emotionally resonant hues, it creates more than just next-season bestsellers—it fulfills the modern consumer's longing for warmth, calm, and a life well-lived.`,
    date: "March 2026",
    cover_image: "/images/news/2026-cashmere-trends/cover.jpg",
    images: [
      { src: "/images/news/2026-cashmere-trends/cloud-dancer-white.jpg", alt: "Cloud Dancer white cashmere fabric", caption: "Cloud Dancer: The warm, sun-kissed soft white defining 2026" },
      { src: "/images/news/2026-cashmere-trends/mineral-tones.jpg", alt: "Mineral tone cashmere samples", caption: "Healing & Refuge Hues: Misty mineral tones for emotional comfort" },
      { src: "/images/news/2026-cashmere-trends/natural-raw-hues.jpg", alt: "Natural undyed cashmere fibers", caption: "Natural Raw Hues: Undyed luxury embracing sustainability" },
      { src: "/images/news/2026-cashmere-trends/accent-colors.jpg", alt: "Cashmere with accent colors", caption: "Energy Accent Hues: Restrained bold shades as subtle accents" },
      { src: "/images/news/2026-cashmere-trends/cover.jpg", alt: "2026 Cashmere color trend overview", caption: "The complete 2026 cashmere color spectrum" }
    ]
  },
  {
    slug: "2025-annual-celebration",
    title: "A Night to Remember: Commtex Teams Gather for 2025 Annual Festivities",
    excerpt: "At Commtex, we believe that our strength lies not only in the innovative products we create but also in the vibrant, dedicated team behind them.",
    content: `At Commtex, we believe that our strength lies not only in the innovative products we create but also in the vibrant, dedicated team behind them. As we close another remarkable year, we're thrilled to share a glimpse of our recent Annual Celebration—a night dedicated to honoring our collective achievements, fostering camaraderie, and strengthening the bonds that make our work meaningful.`,
    date: "January 2025",
    cover_image: "/images/news/2025-annual/05-big-family.jpg",
    images: [
      { src: "/images/news/2025-annual/01-show-time.jpg", alt: "Team performance on stage", caption: "Show Time" },
      { src: "/images/news/2025-annual/02-fabrics-display.jpg", alt: "Display corner with clothes made from our fabrics", caption: "A corner with clothes made by our fabrics" },
      { src: "/images/news/2025-annual/03-happy-show.jpg", alt: "Team members performing a fun show", caption: "A happy show" },
      { src: "/images/news/2025-annual/04-awarding-honor.jpg", alt: "Award ceremony moment", caption: "The moment of awarding honor" },
      { src: "/images/news/2025-annual/05-big-family.jpg", alt: "Commtex team group photo", caption: "Our big FAMILY" },
      { src: "/images/news/2025-annual/06-trophies.jpg", alt: "Crystal trophies for outstanding staff members", caption: "Trophies for the outstanding staff" },
      { src: "/images/news/2025-annual/07-annual-report.jpg", alt: "Team member presenting the annual report", caption: "Annual report" },
      { src: "/images/news/2025-annual/08-caishen.jpg", alt: "Caishen - God of Fortune bringing prosperity", caption: "Caishen, an auspicious symbol of prosperity and fortune in Chinese culture" },
      { src: "/images/news/2025-annual/09-backdrop.jpg", alt: "Festive red New Year backdrop with gifts", caption: "Gifts & New Year background wall" },
      { src: "/images/news/2025-annual/10-little-angel.jpg", alt: "A little girl surrounded by gift boxes", caption: "A little cutie angel" },
      { src: "/images/news/2025-annual/11-new-year-wish.jpg", alt: "New Year wish card on dining table", caption: "New Year's wish" }
    ]
  }
]

const productsData = [
  {
    slug: "ss250403zs", name: "Double-faced Wool Fabric", article_number: "SS250403ZS", category: "Wool Blend",
    main_image: "/images/products/ss250403zs/main.jpg",
    images: [
      { src: "/images/products/ss250403zs/main.jpg", alt: "Double-faced Wool Fabric - Main View" },
      { src: "/images/products/ss250403zs/detail.jpg", alt: "Double-faced Wool Fabric - Detail View" },
      { src: "/images/products/ss250403zs/colors-light.jpg", alt: "Color Options - Light Tones" },
      { src: "/images/products/ss250403zs/colors-dark.jpg", alt: "Color Options - Dark Tones" },
      { src: "/images/products/ss250403zs/colors-purple.jpg", alt: "Color Options - Purple & Grey Tones" },
      { src: "/images/products/ss250403zs/colors-special.jpg", alt: "Color Options - Special Colors" },
      { src: "/images/products/ss250403zs/colors-1.jpg", alt: "Color Swatches - Solid Colors" },
      { src: "/images/products/ss250403zs/colors-2.jpg", alt: "Color Swatches - Dark & Grey Tones" },
      { src: "/images/products/ss250403zs/colors-3.jpg", alt: "Color Swatches - Double-faced Options" },
    ],
    specifications: [
      { label: "Article Number", value: "SS250403ZS" }, { label: "Weight", value: "860 G/M" },
      { label: "Width", value: "148 ± 2 cm" }, { label: "Composition", value: "70% Wool, 10% Cashmere, 20% Tencel" }
    ],
    features: [
      { title: "Features", content: "It boasts excellent warmth retention paired with good air permeability. The addition of Tencel reduces the wrinkling tendency of pure wool fabrics, while enhancing drapability and antistatic properties. With moderate strength, it is more durable than pure cashmere fabrics and easier to maintain." },
      { title: "Texture", content: "It feels soft and smooth, featuring the delicate softness of cashmere and the crisp texture of wool. Tencel fibers bring a fresh skin-friendly touch without any roughness." },
      { title: "Appearance", content: "The fabric surface has a soft and natural luster without harsh glare. It has a flat and fine texture with good drapability. Garments made from it have a neat silhouette, combining casual and exquisite styles, making it ideal for high-quality autumn and winter clothing." }
    ],
    color_categories: [
      { title: "Light Tones", image: "/images/products/ss250403zs/colors-light.jpg", colors: "Off White, Cloud White, Grey White, Morning Sand White, Misty Almond, Honey Camel, Light Blue, Light Orchid Blue, Oat Green, Olive Grey, Dusty Rose" },
      { title: "Dark Tones", image: "/images/products/ss250403zs/colors-dark.jpg", colors: "Star Brown Green, Warm Velvet Brown, Deep Ink Black, Navy Blue, Black Navy, Origin Black, Double-faced options available" },
      { title: "Purple & Grey Tones", image: "/images/products/ss250403zs/colors-purple.jpg", colors: "Deep Coffee, Steel Grey, Smoke Purple, Light Grey, Twilight Purple, Misty Grey, Dark Purple, Gunmetal Grey, Elegant Purple, Dusk Grey" },
      { title: "Special Colors", image: "/images/products/ss250403zs/colors-special.jpg", colors: "Star Brown Green/Dusk Grey (Double-faced), Black/Dusk Grey (Double-faced), Rouge Red, Misty Almond/Cloud White (Double-faced)" },
      { title: "Solid Colors", image: "/images/products/ss250403zs/colors-1.jpg", colors: "Light Beige, Warm Brown, Cloud White (Light), Star Brown Green, Light Coffee, Rouge Red, Morning Sand White (Light), Twilight Purple, Honey Camel, Elegant Purple" },
      { title: "Dark & Grey Tones", image: "/images/products/ss250403zs/colors-2.jpg", colors: "Deep Coffee, Deep Purple, Light Grey (Light), Navy Blue, Gunmetal Grey, Black Navy, Iron Grey, Origin Black, Dusk Grey, Black/Dusk Grey (Double-faced)" },
      { title: "Double-faced Options", image: "/images/products/ss250403zs/colors-3.jpg", colors: "Warm Velvet Brown/Almond, Dusk Grey/Cloud White (Light), Brown Coffee/Camel, Star Brown Green/Dusk Grey, Warm Velvet Brown/Cloud White (Light)" }
    ]
  },
  {
    slug: "zd2580a2cs", name: "Yak Hair Fabric", article_number: "ZD2580A2CS", category: "Yak",
    main_image: "/images/products/zd2580a2cs/main.jpg",
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
      { label: "Article Number", value: "ZD2580A2CS" }, { label: "Weight", value: "420 G/M" },
      { label: "Width", value: "150~155 cm" }, { label: "Composition", value: "100% Yak Hair" }
    ],
    features: [
      { title: "Features", content: "It has far better warmth retention than ordinary wool while being lighter in weight. Its natural hollow fiber structure ensures excellent air permeability, preventing stuffiness when worn." },
      { title: "Texture", content: "It feels soft and smooth to the touch, with a delicate hand feel similar to cashmere, but is stiffer than cashmere and not easy to deform." },
      { title: "Appearance", content: "The surface shows a soft matte luster, which is low-key and high-grade. The fleece is full and fluffy with a fine and uniform texture." }
    ],
    color_categories: [
      { title: "Neutral Tones", image: "/images/products/zd2580a2cs/colors-swatch.jpg", colors: "Natural Blue, Light Grey, Matcha Green, Charcoal, Natural Purple, Navy Blue, Maca Red, Black, Deep Maca" },
      { title: "Warm Tones", image: "/images/products/zd2580a2cs/colors-layered.jpg", colors: "Charcoal Grey, Chocolate Brown, Natural Beige" },
      { title: "Rich Colors", image: "/images/products/zd2580a2cs/colors-stacked.jpg", colors: "Burgundy Wine, Slate Blue, Camel Beige, Warm Brown" },
      { title: "Classic Collection", image: "/images/products/zd2580a2cs/colors-grid.jpg", colors: "Deep Burgundy, Cream White, Charcoal Grey, Coffee Brown" }
    ]
  },
  {
    slug: "zd033510cl", name: "Single-faced Knitted Woolen Fabric", article_number: "ZD033510CL", category: "Wool Blend",
    main_image: "/images/products/zd033510cl/main.jpg",
    images: [{ src: "/images/products/zd033510cl/main.jpg", alt: "Single-faced Knitted Woolen Fabric - Main View" }],
    specifications: [
      { label: "Article Number", value: "ZD033510CL" }, { label: "Weight", value: "330 G/M" },
      { label: "Width", value: "150~155 cm" }, { label: "Composition", value: "90% Wool, 5% Cashmere, 5% Silk" }
    ],
    features: [
      { title: "Style", content: "Long-messy pile texture with a natural and casual aesthetic." },
      { title: "Texture", content: "The well-proportioned texture looks elegant, combining the warmth of wool with the softness of cashmere and the subtle sheen of silk." },
      { title: "Application", content: "Ideal for high-end casual or luxury autumn and winter clothing." }
    ],
    color_categories: [{ title: "Available Colors", image: "/images/products/zd033510cl/main.jpg", colors: "1Z New Deep Carbon Ash" }]
  },
  {
    slug: "sd07021asxw", name: "Single-faced Woven Woolen Twill Fabric", article_number: "SD07021ASXW", category: "Wool Blend",
    main_image: "/images/products/sd07021asxw/main.jpg",
    images: [
      { src: "/images/products/sd07021asxw/main.jpg", alt: "Woven Woolen Twill Fabric - Main View" },
      { src: "/images/products/sd07021asxw/detail.jpg", alt: "Woven Woolen Twill Fabric - Detail View" },
      { src: "/images/products/sd07021asxw/colors.jpg", alt: "Woven Woolen Twill Fabric - Color Options" },
    ],
    specifications: [
      { label: "Article Number", value: "SD07021ASXW" }, { label: "Weight", value: "380 G/M" },
      { label: "Width", value: "148 ± 2 cm" }, { label: "Composition", value: "90% Wool, 10% Cashmere" }
    ],
    features: [
      { title: "Pattern", content: "Clear and regular twill lines create a classic diagonal weave pattern." },
      { title: "Surface Quality", content: "Clean and fine surface without obvious impurities." },
      { title: "Texture & Appearance", content: "Full and soft touch with a low-key and high-grade appearance." }
    ],
    color_categories: [{ title: "Available Colors", image: "/images/products/sd07021asxw/colors.jpg", colors: "1B3# Mixed Coffee Twill" }]
  },
  {
    slug: "sd02019601", name: "Single-faced Woven Woolen Fabric", article_number: "SD02019601", category: "Wool Blend",
    main_image: "/images/products/sd02019601/main.jpg",
    images: [
      { src: "/images/products/sd02019601/main.jpg", alt: "Single-faced Woven Woolen Fabric - Main View" },
      { src: "/images/products/sd02019601/detail.jpg", alt: "Single-faced Woven Woolen Fabric - Detail View" },
    ],
    specifications: [
      { label: "Article Number", value: "SD02019601" }, { label: "Weight", value: "630-650 G/M" },
      { label: "Width", value: "148 ± 2 cm" }, { label: "Composition", value: "90% Wool, 10% Cashmere" }
    ],
    features: [
      { title: "Surface Quality", content: "Smooth and fine surface without obvious grain." },
      { title: "Finish", content: "Clean fabric with soft and neat fleece finish." },
      { title: "Application", content: "Ideal for high-end autumn and winter coats, jackets, and tailored outerwear." }
    ],
    color_categories: [{ title: "Available Colors", image: "/images/products/sd02019601/main.jpg", colors: "1A Camel Color" }]
  },
  {
    slug: "ss250404", name: "Double-faced Wool Fabric", article_number: "SS250404", category: "Wool Blend",
    main_image: "/images/products/ss250404/main.jpg",
    images: [
      { src: "/images/products/ss250404/main.jpg", alt: "Double-faced Wool Fabric - Main View" },
      { src: "/images/products/ss250404/colors.jpg", alt: "Double-faced Wool Fabric - Color Options" },
    ],
    specifications: [
      { label: "Article Number", value: "SS250404" }, { label: "Weight", value: "860 G/M" },
      { label: "Width", value: "148 ± 2 cm" }, { label: "Composition", value: "70% Wool, 10% Cashmere, 20% Tencel" }
    ],
    features: [
      { title: "Features", content: "Excellent warmth retention paired with good air permeability." },
      { title: "Texture", content: "Soft and smooth, featuring the delicate softness of cashmere and the crisp texture of wool." },
      { title: "Appearance", content: "Soft and natural luster without harsh glare with flat and fine texture." }
    ],
    color_categories: [{ title: "Available Colors", image: "/images/products/ss250404/colors.jpg", colors: "Morning Sand White (Light), Dusk Grey, Cloud White (Light), Navy Blue, Warm Velvet Brown, Ink Black, Moxi Red, Black/Dusk Grey" }]
  },
  {
    slug: "sd248042cs", name: "Single-faced Woven Woolen Fabric with Long Straight Pile", article_number: "SD248042CS", category: "Alpaca Blend",
    main_image: "/images/products/sd248042cs/main.jpg",
    images: [
      { src: "/images/products/sd248042cs/main.jpg", alt: "Long Straight Pile Woolen Fabric - Main View" },
      { src: "/images/products/sd248042cs/colors-swatch.jpg", alt: "Color Options - Swatch Card" },
      { src: "/images/products/sd248042cs/colors-display.jpg", alt: "Color Options - Display" },
      { src: "/images/products/sd248042cs/colors-layered.jpg", alt: "Color Options - Layered View" },
      { src: "/images/products/sd248042cs/texture.jpg", alt: "Fabric Texture Detail" },
    ],
    specifications: [
      { label: "Article Number", value: "SD248042CS" }, { label: "Weight", value: "680 G/M" },
      { label: "Width", value: "148 ± 2 cm" }, { label: "Composition", value: "52% Wool, 30% Alpaca, 18% Nylon" }
    ],
    features: [
      { title: "Features", content: "Soft skin-friendly touch, warm like wool plus fluffy alpaca feel, lightweight without oppression." },
      { title: "Texture", content: "The long straight pile creates a luxuriously soft and fluffy hand feel." },
      { title: "Appearance", content: "Features a distinctive long straight pile texture that adds visual depth." }
    ],
    color_categories: [{ title: "Available Colors", image: "/images/products/sd248042cs/colors-swatch.jpg", colors: "Natural White, Cherry Blossom Pink, Rose Red, Snowflake Purple, Golden Camel, Coffee, Dark Grey, Black" }]
  },
  {
    slug: "sdf8955n", name: "Single-faced Woven Woolen Fabric", article_number: "SDF8955N", category: "Wool Blend",
    main_image: "/images/products/sdf8955n/main.jpg",
    images: [
      { src: "/images/products/sdf8955n/main.jpg", alt: "Single-faced Woven Woolen Fabric - Main View" },
      { src: "/images/products/sdf8955n/detail.jpg", alt: "Single-faced Woven Woolen Fabric - Detail View" },
      { src: "/images/products/sdf8955n/colors.jpg", alt: "Color Options - Swatches" },
      { src: "/images/products/sdf8955n/swatch.jpg", alt: "Color Options - Full Swatch Card" },
    ],
    specifications: [
      { label: "Article Number", value: "SDF8955N" }, { label: "Weight", value: "330 G/M" },
      { label: "Width", value: "148 ± 2 cm" }, { label: "Composition", value: "94% Wool, 5% Cashmere, 1% Other" }
    ],
    features: [
      { title: "Surface Quality", content: "Smooth and neat single-side surface with soft natural luster." },
      { title: "Texture", content: "The premium wool and cashmere blend creates a refined, high-quality hand feel." },
      { title: "Application", content: "Perfect for sophisticated autumn and winter outerwear." }
    ],
    color_categories: [{ title: "Available Colors", image: "/images/products/sdf8955n/swatch.jpg", colors: "Nut Coffee, Niro Grey, Sea Cucumber Coffee, Nanmi Grey" }]
  },
  {
    slug: "ss250407lm", name: "Double-faced Wool Fabric", article_number: "SS250407LM", category: "Wool Blend",
    main_image: "/images/products/ss250407lm/main.jpg",
    images: [
      { src: "/images/products/ss250407lm/main.jpg", alt: "Double-faced Wool Fabric - Main View" },
      { src: "/images/products/ss250407lm/colors-layered.jpg", alt: "Color Options - Layered View" },
      { src: "/images/products/ss250407lm/swatch.jpg", alt: "Color Options - Swatch Card" },
      { src: "/images/products/ss250407lm/colors-detail.jpg", alt: "Color Options - Detail View" },
      { src: "/images/products/ss250407lm/texture.jpg", alt: "Fabric Texture Detail" },
    ],
    specifications: [
      { label: "Article Number", value: "SS250407LM" }, { label: "Weight", value: "750 G/M" },
      { label: "Width", value: "148 ± 2 cm" }, { label: "Composition", value: "70% Wool, 10% Cashmere, 20% Tencel" }
    ],
    features: [
      { title: "Features", content: "Excellent warmth retention paired with good air permeability." },
      { title: "Texture", content: "Soft and smooth, featuring the delicate softness of cashmere and crisp texture of wool." },
      { title: "Appearance", content: "Soft and natural luster. Flat and fine texture with good drapability." }
    ],
    color_categories: [{ title: "Available Colors", image: "/images/products/ss250407lm/swatch.jpg", colors: "Star Brown Green, Dusk Grey, Deep Coffee, Ink Black, Elegant Purple" }]
  },
  {
    slug: "ss2356265bzs", name: "Yak Hair Fabric", article_number: "SS2356265BZS", category: "Yak",
    main_image: "/images/products/ss2356265bzs/main.jpg",
    images: [
      { src: "/images/products/ss2356265bzs/main.jpg", alt: "Yak Hair Fabric - Main View" },
      { src: "/images/products/ss2356265bzs/texture.jpg", alt: "Yak Hair Fabric - Texture Detail" },
      { src: "/images/products/ss2356265bzs/detail.jpg", alt: "Yak Hair Fabric - Fiber Detail" },
    ],
    specifications: [
      { label: "Article Number", value: "SS2356265BZS" }, { label: "Weight", value: "780-800 G/M" },
      { label: "Width", value: "148 ± 2 cm" }, { label: "Composition", value: "100% Yak Hair" }
    ],
    features: [
      { title: "Features", content: "Far better warmth retention than ordinary wool while being lighter in weight." },
      { title: "Texture", content: "Soft and smooth to the touch, with a delicate hand feel similar to cashmere." },
      { title: "Appearance", content: "The surface shows a soft matte luster, which is low-key and high-grade." }
    ],
    color_categories: [{ title: "Available Colors", image: "/images/products/ss2356265bzs/main.jpg", colors: "1C3# Coffee Color" }]
  },
  {
    slug: "ss238016cs", name: "Double-faced Wool Fabric", article_number: "SS238016CS", category: "Alpaca Blend",
    main_image: "/images/products/ss238016cs/main-new.jpg",
    images: [
      { src: "/images/products/ss238016cs/main-new.jpg", alt: "Double-faced Wool Fabric - Main View" },
      { src: "/images/products/ss238016cs/detail-1.jpg", alt: "Double-faced Wool Fabric - Texture Detail" },
      { src: "/images/products/ss238016cs/detail-2.jpg", alt: "Double-faced Wool Fabric - Color Variants" },
      { src: "/images/products/ss238016cs/colors.jpg", alt: "Double-faced Wool Fabric - Color Card" },
      { src: "/images/products/ss238016cs/swatches.jpg", alt: "Double-faced Wool Fabric - Fabric Swatches" },
    ],
    specifications: [
      { label: "Article Number", value: "SS238016CS" }, { label: "Color", value: "1D White" },
      { label: "Weight", value: "820 G/M" }, { label: "Width", value: "148 ± 2 cm" },
      { label: "Composition", value: "67% Wool, 15% Suri Alpaca, 18% Nylon" }
    ],
    features: [
      { title: "Features", content: "Soft, plush texture with a subtle, elegant sheen. Excellent warmth retention and good drapability." },
      { title: "Texture", content: "The suri alpaca fibers add a luxurious, silky feel." },
      { title: "Appearance", content: "Ideal for high-end winter garments like coats and tailored pieces." }
    ],
    color_categories: [
      { title: "Color Card", image: "/images/products/ss238016cs/colors.jpg", colors: "White, Cream, Grey, Charcoal, Wine Red, Black, Brown, Camel" },
      { title: "Fabric Swatches", image: "/images/products/ss238016cs/swatches.jpg", colors: "White, Camel Brown, Purple, Grey Beige" }
    ]
  },
  {
    slug: "ss02023592cs", name: "Double-faced Wool Fabric", article_number: "SS02023592CS", category: "Wool Blend",
    main_image: "/images/products/ss02023592cs/main-new.jpg",
    images: [
      { src: "/images/products/ss02023592cs/main-new.jpg", alt: "Double-faced Wool Fabric - Main View" },
      { src: "/images/products/ss02023592cs/detail-1.jpg", alt: "Double-faced Wool Fabric - Double Side View" },
      { src: "/images/products/ss02023592cs/detail-2.jpg", alt: "Double-faced Wool Fabric - Texture Detail" },
      { src: "/images/products/ss02023592cs/colors.jpg", alt: "Double-faced Wool Fabric - Color Card" },
    ],
    specifications: [
      { label: "Article Number", value: "SS02023592CS" }, { label: "Color", value: "1AG5456# Dark Black Grey D" },
      { label: "Weight", value: "830-850 G/M" }, { label: "Width", value: "148 ± 2 cm" },
      { label: "Composition", value: "92% Wool, 8% Camel Hair" }
    ],
    features: [
      { title: "Features", content: "Exceptional warmth and a luxuriously soft feel, combining wool insulation with silky camel hair." },
      { title: "Texture", content: "The camel hair adds a subtle, elegant luster and enhances overall softness." },
      { title: "Appearance", content: "Perfect for high-quality winter coats and cold-weather garments." }
    ],
    color_categories: [{ title: "Full Color Range", image: "/images/products/ss02023592cs/colors.jpg", colors: "Pink, Rose, Beige, Camel, Brown, Chocolate, Coffee, Light Blue, Sky Blue, Grey, Charcoal, Black, Wine Red, Burgundy, Navy, Light Green, Olive" }]
  }
]

async function seed() {
  console.log('Starting data migration...')

  // Insert news
  console.log('Inserting news articles...')
  const { error: newsError } = await supabase.from('news').upsert(newsData, { onConflict: 'slug' })
  if (newsError) {
    console.error('News insert error:', newsError)
  } else {
    console.log(`Successfully inserted ${newsData.length} news articles`)
  }

  // Insert products
  console.log('Inserting products...')
  const { error: productsError } = await supabase.from('products').upsert(productsData, { onConflict: 'slug' })
  if (productsError) {
    console.error('Products insert error:', productsError)
  } else {
    console.log(`Successfully inserted ${productsData.length} products`)
  }

  console.log('Data migration complete!')
}

seed()
