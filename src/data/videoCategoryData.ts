import { v4 as uuidv4 } from "uuid"
import { cdnImage, cdnVideo } from "../config/cloudinary"

import icon_sunshine from "../assets/icons/icon--sunshine.png"
import icon_snow from "../assets/icons/icon--snow.png"
import icon_rain from "../assets/icons/icon--rain.png"
import icon_night_owl from "../assets/icons/icon--moon.png"


import type { VideoCategory } from "../types/types"


const videoCategoryData: VideoCategory[] = [
  {
    id: uuidv4(),
    category: "Sunshine",
    icon: icon_sunshine,
    videos: [
      { src: cdnVideo("cat_sunshine_joo8ky"),    thumbnail: cdnImage("cat_sunshine_eff5uf.png") },
      { src: cdnVideo("sunset_sunshine_lu56p6"), thumbnail: cdnImage("sunset_sunshine_gbbrsj.png") },
    ],
  },
  {
    id: uuidv4(),
    category: "Snow",
    icon: icon_snow,
    videos: [
      { src: cdnVideo("writing_snow_gx3kli"),   thumbnail: cdnImage("writing_snow_lnmzpz.png") },
      { src: cdnVideo("fireplace_snow_utavkw"), thumbnail: cdnImage("fireplace_snow_iai4rr.png") },
    ],
  },
  {
    id: uuidv4(),
    category: "Rain",
    icon: icon_rain,
    videos: [
      { src: cdnVideo("cozy_rain_widqg0"),    thumbnail: cdnImage("cozy_rain_ug292a.png") },
      { src: cdnVideo("writing_rain_qggdcz"), thumbnail: cdnImage("writing_rain_gnl4pr.png") },
    ],
  },
  {
    id: uuidv4(),
    category: "Night Owl",
    icon: icon_night_owl,
    videos: [
      { src: cdnVideo("night_study_owl_wk70ti"),   thumbnail: cdnImage("night_study_owl_wzoqez.png") },
      { src: cdnVideo("reading_owl_cdlpb4"),       thumbnail: cdnImage("reading_owl_uomabq.png") },
      { src: cdnVideo("chilling_cat_owl_khybf5"),  thumbnail: cdnImage("chilling_cat_owl_bfjqso.png") },
      { src: cdnVideo("chilling_girl_owl_el2evy"), thumbnail: cdnImage("chilling_girl_owl_eboqeb.png") },
    ],
  },
]

export default videoCategoryData