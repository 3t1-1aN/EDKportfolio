import type { Project } from '../data';
import { categoryImages } from './category-images';
import { mechanicsProject } from './defaults';

const U = {
  alarm1: 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779250048/alarm1_j8xdqy.jpg',
  alarm2: 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779250056/alarm2_f9rhjg.jpg',
  arclighter1:
    'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779250053/arclighter1_zrvkrf.jpg',
  arcligher2:
    'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779250062/arcligher2_m4ndxn.jpg',
  arcligher3:
    'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779250054/arcligher3_w0edjy.jpg',
  butterflyKnife:
    'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779250060/butterfly_knife_x1icte.jpg',
  crossbow:
    'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779250058/crossbow_gyql2u.jpg',
  diskdriveClock:
    'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779250057/diskdrive_clock_q3x7rx.jpg',
  dremel1:
    'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779250058/dremel1_hnxtlh.jpg',
  dremel2:
    'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779250065/dremel2_ozufub.jpg',
  glove1:
    'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779250066/glove1_omh3ra.jpg',
  glove2:
    'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779250067/glove2_x0c3es.jpg',
  plane: 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779250083/plane_krgf1w.jpg',
  wristLauncher1:
    'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779250085/wrist_launcher1_tgy4tr.jpg',
  wristLauncher2:
    'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779250084/wrist_launcher2_gfbvkf.jpg',
  wristWeb:
    'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779250077/wrist_web_k0pxtv.jpg',
  kineticClock1:
    'https://res.cloudinary.com/dhbn2shvj/image/upload/v1783896729/PXL_20260602_212719341.PORTRAIT_c8gjem.jpg',
  kineticClock2:
    'https://res.cloudinary.com/dhbn2shvj/video/upload/v1783899523/kinetic-clock-1_7L5ifgMG_as0zl7.mp4',
  gimbal1:
    'https://res.cloudinary.com/dhbn2shvj/image/upload/v1783897790/Gemini_Generated_Image_e1i3uwe1i3uwe1i3_vjqrub.png',
  gimbal2:
    'https://res.cloudinary.com/dhbn2shvj/video/upload/v1779250085/gimbal_fhm9yh.mp4'

} as const;

/**
 * One entry per DIY project card. Paste Cloudinary URLs into `image` / `images` / `video`.
 * Order in this array is display order (reorder freely).
 */
export const mechanicsProjects: Project[] = [
  mechanicsProject({
    slug: 'kinetic-clock',
    title: 'Kinetic Clock',
    description:
      'One of my biggest most challengin projects I have ever done. It is a take on the classic boring digital clock and instead of mechanising it like how normally done with a flip mechanism, this one keeps the classic digital clock look but actuates the segments in and out with teh use of 30 hobby servo motors.',
    image: U.kineticClock1,
    video: [U.kineticClock2],
  }),
  mechanicsProject({
    slug: 'gimbal',
    title: 'Gimbal',
    description:
      'My first full, in-my-bedroom project where I did everything from 3D printing the parts to soldering the components. it was a fun challenge I had taken up and learned a lot from. It uses an MPU-6050 acceleration/gyroscope sensor to get motion and provide stabalization.',
    image: U.gimbal1,
    video: [U.gimbal2],
  }),
  mechanicsProject({
    slug: 'alarm',
    title: 'Alarm',
    description:
      'An alarm clock that continues to sound until it detects 30 seconds of movement in front of it. Made to help me get up in the morning. It is made from a custom 3D printed box, an arduino, a pir sensor (to detect the motion), a speaker, and at RTC module all hand soldered on a pcb board.',
    image: U.alarm1,
    images: [U.alarm1, U.alarm2],
  }),
  mechanicsProject({
    slug: 'diskdrive-clock',
    title: 'Diskdrive Clock',
    description:
      'a clock made from a broken disk drive, 3D printed binary numbers, and a clock module.',
    image: U.diskdriveClock,
  }),
  mechanicsProject({
    slug: 'arclighter',
    title: 'Arclighter',
    description: 'A handheld plasma arc lighter built from reclaimed components.',
    image: U.arclighter1,
    images: [U.arclighter1, U.arcligher2, U.arcligher3],
  }),
  mechanicsProject({
    slug: 'butterfly-knife',
    title: 'Butterfly Knife',
    description: 'a butterfly knife handcrafted from popsicle sticks.',
    image: U.butterflyKnife,
  }),
  mechanicsProject({
    slug: 'crossbow',
    title: 'Crossbow',
    description:
      'a crossbow made from a broken clothes clip, string, and some plastic components.',
    image: U.crossbow,
  }),
  mechanicsProject({
    slug: 'dremel',
    title: 'Dremel',
    description:
      'a mini dremel tool made from a battery, a motor, a switch, and  metal bottle cap for the blade.',
    image: U.dremel1,
    images: [U.dremel1, U.dremel2],
  }),
  mechanicsProject({
    slug: 'glove',
    title: 'Glove',
    description: 'a glove made from cardboard and controlled with strings.',
    image: U.glove1,
    images: [U.glove1, U.glove2],
  }),
  mechanicsProject({
    slug: 'plane',
    title: 'Plane',
    description:
      'a small plane that was put together by cutting different parts from popsicle sticks, gluing it together, and then sanding it down before assembling it and painting it.',
    image: U.plane,
  }),
  mechanicsProject({
    slug: 'wrist-launcher',
    title: 'Wrist Launcher',
    description: 'my go at making my own spiderweb launcher. It worked pretty nicely.',
    image: U.wristLauncher1,
    images: [U.wristLauncher1, U.wristLauncher2],
  }),
  mechanicsProject({
    slug: 'wrist-web',
    title: 'Wrist Web',
    description:
      'A creative DIY project showcasing mechanical engineering and electronics work, featuring wrist web design and construction.',
    image: U.wristWeb,
  }),



  // Video cards (omit to hide). Uncomment and paste URLs when ready:
  // mechanicsProject({
  //   slug: 'gimbal',
  //   title: 'Gimbal',
  //   description:
  //     'a mini gimbal that I made completely from scratch with my own things. It is a 3D printed frame, controlled with 3 servo motors, an arduino as the brain, and an MPU-6050 acceleration/gyroscope sensor to get motion and provide stabalization. all the components are hand soldered onto solder board.',
  //   image: categoryImages.electronics,
  //   video: [
  //     'https://res.cloudinary.com/dhbn2shvj/video/upload/v1779250085/gimbal_fhm9yh.mp4',
  //   ],
  // }),
];
