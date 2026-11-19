import type { Project } from '../data';
import { threeDProject } from './defaults';

/**
 * Functional prints I design and publish on MakerWorld (https://makerworld.com/en/@3Dhacker101).
 * Descriptions are my own MakerWorld text, unchanged. Longer ones are split into
 * `description` (first paragraph, shown on the card) and `details` (the rest).
 *
 * Each model lives in public/makerworld/<slug>/ as cover.webp, gallery-N.webp and an
 * optional model.glb. To add a 3D viewer to a model without one, drop model.glb in its
 * folder and set `model` to '/makerworld/<slug>/model.glb'. The Draco decoder for
 * compressed GLB files is in public/draco.
 */
type MakerworldInput = {
  slug: string;
  title: string;
  description: string;
  details?: string[];
  url: string;
  license: string;
  tags: string[];
  gallery: number;
  /** GLB path under /makerworld/<slug>/. Leave undefined until a GLB exists. */
  model?: string;
};

function makerworldProject(input: MakerworldInput): Project {
  const base = `/makerworld/${input.slug}`;
  const cover = `${base}/cover.webp`;
  const gallery = Array.from({ length: input.gallery }, (_, i) => `${base}/gallery-${i + 1}.webp`);
  return {
    ...threeDProject({
      slug: `makerworld-${input.slug}`,
      title: input.title,
      description: input.description,
      image: cover,
      // Models with a GLB show the 3D viewer first and the photos below it.
      // Models without one show cover + photos in the card header instead.
      images: input.model ? undefined : [cover, ...gallery],
      tags: ['3D printing', ...input.tags],
    }),
    tool: 'cad',
    client: '',
    date: '',
    details: input.details,
    gallery: input.model ? [cover, ...gallery] : undefined,
    model: input.model,
    projectUrl: input.url,
    license: input.license,
  };
}

