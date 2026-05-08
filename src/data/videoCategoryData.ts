import { v4 as uuidv4 } from "uuid"
import { cdnVideo } from "../config/cloudinary"

import icon_sunshine from "../assets/icons/icon--sunshine.png"
import icon_snow from "../assets/icons/icon--snow.png"
import icon_rain from "../assets/icons/icon--rain.png"
import icon_night_owl from "../assets/icons/icon--moon.png"

import cat_sunshine_thumbnail from "../assets/thumbnail/cat_sunshine.png"
import chilling_cat_owl_thumbnail from "../assets/thumbnail/chilling_cat_owl.png"
import chilling_girl_owl_thumbnail from "../assets/thumbnail/chilling_girl_owl.png"
import cozy_rain_thumbnail from "../assets/thumbnail/cozy_rain.png"
import fireplace_snow_thumbnail from "../assets/thumbnail/fireplace_snow.png"
import night_study_owl_thumbnail from "../assets/thumbnail/night_study_owl.png"
import reading_owl_thumbnail from "../assets/thumbnail/reading_owl.png"
import sunset_sunshine_thumbnail from "../assets/thumbnail/sunset_sunshine.png"
import writing_rain_thumbnail from "../assets/thumbnail/writing_rain.png"
import writing_snow_thumbnail from "../assets/thumbnail/writing_snow.png"

import type { VideoCategory } from "../types/types"


const videoCategoryData: VideoCategory[] = [
  {
    id: uuidv4(),
    category: "Sunshine",
    icon: icon_sunshine,
    videos: [
      { src: cdnVideo("cat_sunshine_joo8ky"),    thumbnail: cat_sunshine_thumbnail },
      { src: cdnVideo("sunset_sunshine_lu56p6"), thumbnail: sunset_sunshine_thumbnail },
    ],
  },
  {
    id: uuidv4(),
    category: "Snow",
    icon: icon_snow,
    videos: [
      { src: cdnVideo("writing_snow_gx3kli"),   thumbnail: writing_snow_thumbnail },
      { src: cdnVideo("fireplace_snow_utavkw"), thumbnail: fireplace_snow_thumbnail },
    ],
  },
  {
    id: uuidv4(),
    category: "Rain",
    icon: icon_rain,
    videos: [
      { src: cdnVideo("cozy_rain_widqg0"),    thumbnail: cozy_rain_thumbnail },
      { src: cdnVideo("writing_rain_qggdcz"), thumbnail: writing_rain_thumbnail },
    ],
  },
  {
    id: uuidv4(),
    category: "Night Owl",
    icon: icon_night_owl,
    videos: [
      { src: cdnVideo("night_study_owl_wk70ti"),   thumbnail: night_study_owl_thumbnail },
      { src: cdnVideo("reading_owl_cdlpb4"),       thumbnail: reading_owl_thumbnail },
      { src: cdnVideo("chilling_cat_owl_khybf5"),  thumbnail: chilling_cat_owl_thumbnail },
      { src: cdnVideo("chilling_girl_owl_el2evy"), thumbnail: chilling_girl_owl_thumbnail },
    ],
  },
]

export default videoCategoryData