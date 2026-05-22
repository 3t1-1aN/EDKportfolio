import { Project } from './data';

const GITHUB_USER = '3t1-1aN';

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

export async function getSoftwareProjects(): Promise<Project[]> {
  return [...mapPublicGithubRepos(), ...privateDefsToProjects(PRIVATE_SOFTWARE_PROJECTS)];
}
