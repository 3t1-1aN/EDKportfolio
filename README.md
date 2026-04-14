# Portfolio Website

A modern, animated portfolio website inspired by the Evolva Framer template. Features custom cursor, smooth scrolling, and scroll-triggered animations.

## Features

- **Custom Cursor** - Interactive cursor that changes on hover
- **Smooth Scrolling** - Powered by Lenis for buttery-smooth scroll experience
- **Scroll Animations** - Elements fade in as you scroll using Intersection Observer
- **Responsive Design** - Fully responsive across all devices
- **Dark Mode Support** - Automatic dark mode based on system preferences
- **Next.js 14** - Built with the latest Next.js features
- **Framer Motion** - For advanced animations (ready to use)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── globals.css      # Global styles and Tailwind config
│   ├── layout.tsx       # Root layout with cursor and smooth scroll
│   └── page.tsx         # Main page with all sections
├── components/
│   ├── Cursor.tsx       # Custom cursor component
│   ├── SmoothScroll.tsx # Lenis smooth scroll wrapper
│   ├── ScrollAnimation.tsx # Scroll-triggered animations
│   ├── Navbar.tsx       # Navigation bar
│   ├── Hero.tsx         # Hero section
│   ├── Projects.tsx    # Projects showcase
│   ├── HowItWorks.tsx   # Process/workflow section
│   ├── Stats.tsx        # Statistics with animated counters
│   ├── Testimonials.tsx # Client testimonials carousel
│   ├── Blog.tsx         # Blog posts grid
│   ├── FAQ.tsx          # Frequently asked questions
│   ├── CTA.tsx          # Call to action section
│   └── Footer.tsx       # Footer with links and newsletter
└── package.json
```

## Customization

### Update Your Information

1. **Name/Brand**: Replace "YOUR NAME" in:
   - `components/Navbar.tsx`
   - `components/Hero.tsx`
   - `components/Footer.tsx`

2. **Projects**: Edit the `projects` array in `components/Projects.tsx`

3. **Social Links**: Update social media links in:
   - `components/Hero.tsx`
   - `components/Footer.tsx`

4. **Content**: Customize all text content in each component file

### Styling

The project uses Tailwind CSS. You can customize:
- Colors in `tailwind.config.ts`
- Global styles in `app/globals.css`
- Component-specific styles in each component file

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Lenis** - Smooth scrolling
- **Framer Motion** - Animation library (available but not required)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Credits

Design inspired by the Evolva template from Framer.

##### will soon be setting it up with a proper domain