export const makerworldProjects: Project[] = [
  makerworldProject({
    slug: "pocket-sized-lid-box",
    title: "Pocket Sized Lid Box",
    description:
      "A pocket-size vertical box with a springless push-button latch. Press the button and the tray slides up out of the shell. Close it and it clicks shut.",
    details: [
      "Four printed parts: shell, tray, button and pin. No hardware, no springs, no supports.",
      "Size: 42 x 20 x 95 mm",
      "Inside pocket: about 29 x 11 x 68 mm (roughly 23 mL). Big enough for a few pills or vitamins, foam earplugs, SD and microSD cards, a USB stick, guitar picks, bobby pins, coins up to quarter size, or small house keys just to name a few.",
      "Only assembly required: drop the button into the notch in the cap, line up the holes, and press the toothpick in flat side toward the shell until it sits flush. If it is loose, add a drop of CA glue in the cap holes only.",
      "This is version one. I have plans to make a bigger version of this with additional attachments for different use cases. Let me know down in the comments how it is, improvements, and any additional box variations you might want to see",
    ],
    url: "https://makerworld.com/en/models/3445610-pocket-sized-lid-box",
    license: "MakerWorld Exclusive License",
    tags: ["latch box", "pocket box", "push button", "springless", "storage"],
    gallery: 4,
    model: "/makerworld/pocket-sized-lid-box/model.glb",
  }),
  makerworldProject({
    slug: "wooden-coaster",
    title: "wooden coaster",
    description:
      "This is my first print I made with Creality wooden filament and it turned out pretty good and highly believable. The wood grain texture came from texture mapping I did in Fusion and the feel of the coaster does not feel like plastic at all. To add more realism (between the print bed photo and the cover photo) I sanded it down to make it rougher and I was able to add wood staining to it. I brushed a cherry wood staining on it and it became so much better. I am quite surprised with the results. It was an hour print on my Bambu A1 with all the textures and all but I also ran it at 50% speed which im not sure made a difference in quality or not. It depends from filament to filament but I ended up printing at 200 degrees instead of the default 220. if you feel the print is getting a bit rough with your filament, decrease the temperature.",
    url: "https://makerworld.com/en/models/2995286-wooden-coaster",
    license: "BY-NC-SA",
    tags: ["coaster", "wood", "wooden", "cup", "table"],
    gallery: 1,
    model: "/makerworld/wooden-coaster/model.glb",
  }),
  makerworldProject({
    slug: "key-hook",
    title: "key hook",
    description:
      "a smooth, wall key hook. It has 7 pegs. very simple, minimal, clean, and gets the job done. no supports of any kind, a very easy print",
    url: "https://makerworld.com/en/models/2973807-key-hook",
    license: "BY-NC-SA",
    tags: ["keys", "hooks", "front door", "wall hanger"],
    gallery: 3,
    model: "/makerworld/key-hook/model.glb",
  }),
  makerworldProject({
    slug: "modern-pen-pencil-sticky-pad-holder",
    title: "Modern pen/pencil & sticky pad holder",
    description:
      "This is a simple, triangular desk pen/pencil holder with the additional capability of holding a sticky pad. It has a nice modern look with a mix of ribbed and smooth faces",
    url: "https://makerworld.com/en/models/2279972-modern-pen-pencil-sticky-pad-holder",
    license: "BY-NC-SA",
    tags: ["pen holder", "pencil cup", "modern", "desk organizer"],
    gallery: 1,
    model: "/makerworld/modern-pen-pencil-sticky-pad-holder/model.glb",
  }),
  makerworldProject({
    slug: "bosch-router-table-dust-collector-hose-port-fit",
    title: "BOSCH router table dust collector hose port fit",
    description:
      "this is a simple bosch router table dust collector connector I made to fit my dewalt woodworking vacuum. Printed with support.",
    url: "https://makerworld.com/en/models/512019-bosch-router-table-dust-collector-hose-port-fit",
    license: "BY-NC-SA",
    tags: ["bosch", "adapter", "hose adapter", "workshop"],
    gallery: 4,
    model: "/makerworld/bosch-router-table-dust-collector-hose-port-fit/model.glb",
  }),
  makerworldProject({
    slug: "bottle-cap",
    title: "bottle cap",
    description:
      "This is a simple pop on cap that replaces the cap on glass soda bottles after you open them. No supports needed, prints in less than 10 minutes, and works right when you take it of the bed. Very easy to pop on and off. Hugs tightly enough onto the lip of the bottle that it is firmly on yet you can pop it off with some force.",
    url: "https://makerworld.com/en/models/484618-bottle-cap",
    license: "BY-NC-SA",
    tags: ["cap", "cover", "drink accessory"],
    gallery: 1,
    model: "/makerworld/bottle-cap/model.glb",
  }),
  makerworldProject({
    slug: "do-not-disturb-earphones",
    title: "do not disturb earphones",
    description:
      "This is a pair of fake earphones designed for you to wear when you need alone time so people will not disturb. It is a less than ten minute print, uses no supports, and uses the silicon ear piece of  wired earphones to attach on. If you have any comments, feel free to drop them down below.",
    url: "https://makerworld.com/en/models/477191-do-not-disturb-earphones",
    license: "BY-NC-SA",
    tags: ["earphones", "do not disturb", "cos play", "work"],
    gallery: 2,
    // No GLB yet. Add public/makerworld/do-not-disturb-earphones/model.glb and set model: '/makerworld/do-not-disturb-earphones/model.glb'.
    model: undefined,
  }),
  makerworldProject({
    slug: "jawbone-headset-headphone-stand",
    title: "jawbone headset + headphone stand",
    description:
      "This is a headphone stand specifically designed for a headphone and a jawbone headset. It is a two piece install, base and stand which just fit together on first try. No glue necessarily required.",
    details: [
      "printed flat on print bed so lines would be vertical standing up thus enabling it to not snap as easily.",
      "support: whatever the Cura slicer gave me (very minimal, mainly for the block at the end of the stand that I made 100% infill and used support to lift up)",
      "infill: played it safe, did 20%",
      "3d printer: Creality CR10-mini",
      "time: about 4 hours each (stand and base) with all the default settings",
      "p.s I shortened the width of the big headphone holder so that it won't be allowed to slide as far out",
    ],
    url: "https://makerworld.com/en/models/472425-jawbone-headset-headphone-stand",
    license: "BY-NC-SA",
    tags: ["headphone accessory", "stand", "headphone", "desk accessory", "office accessory"],
    gallery: 4,
    // No GLB yet. Add public/makerworld/jawbone-headset-headphone-stand/model.glb and set model: '/makerworld/jawbone-headset-headphone-stand/model.glb'.
    model: undefined,
  }),
];
