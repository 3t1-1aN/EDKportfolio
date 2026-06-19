import { categoryImages } from './projects/category-images';

// Centralized data layer matching Framer structure

export interface Category {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  icon?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  client: string;
  date: string;
  /** Omit for text-only cards (e.g. GitHub software list) */
  image?: string;
  categoryId?: string;
  tags?: string[];
  audio?: string[];
  images?: string[]; // For projects with multiple images (e.g., mechanics projects)
  screenshots?: string[]; // Major software projects: gallery shown in expanded card body
  video?: string[]; // Cloudinary video delivery URLs
  location?: string; // For photography projects (e.g. "Yosemite National Park")
  githubUrl?: string; // Link to GitHub repository (software category)
  projectUrl?: string; // Link to a live/deployed project (software category)
  /** Software category: group cards under Major / Public / Private subsections */
  softwareVisibility?: 'major' | 'public' | 'private';
}

export interface Testimonial {
  id: string;
  text: string;
  author: string;
  role: string;
  avatar: string;
}

export interface WorkflowStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  services: string[];
}

export interface WritingPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  mediumUrl: string;
  tags: string[];
  featured?: boolean;
}

export const writingPosts: WritingPost[] = [
  // Add Medium posts here as you publish them.
  {
    id: 'first-post',
    slug: 'first-post',
    title: 'Linux vs Windows: AI might finally be Linux\'s killer feature',
    description: 'Want to be in the frontier of the ever changing landscape of AI? Now might be the best time to make the switch to Linux',
    date: 'June 2026',
    readTime: '7 min read',
    mediumUrl: 'https://medium.com/@ethankunder/linux-vs-windows-ai-might-finally-be-linuxs-killer-feature-f4169d443735',
    tags: ['AI', 'Windows', 'Linux'],
    featured: true,
  },
];

// Backward-compatible alias for the old blog route/component while the site moves to Writing.
export const blogPosts = writingPosts;

export const projects: Project[] = [
  {
    id: '3',
    slug: '3d-design',
    title: '3D Design & Modeling',
    description: 'Creating detailed 3D models and renders for various applications, from architectural visualizations to product design concepts.',
    client: 'Personal Projects',
    date: '2023 - Present',
    image: categoryImages.threeDPrint,
    categoryId: '3d-design',
    tags: ['3D modeling', 'rendering', 'product design'],
  },
];

export const workflowSteps: WorkflowStep[] = [
  {
    number: '01',
    title: 'Brief',
    subtitle: '_',
    description: 'Every collaboration begins with alignment — understanding your brand, business goals, and the challenge ahead. This stage sets the direction for strategic and creative focus.',
    services: ['Strategic Planning', 'Brand Strategy', 'Project Goals'],
  },
  {
    number: '02',
    title: 'Research',
    subtitle: '_',
    description: 'I explore the landscape — diving into competitors, user behavior, and industry benchmarks. Research fuels creativity, ensuring every decision is rooted in relevance and opportunity.',
    services: ['Market Analysis', 'User Research', 'Analytics and Insights'],
  },
  {
    number: '03',
    title: 'Brainstorm & Sketch',
    subtitle: '_',
    description: 'With a direction in mind, I sketch, scribble, and explore. This is where ideas breathe — shaping early concepts, layouts, and potential creative directions through iterative thinking.',
    services: ['Wireframing & Prototyping', 'Moodboards', 'Art Direction', 'Campaign Development'],
  },
  {
    number: '04',
    title: 'Build Concepts',
    subtitle: '_',
    description: 'Selected directions evolve into fully formed visual concepts. I refine composition, color, type, and flow — balancing function with emotion to bring your brand to life in every pixel.',
    services: ['Logo Design', 'Brand Guidelines', 'Product Design', 'Motion Design', 'Design Systems'],
  },
  {
    number: '05',
    title: 'Development',
    subtitle: '_',
    description: 'With strong design senses, I build responsive, production-ready experiences — complete with animations, forms, and logic. No handoff hassles, just seamless transition from design to launch.',
    services: ['Responsive Design', 'No-code Development', 'Advanced Custom Animation', 'Performance Optimization'],
  },
  {
    number: '06',
    title: 'Present',
    subtitle: '_',
    description: 'The final step is about alignment and excitement. I walk you through the finished product, gather feedback, and polish every detail. Together, we launch work that\'s ready to make an impact.',
    services: ['Final Presentation', 'Feedback Rounds', 'Launch Support', 'Handover Package'],
  },
];

export const categories: Category[] = [
  {
    id: 'diy-electronics',
    slug: 'diy-electronics-mechanics',
    title: 'DIY Electronics & Mechanics',
    description: 'Creative hardware projects and mechanical builds, from CPU desk fans to custom electronics.',
    image: categoryImages.electronics,
  },
  {
    id: '3d-design',
    slug: '3d-design-modeling',
    title: '3D Design & Modeling',
    description: 'Detailed 3D models and renders for architectural visualizations and product design concepts.',
    image: categoryImages.threeDPrint,
  },
  {
    id: 'music-composition',
    slug: 'digital-music-composition',
    title: 'Digital Music Composition',
    description: 'Original compositions blending piano, drums, and digital production.',
    image: categoryImages.music,
  },
  {
    id: 'photography',
    slug: 'photography',
    title: 'Photography',
    description: 'Capturing the beauty of the outdoors through nature and wildlife photography.',
    image: categoryImages.photography,
  },
  {
    id: 'software-projects',
    slug: 'software-projects',
    title: 'Software Projects',
    description: 'Web applications, mobile apps, and software solutions built with modern technologies.',
    image: categoryImages.softwareProjects,
  },
];
export const testimonials: Testimonial[] = [
  {
    id: '1',
    text: 'Leo is more than a designer; he\'s a creative partner who adapts to our needs while keeping us on brand during product launches.',
    author: 'Patrick Lin',
    role: 'Head of Product at Sluck',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
  },
  {
    id: '2',
    text: 'From the first deck to final handoff, every part of the process felt intentional. Leo is a systems thinker and a storyteller, and he delivers work that\'s as scalable as it is stunning.',
    author: 'Oliver Griggs',
    role: 'Senior PM at Tisla Mobility',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces',
  },
  {
    id: '3',
    text: 'Working with Leo transformed our brand. He not only created a stunning visual identity but also changed how we connect with our audience.',
    author: 'Amanda Reyes',
    role: 'Head of Brand at Googel',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
  },
  {
    id: '4',
    text: 'Leo designs strategically and executes artistically. He unified our scattered product vision into a cohesive experience that our customers adore.',
    author: 'Daniel Kim',
    role: 'Product Manager at Canvo',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces',
  },
  {
    id: '5',
    text: 'From the first call to final delivery, Leo made everything seamless and collaborative, turning abstract ideas into beautiful, aligned outcomes.',
    author: 'Nina Patel',
    role: 'Creative Director at Microsuft',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces',
  },
];

export const stats = {
  mobileApps: 72,
  webDesigns: 28,
  dashboards: 15,
  consultations: 10,
  projectsCompleted: 125,
  campaignsLaunched: 48,
  clientsServed: 89,
  satisfactionRate: 98,
};

