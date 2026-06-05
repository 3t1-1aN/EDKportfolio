import { Project } from './data';

const GITHUB_USER = '3t1-1aN';

/**
 * Major / featured software projects — full webapps, apps, or sites.
 * They render under the "Major Projects" subsection at the top of the
 * Software Projects page with larger cards: project screenshot, a demo
 * video that auto-plays when the card is expanded, a description, and
 * optional links (live project URL and/or GitHub).
 *
 * - slug: unique, URL-friendly (lowercase, hyphens)
 * - title, description: shown on the card
 * - image: cover screenshot (collapsed thumbnail + expanded header fallback)
 * - video: demo video URL(s); auto-plays when card expands
 * - screenshots: additional screenshots shown as a scrollable gallery in the
 *   expanded card body (separate from the cover image)
 * - projectUrl: optional live/deployed URL
 * - githubUrl: optional repo URL if public
 * - tags: optional tech / category tags
 */
export type MajorSoftwareProjectDef = {
  slug: string;
  title: string;
  description: string;
  image: string;
  video?: string[];
  screenshots?: string[];
  projectUrl?: string;
  githubUrl?: string;
  tags?: string[];
};

export const MAJOR_SOFTWARE_PROJECTS: MajorSoftwareProjectDef[] = [
  // Example — replace with your real projects:
  // {
  //   slug: 'my-webapp',
  //   title: 'My Webapp',
  //   description: 'A short description of what the project does.',
  //   image: '/projects/software/my-webapp/cover.png',
  //   video: ['/projects/software/my-webapp/demo.mp4'],
  //   screenshots: [
  //     '/projects/software/my-webapp/home.png',
  //     '/projects/software/my-webapp/dashboard.png',
  //     '/projects/software/my-webapp/settings.png',
  //   ],
  //   projectUrl: 'https://my-webapp.example.com',
  //   githubUrl: 'https://github.com/3t1-1aN/my-webapp',
  //   tags: ['Next.js', 'TypeScript'],
  // },
  {
    slug: 'focuslens',
    title: 'FocusLens',
    description: 'A productivity desktop app built with React that utilizes AI and OS level integrations to help you stay focused and productive on the task you have set.',
    image: 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779823793/FocusLens_product_svcz5u.png',
    video: ['none'],
    screenshots: ['https://res.cloudinary.com/dhbn2shvj/image/upload/v1779844739/Screenshot_2026-05-26_100630_wi5fqs.png', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779844738/Screenshot_2026-05-26_100548_jza3qk.png', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779844738/Screenshot_2026-05-26_100524_mvkdeg.png', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779844738/Screenshot_2026-05-26_100433_umh3jk.png', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779844738/Screenshot_2026-05-26_100327_trisue.png'],
    projectUrl: 'https://focus-lens-agent.vercel.app/',
    githubUrl: 'None',
    tags: ['Electron', 'JavaScript', 'Three.js'],
  },
  {
    slug: 'grove',
    title: 'Grove',
    description: 'An organic, lightweight tasker/todo productivity app that is built with Tauri. Designed as a transparent, subscription free version of other producivity apps while being much more enjoyable to use. fully open source and open to any feedback or contributions.',
    image: 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1780210394/Grove_product_ts8q97.png',
    video: ['none'],
    screenshots: ['https://res.cloudinary.com/dhbn2shvj/image/upload/v1780210835/Screenshot_2026-05-31_000010_j5ok3p.png', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1780210835/Screenshot_2026-05-30_235923_hhg5bg.png', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1780210835/Screenshot_2026-05-30_235543_fof0ud.png', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1780210836/Screenshot_2026-05-30_235858_fxg2tr.png', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1780210946/Screenshot_2026-05-31_000159_kcqpig.png', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1780210946/Screenshot_2026-05-31_000214_bijfqd.png'],
    projectUrl: 'https://grove-todo.vercel.app/',
    githubUrl: 'https://github.com/3t1-1aN/Grove_organic_todo_website',
    tags: ['HTML'],
  },
];

/**
 * Private / non-public-repo software — edit this array to add entries.
 * They render under the "Private" subsection on the Software Projects page.
 *
 * - slug: unique, URL-friendly (lowercase, hyphens)
 * - title, description: shown on the card
 * - tags, image: optional
 */
export type PrivateSoftwareProjectDef = {
  slug: string;
  title: string;
  description: string;
  tags?: string[];
  image?: string;
};

export const PRIVATE_SOFTWARE_PROJECTS: PrivateSoftwareProjectDef[] = [
  // Example:
  // {
  //   slug: 'internal-automation',
  //   title: 'Internal automation',
  //   description: 'Private tooling for a client; repo not public.',
  //   tags: ['Python', 'Automation'],
  // },

  {
    slug: 'AI',
    title: 'PrivateGPT',
    description: 'A project I took up in the early days of AI. With privateGPT, I used local AI models that Ollama provided and made a kind of notebookLM. PrivateGPT is able to answer you based on the documents you upload into it.',
    tags: ['local AI'],
  },

  {
    slug: 'AI',
    title: 'home server/NAS',
    description: 'Made my raspberry pi 4 into a home server/NAS running kasmOS. I used it to store files and to run my own services.',
    tags: ['SBC', "home server"],
  },

  {
    slug: 'AI',
    title: 'fabric',
    description: 'fabric is a github tool developed by Daniel Miessler (https://github.com/danielmiessler/fabric). This amazing tool was something I set up and played a lot with. In the early stages of AI, It allowed for you to use or create "patterns" which were essentially predefined prompts that you could use for a variety of different use cases.',
    tags: ['AI', 'CLI'],
  },

  {
    slug: 'browser',
    title: 'SearXNG',
    description: 'A private search engine (https://github.com/searxng/searxng). Just a fun project I found and wanted to try out. It is a self-hostable metasearch engine: it does not crawl the web itself, but sends your query to multiple search providers and combines the results into one page. When you run your own instance, your browser talks to your server first, and that server then queries the upstream search engines on your behalf, which helps hide your personal IP from those engines',
    tags: ['browser', 'security'],
  },

  {
    slug: 'AI',
    title: 'browser use AI agent',
    description: 'Browser-Use (https://github.com/browser-use/browser-use) is a Python library and CLI for automating real web browsers with AI agents so they can navigate sites, click, type, fill forms, and complete multi-step tasks online.',
    tags: ['AI', 'browser automation'],
  },

  {
    slug: 'AI',
    title: 'private AI assistant',
    description: 'Built a private AI assistant that uses local AI models pulled from ollama to run AI locally and securely. I used webUI as a dashboard to be able to manage the different AI models that I used',
    tags: ['local AI'],
  },

  {
    slug: 'website',
    title: 'website building',
    description: 'Using different vibe coding tools to practice building websites for potential clients. Learning how to integrate databases such a supabase into site, using different sites to build out UI components such as bolt, 21st dev, and stitch by google',
    tags: ['website'],
  },





];

type SoftwareRepoDef = {
  repo: string;
  title: string;
  description: string;
  tags: string[];
  /** Optional thumbnail if you add one under /public later */
  image?: string;
};

/**
 * Curated GitHub repositories for the Software Projects category.
 * Edit this list to add/remove repos; slugs are derived from `repo`.
 */
const SOFTWARE_REPOS: SoftwareRepoDef[] = [
  {
    repo: 'Scripture-journal',
    title: 'Scripture Journal',
    description:
      'A minimal, visual app for Bible study note-taking and journaling.',
    tags: ['Web', 'App'],
  },
  {
    repo: 'Tasker-website',
    title: 'Tasker',
    description:
      'A simple site for timers and weekly tasks to stay on track.',
    tags: ['Web', 'Productivity'],
  },
  {
    repo: 'llm-chat-app-test',
    title: 'LLM Chat App',
    description: 'Experiment building a chat interface around an LLM.',
    tags: ['JavaScript', 'AI'],
  },
  {
    repo: 'escape-room',
    title: 'Escape Room',
    description: 'A Zork-style text adventure escape room game.',
    tags: ['Python', 'CLI', 'Game'],
  },
  {
    repo: 'python-Hangman',
    title: 'Hangman',
    description: 'One of my first larger Python projects — classic Hangman in the terminal.',
    tags: ['Python', 'Game'],
  },
  {
    repo: 'python_unit_circle',
    title: 'Unit Circle',
    description: 'An interactive unit circle visualization built with Turtle.',
    tags: ['Python', 'Math', 'Visualization'],
  },
  {
    repo: 'adafruit-projects',
    title: 'Adafruit Projects',
    description: 'Small circuits and demos using Adafruit boards and sensors.',
    tags: ['Python', 'Hardware'],
  },
  {
    repo: 'Arduino-PIRmotion-alarm',
    title: 'PIR Motion Alarm',
    description:
      'Alarm clock with RTC and PIR sensor — movement in front of it is the only way to silence it.',
    tags: ['C++', 'Arduino', 'Embedded'],
  },
  {
    repo: 'DIY-Arduino-Gimbal',
    title: 'Arduino Gimbal',
    description:
      '3D-printed gimbal stabilized with three servos and an Arduino.',
    tags: ['C++', 'Arduino', '3D printing'],
  },
  {
    repo: 'kinetic-clock',
    title: 'Kinetic Clock',
    description: 'A mechanical segmented clock driven by servos and microcontrollers.',
    tags: ['C++', 'Arduino', 'Mechanical'],
  },
  {
    repo: 'ACS712-sensor',
    title: 'ACS712 Sensor',
    description: 'Experiments and code for current sensing with the ACS712 module.',
    tags: ['C++', 'Arduino', 'Sensors'],
  },
];

function repoToSlug(repo: string): string {
  return repo.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function mapPublicGithubRepos(): Project[] {
  return SOFTWARE_REPOS.map((def) => {
    const slug = repoToSlug(def.repo);
    const githubUrl = `https://github.com/${GITHUB_USER}/${def.repo}`;
    return {
      id: `software-${slug}`,
      slug,
      title: def.title,
      description: def.description,
      client: '',
      date: '',
      ...(def.image ? { image: def.image } : {}),
      categoryId: 'software-projects',
      softwareVisibility: 'public' as const,
      tags: def.tags,
      githubUrl,
    };
  });
}

function privateDefsToProjects(defs: PrivateSoftwareProjectDef[]): Project[] {
  return defs.map((def) => ({
    id: `software-private-${def.slug}`,
    slug: def.slug,
    title: def.title,
    description: def.description,
    client: '',
    date: '',
    ...(def.image ? { image: def.image } : {}),
    categoryId: 'software-projects',
    softwareVisibility: 'private' as const,
    tags: def.tags ?? [],
  }));
}

/** Treat `''`, `'none'`, and `'#'` as "not set yet" so placeholders don't
 *  render as broken videos / dead links. */
function cleanUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed || trimmed.toLowerCase() === 'none' || trimmed === '#') {
    return undefined;
  }
  return trimmed;
}

