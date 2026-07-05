import type { SketchPlacement } from './types';

/** Random viewport zones — kept away from center content column */
export const sketchPlacements: SketchPlacement[] = [
  { top: '6%', left: '1%', width: 'min(38vw, 320px)', height: 'min(34vw, 280px)' },
  { top: '8%', right: '0%', width: 'min(36vw, 300px)', height: 'min(32vw, 260px)' },
  { top: '22%', left: '3%', width: 'min(34vw, 290px)', height: 'min(30vw, 250px)' },
  { top: '18%', right: '2%', width: 'min(40vw, 340px)', height: 'min(36vw, 300px)' },
  { top: '38%', left: '0%', width: 'min(32vw, 270px)', height: 'min(28vw, 230px)' },
  { top: '42%', right: '1%', width: 'min(36vw, 310px)', height: 'min(32vw, 270px)' },
  { bottom: '18%', left: '2%', width: 'min(38vw, 320px)', height: 'min(34vw, 280px)' },
  { bottom: '14%', right: '0%', width: 'min(34vw, 290px)', height: 'min(30vw, 250px)' },
  { bottom: '28%', left: '5%', width: 'min(30vw, 260px)', height: 'min(26vw, 220px)' },
  { bottom: '24%', right: '4%', width: 'min(38vw, 320px)', height: 'min(34vw, 280px)' },
  { top: '52%', left: '50%', width: 'min(32vw, 280px)', height: 'min(28vw, 240px)', centered: true },
  { top: '12%', left: '50%', width: 'min(30vw, 260px)', height: 'min(26vw, 220px)', centered: true },
];
