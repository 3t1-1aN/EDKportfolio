# Portfolio Website Tree Structure

```
portfolio-website/
│
├── app/                          # Next.js App Router pages
│   ├── about/
│   │   └── page.tsx              # About page
│   ├── blog/
│   │   ├── [slug]/
│   │   │   └── page.tsx          # Dynamic blog post page
│   │   └── page.tsx               # Blog listing page
│   ├── contact/
│   │   └── page.tsx               # Contact page
│   ├── demo/
│   │   └── page.tsx               # Demo page
│   ├── projects/
│   │   ├── category/
│   │   │   └── [categorySlug]/
│   │   │       └── page.tsx      # Category page
│   │   └── page.tsx               # Projects listing page
│   ├── error.tsx                  # Error boundary
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   ├── not-found.tsx              # 404 page
│   └── page.tsx                   # Homepage
│
├── components/                    # React components
│   ├── sections/                  # Page sections
│   │   ├── AboutSection.tsx
│   │   ├── HeroSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   └── TrustedBySection.tsx
│   ├── ui/                        # UI components
│   │   ├── background-ripple-effect.tsx
│   │   ├── blur-text.tsx
│   │   ├── Container.tsx
│   │   ├── dot-shader-background.tsx
│   │   ├── dotted-surface.tsx
│   │   ├── focus-cards.tsx
│   │   ├── gradient-background-4.tsx
│   │   ├── hover-effect.tsx
│   │   ├── images-scrolling-animation.tsx
│   │   ├── NeumorphicButton.tsx
│   │   ├── Section.tsx
│   │   └── SectionHeader.tsx
│   ├── Blog.tsx
│   ├── CTA.tsx
│   ├── Cursor.tsx
│   ├── CursorMaskReveal.tsx
│   ├── DepthLayer.tsx
│   ├── FAQ.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── HowItWorks.tsx
│   ├── Navbar.tsx
│   ├── PageWithDotBackground.tsx
│   ├── ParallaxLayer.tsx
│   ├── ScrollAnimation.tsx
│   ├── ScrollDepth.tsx
│   ├── ScrollSnap.tsx
│   ├── SmoothScroll.tsx
│   ├── Stats.tsx
│   ├── Testimonials.tsx
│   └── ThemeProvider.tsx
│
├── lib/                           # Utility libraries
│   ├── data.ts                    # Centralized data (projects, categories, blog posts, etc.)
│   └── utils.ts                   # Utility functions
│
├── public/                         # Static assets
│   ├── 3d_print.jpg
│   ├── electronics.jpg
│   ├── GeneratedImage.png
│   ├── music.jpg
│   └── music_workstation.jpg
│
├── .gitignore
├── next.config.js                 # Next.js configuration
├── next-env.d.ts                  # Next.js TypeScript definitions
├── package.json                   # Dependencies
├── package-lock.json
├── postcss.config.mjs             # PostCSS configuration
├── README.md
├── SETUP.md
├── tailwind.config.ts             # Tailwind CSS configuration
└── tsconfig.json                  # TypeScript configuration
```

## Key Directories

- **`app/`**: Next.js 13+ App Router structure with file-based routing
- **`components/`**: Reusable React components organized by type
- **`lib/`**: Shared utilities and data definitions
- **`public/`**: Static files served at the root URL

## Routing Structure

- `/` → `app/page.tsx` (Homepage)
- `/about` → `app/about/page.tsx`
- `/blog` → `app/blog/page.tsx`
- `/blog/[slug]` → `app/blog/[slug]/page.tsx`
- `/contact` → `app/contact/page.tsx`
- `/demo` → `app/demo/page.tsx`
- `/projects` → `app/projects/page.tsx`
- `/projects/category/[categorySlug]` → `app/projects/category/[categorySlug]/page.tsx`