function cleanUrlList(values: string[] | undefined): string[] | undefined {
  if (!values) return undefined;
  const cleaned = values
    .map((v) => cleanUrl(v))
    .filter((v): v is string => Boolean(v));
  return cleaned.length > 0 ? cleaned : undefined;
}

function majorDefsToProjects(defs: MajorSoftwareProjectDef[]): Project[] {
  return defs.map((def) => {
    const video = cleanUrlList(def.video);
    const screenshots = cleanUrlList(def.screenshots);
    const projectUrl = cleanUrl(def.projectUrl);
    const githubUrl = cleanUrl(def.githubUrl);
    return {
      id: `software-major-${def.slug}`,
      slug: def.slug,
      title: def.title,
      description: def.description,
      client: '',
      date: '',
      image: def.image,
      ...(video ? { video } : {}),
      ...(screenshots ? { screenshots } : {}),
      ...(projectUrl ? { projectUrl } : {}),
      ...(githubUrl ? { githubUrl } : {}),
      categoryId: 'software-projects',
      softwareVisibility: 'major' as const,
      tags: def.tags ?? [],
    };
  });
}

export async function getSoftwareProjects(): Promise<Project[]> {
  return [
    ...majorDefsToProjects(MAJOR_SOFTWARE_PROJECTS),
    ...mapPublicGithubRepos(),
    ...privateDefsToProjects(PRIVATE_SOFTWARE_PROJECTS),
  ];
}
