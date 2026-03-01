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
  image: string;
  categoryId?: string;
  tags?: string[];
  audio?: string[];
  images?: string[]; // For projects with multiple images (e.g., mechanics projects)
  video?: string[]; // For projects with video files (e.g., public/videos/*.mp4)
  location?: string; // For photography projects (e.g. "Yosemite National Park")
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  readTime: string;
  image: string;
  excerpt?: string;
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

export const projects: Project[] = [
  {
    id: '3',
    slug: '3d-design',
    title: '3D Design & Modeling',
    description: 'Creating detailed 3D models and renders for various applications, from architectural visualizations to product design concepts.',
    client: 'Personal Projects',
    date: '2023 - Present',
    image: '/3d_print.jpg',
    categoryId: '3d-design',
    tags: ['3D modeling', 'rendering', 'product design'],
  },
  {
    id: '5',
    slug: 'automation-workflows',
    title: 'Workflow Automation',
    description: 'Building automated systems using Make.com and Python to streamline processes and increase productivity across various applications.',
    client: 'Personal Projects',
    date: '2024 - Present',
    image: '/automation.jpg',
    categoryId: 'workflow-automation',
    tags: ['automation', 'python', 'workflow optimization'],
  },
  {
    id: 'software',
    slug: 'software-projects',
    title: 'Software Projects',
    description: 'Web applications, mobile apps, and software solutions built with modern technologies.',
    client: 'Personal Projects',
    date: '2020 - Present',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=800&fit=crop',
    categoryId: 'software-projects',
    tags: ['software', 'web apps', 'development'],
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'design-isn-t-decoration-it-s-direction',
    title: 'Design Isn\'t Decoration — It\'s Direction',
    date: 'Sep 21, 2025',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=600&fit=crop',
  },
  {
    id: '2',
    slug: 'design-systems-are-more-than-just-components',
    title: 'Design Systems Are More Than Just Components',
    date: 'Sep 19, 2025',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
  },
  {
    id: '3',
    slug: 'the-creative-brief-is-broken-here-s-how-to-fix-it',
    title: 'The Creative Brief Is Broken — Here\'s How to Fix It',
    date: 'Sep 18, 2025',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
  },
  {
    id: '4',
    slug: 'should-designers-code-a-practical-perspective',
    title: 'Should Designers Code? A Practical Perspective',
    date: 'Sep 15, 2025',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop',
  },
  {
    id: '5',
    slug: 'crafting-a-portfolio-that-wins-clients-not-just-likes',
    title: 'Crafting a Portfolio That Wins Clients — Not Just Likes',
    date: 'Sep 12, 2025',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
  },
  {
    id: '6',
    slug: 'the-future-of-human-ai-collaboration-in-design',
    title: 'The Future of Human–AI Collaboration in Design',
    date: 'Sep 7, 2025',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
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
    image: '/electronics.jpg',
  },
  {
    id: '3d-design',
    slug: '3d-design-modeling',
    title: '3D Design & Modeling',
    description: 'Detailed 3D models and renders for architectural visualizations and product design concepts.',
    image: '/3d_print.jpg',
  },
  {
    id: 'music-composition',
    slug: 'digital-music-composition',
    title: 'Digital Music Composition',
    description: 'Original compositions blending piano, drums, and digital production.',
    image: '/music.jpg',
  },
  {
    id: 'workflow-automation',
    slug: 'workflow-automations',
    title: 'Workflow Automations',
    description: 'Automated systems using Make.com and Python to streamline processes and increase productivity.',
    image: '/automation.jpg',
  },
  {
    id: 'photography',
    slug: 'photography',
    title: 'Photography',
    description: 'Capturing the beauty of the outdoors through nature and wildlife photography.',
    image: '/photography.jpg',
  },
  {
    id: 'software-projects',
    slug: 'software-projects',
    title: 'Software Projects',
    description: 'Web applications, mobile apps, and software solutions built with modern technologies.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=800&fit=crop',
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

