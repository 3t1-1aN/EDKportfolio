/**
 * Custom descriptions for dynamically loaded projects.
 * Edit this file to set your own description for each music and mechanics project. Photography uses photographyProjectMeta (date/location) only.
 *
 * Keys are project slugs (derived from filenames):
 * - Music: from audio filename, e.g. "hills-and-valleys" for "Hills and Valleys.mp3"
 * - Mechanics: from image base name, e.g. "arclighter" for "arclighter1.jpg"; video slugs from .mp4 filename, e.g. "build-timelapse" for "Build Timelapse.mp4"
 * Only list entries you want to override; projects not listed keep their auto-generated description.
 */

/** Custom descriptions for music projects (slug -> description) */
export const musicProjectDescriptions: Record<string, string> = {
  'hills-and-valleys': 'A christian contemporary song from Tauren Wells called "Hills and Valleys".',
  'icarius': 'A beautiful piano piece remixed from Tony Ann called "Icarius".',
  'oceans': 'A peaceful christian contemporary song called "Oceans", remixed with careful piano layering and other instruments.',
  'pianoissma': 'A playful piano piece of my own composition based of a simple melody that started in my head.',
  'one-with-nature': 'A serene piano piece inspired by the beauty of nature, with a gentle stream in the background, gentle guitar, and a soft piano accompaniment.',
  // Add more: use the slug from the audio filename (lowercase, hyphens).
};

/** Custom descriptions for mechanics/DIY projects (slug -> description) */
export const mechanicsProjectDescriptions: Record<string, string> = {
  'arclighter': 'A handheld plasma arc lighter built from reclaimed components.',
  'butterfly-knife': 'a butterfly knife handcrafted from popsicle sticks.',
  'crossbow': 'a crossbow made from a broken clothes clip, string, and some plastic components.',
  'dremel': 'a mini dremel tool made from a battery, a motor, a switch, and  metal bottle cap for the blade.',
  'glove': 'a glove made from cardboard and controlled with strings.',
  'plane': 'a small plane that was put together by cutting different parts from popsicle sticks, gluing it together, and then sanding it down before assembling it and painting it.',
  'wrist-launcher': 'my go at making my own spiderweb launcher. It worked pretty nicely.',
  'diskdrive-clock': 'a clock made from a broken disk drive, 3D printed binary numbers, and a clock module.',
  'alarm': 'An alarm clock that continues to sound until it detects 30 seconds of movement in front of it. Made to help me get up in the morning. It is made from a custom 3D printed box, an arduino, a pir sensor (to detect the motion), a speaker, and at RTC module all hand soldered on a pcb board.',
  'gimbal': 'a mini gimbal that I made completely from scratch with my own things. It is a 3D printed frame, controlled with 3 servo motors, an arduino as the brain, and an MPU-6050 acceleration/gyroscope sensor to get motion and provide stabalization. all the components are hand soldered onto solder board.',
  'kinetic-clock': 'a mechanical version of a full 4 numbered, 7 segment clock. It uses 28 servo motors to actuate the individual segments in and out to disply the time. It fetches time from a time server, puts it onto the arduinos built in RTC, and the 2 I2C-controlled PWM drivers relay it onto the servo motors to create the time. Alongside that, a custom UI is that is running on the arduinos port is able to send special instructions to the clock to turn it into a stopwatch, a countdown timer, or an alarm.'



  // Example: 'arclighter': 'A handheld plasma arc lighter built from reclaimed components.',
  // Add more: use the slug from the image base name (e.g. "cpu-fan" for cpu-fan1.jpg).
};

/**
 * Date and location for each photography project (one entry per photo/slug).
 * Slug = image base name, e.g. "sunset" for sunset1.jpg, "bird" for bird-01.png.
 * Add an entry for each photo to show date and location on the expanded card.
 */
export const photographyProjectMeta: Record<
  string,
  { date?: string; location?: string }
> = {
  // Example:
  // 'sunset': { date: 'August 2024', location: 'Lake Tahoe, CA' },
  // 'eagle': { date: '2023', location: 'Alaska' },
};

