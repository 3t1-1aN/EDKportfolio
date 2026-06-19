import type { Project } from '../data';
import { photographyProject } from './defaults';

function photo(
  slug: string,
  title: string,
  image: string,
  extra?: { date?: string; location?: string }
) {
  return photographyProject({
    slug,
    title,
    description: `Nature and wildlife photography: ${title}.`,
    image,
    ...extra,
  });
}

/**
 * One entry per photo (or multi-image card). Paste Cloudinary URLs into `image` / `images`.
 * Order in this array is display order (reorder freely).
 */
export const photographyProjects: Project[] = [
  photo('1000005108-1', '1000005108 (1)', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251038/1000005108_1_er6sxp.jpg'),
  photo('1000005110', '1000005110', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251038/1000005110_cwuvst.jpg'),
  photo('1000017799-3', '1000017799 (3)', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251049/1000017799_3_nyztfj.jpg'),
  photo('1000020066', '1000020066', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251040/1000020066_z3otfn.jpg'),
  photo('20241128-193204', '20241128 193204', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251035/20241128_193204_2_hosb0i.jpg'),
  photo('pxl-20230902-182719206', 'PXL 20230902 182719206', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251050/PXL_20230902_182719206.PORTRAIT_vnygls.jpg'),
  photo('pxl-20230902-220429424', 'PXL 20230902 220429424', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251044/PXL_20230902_220429424.PORTRAIT_fdcmxb.jpg'),
  photo('pxl-20231106-040355514', 'PXL 20231106 040355514', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251048/PXL_20231106_040355514.PORTRAIT_rdqfh2.jpg'),
  photo('pxl-20231207-023616269', 'PXL 20231207 023616269', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251043/PXL_20231207_023616269_tvgokr.jpg'),
  photo('pxl-20240218-165014538', 'PXL 20240218 165014538', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251052/PXL_20240218_165014538_mhrfhh.jpg'),
  photo('pxl-20240222-011722215', 'PXL 20240222 011722215', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251045/PXL_20240222_011722215_uqpybe.jpg'),
  photo('pxl-20240317-225900975', 'PXL 20240317 225900975', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251060/PXL_20240317_225900975.PORTRAIT_hmorg0.jpg'),
  photo('pxl-20240717-050309580', 'PXL 20240717 050309580', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251051/PXL_20240717_050309580.PORTRAIT_tznmq7.jpg'),
  photo('pxl-20240717-050441775', 'PXL 20240717 050441775', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251060/PXL_20240717_050441775.PORTRAIT_rgmmlh.jpg'),
  photo('pxl-20241129-172940135', 'PXL 20241129 172940135', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251053/PXL_20241129_172940135_2_zvi0p2.jpg'),
  photo('pxl-20241129-173705590', 'PXL 20241129 173705590', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251057/PXL_20241129_173705590_2_rtatlu.jpg'),
  photo('pxl-20241129-173912159', 'PXL 20241129 173912159', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251057/PXL_20241129_173912159_2_a1hpb0.jpg'),
  photo('pxl-20241129-191842536', 'PXL 20241129 191842536', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251067/PXL_20241129_191842536_2_oi5hvl.jpg'),
  photo('pxl-20241129-225844415', 'PXL 20241129 225844415', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251055/PXL_20241129_225844415_2_arktbd.jpg'),
  photo('pxl-20241130-060824018', 'PXL 20241130 060824018', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251060/PXL_20241130_060824018.NIGHT_xs7hxx.jpg'),
  photo('pxl-20241130-063024328', 'PXL 20241130 063024328', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251060/PXL_20241130_063024328.NIGHT_nmv40l.jpg'),
  photo('pxl-20241201-002312398', 'PXL 20241201 002312398', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251068/PXL_20241201_002312398_3_iolmqm.jpg'),
  photo('pxl-20241201-002423489', 'PXL 20241201 002423489', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251072/PXL_20241201_002423489_3_jnyttk.jpg'),
  photo('pxl-20241227-173238897', 'PXL 20241227 173238897', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251068/PXL_20241227_173238897_2_xyyy0r.jpg'),
  photo('pxl-20241227-173351187', 'PXL 20241227 173351187', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251074/PXL_20241227_173351187_2_iizkak.jpg'),
  photo('pxl-20241228-183645046', 'PXL 20241228 183645046', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251065/PXL_20241228_183645046_2_mpvz2g.jpg'),
  photo('pxl-20241228-184336226', 'PXL 20241228 184336226', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251070/PXL_20241228_184336226_3_hrxltl.jpg'),
  photo('pxl-20250704-021643270', 'PXL 20250704 021643270', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251080/PXL_20250704_021643270_fgv6kz.jpg'),
  photo('pxl-20250712-132324686', 'PXL 20250712 132324686', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251075/PXL_20250712_132324686_iajstx.jpg'),
  photo('pxl-20250712-132549104', 'PXL 20250712 132549104', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251080/PXL_20250712_132549104_tlai26.jpg'),
  photo('pxl-20250712-132716255', 'PXL 20250712 132716255', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251078/PXL_20250712_132716255.PORTRAIT_yqayv5.jpg'),
  photo('pxl-20250809-200417099', 'PXL 20250809 200417099', 'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779251080/PXL_20250809_200417099_2_mto7yz.jpg'),
];
