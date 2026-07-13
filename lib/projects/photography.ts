import type { Project } from '../data';
import { photographyProject } from './defaults';

/**
 * One Cloudinary image URL per photo. Order in this array is display order
 * (reorder freely). To add a photo, just paste its URL into this list —
 * the slug/title are derived automatically and are not shown on the cards.
 */
const photoUrls: string[] = [
  'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251038/1000005108_1_er6sxp.jpg',
  'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251038/1000005110_cwuvst.jpg',
  'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251049/1000017799_3_nyztfj.jpg',
  'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251040/1000020066_z3otfn.jpg',
  'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251035/20241128_193204_2_hosb0i.jpg',
  'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251050/PXL_20230902_182719206.PORTRAIT_vnygls.jpg',
  'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251044/PXL_20230902_220429424.PORTRAIT_fdcmxb.jpg',
  'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251048/PXL_20231106_040355514.PORTRAIT_rdqfh2.jpg',
  'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251043/PXL_20231207_023616269_tvgokr.jpg',
  'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251052/PXL_20240218_165014538_mhrfhh.jpg',
  'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251045/PXL_20240222_011722215_uqpybe.jpg',
  'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251060/PXL_20240317_225900975.PORTRAIT_hmorg0.jpg',
  'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251051/PXL_20240717_050309580.PORTRAIT_tznmq7.jpg',
  'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251060/PXL_20240717_050441775.PORTRAIT_rgmmlh.jpg',
  'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251053/PXL_20241129_172940135_2_zvi0p2.jpg',
  'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251057/PXL_20241129_173705590_2_rtatlu.jpg',
  'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251057/PXL_20241129_173912159_2_a1hpb0.jpg',
  'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251067/PXL_20241129_191842536_2_oi5hvl.jpg',
  'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251055/PXL_20241129_225844415_2_arktbd.jpg',
  'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251060/PXL_20241130_060824018.NIGHT_xs7hxx.jpg',
  'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251060/PXL_20241130_063024328.NIGHT_nmv40l.jpg',
  'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251068/PXL_20241201_002312398_3_iolmqm.jpg',
  'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251072/PXL_20241201_002423489_3_jnyttk.jpg',
  'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251068/PXL_20241227_173238897_2_xyyy0r.jpg',
  'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251074/PXL_20241227_173351187_2_iizkak.jpg',
  'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251065/PXL_20241228_183645046_2_mpvz2g.jpg',
  'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251070/PXL_20241228_184336226_3_hrxltl.jpg',
  'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251080/PXL_20250704_021643270_fgv6kz.jpg',
  'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251075/PXL_20250712_132324686_iajstx.jpg',
  'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251080/PXL_20250712_132549104_tlai26.jpg',
  'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251078/PXL_20250712_132716255.PORTRAIT_yqayv5.jpg',
  'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251080/PXL_20250809_200417099_2_mto7yz.jpg',
  'https://res.cloudinary.com/dhbn2shvj/image/upload/v1783900896/20251018_161453_1_uainud.jpg',
  'https://res.cloudinary.com/dhbn2shvj/image/upload/v1783900903/a9159dc2-7e43-4d79-9102-3711d3d03320_wv4wfe.jpg',
  'https://res.cloudinary.com/dhbn2shvj/image/upload/v1783900906/1ab39789-3620-4a25-8a2e-5d4a141308e0_vvph5w.jpg',
];

/** Derive a stable, unique slug from the Cloudinary public ID in the URL. */
function slugFromUrl(url: string): string {
  const file = url.split('/').pop() ?? url;
  const withoutExt = file.replace(/\.[a-z0-9]+$/i, '');
  return withoutExt
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const photographyProjects: Project[] = photoUrls.map((image) =>
  photographyProject({
    slug: slugFromUrl(image),
    title: '',
    description: '',
    image,
  })
);
