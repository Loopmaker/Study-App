import {v4 as uuidv4} from "uuid"
import cat_sunshine from "../assets/videos/cat_sunshine.mp4"
import sunset_sunshine from "../assets/videos/sunset_sunshine.mp4"
import writing_snow from "../assets/videos/writing_snow.mp4"
import fireplace_snow from "../assets/videos/fireplace_snow.mp4"
import cozy_rain from "../assets/videos/cozy_rain.mp4"
import night_study_owl from "../assets/videos/night_study_owl.mp4"
import reading_owl from "../assets/videos/reading_owl.mp4"
import writing_rain from "../assets/videos/writing_rain.mp4"
import chilling_cat_owl from "../assets/videos/chilling_cat_owl.mp4"
import chilling_girl_owl from "../assets/videos/chilling_girl_owl.mp4"
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
    videos: [
      {
        src: cat_sunshine,
        thumbnail: cat_sunshine_thumbnail,
      },
      {
        src: sunset_sunshine,
        thumbnail: sunset_sunshine_thumbnail
      }
    ],
    icon: icon_sunshine,
  },
  {
    id: uuidv4(),
    category: "Snow",
    videos: [{src: writing_snow, thumbnail: writing_snow_thumbnail}, 
             {src:fireplace_snow, thumbnail:fireplace_snow_thumbnail}
            ],
    icon: icon_snow,
  },
   {
    id: uuidv4(),
    category: "Rain",
    videos: [{src: cozy_rain, thumbnail: cozy_rain_thumbnail}, {src: writing_rain, thumbnail: writing_rain_thumbnail}],
    icon: icon_rain,
  },
   {
    id: uuidv4(),
    category: "Night Owl",
    videos: [{src: night_study_owl, thumbnail: night_study_owl_thumbnail}, 
             {src: reading_owl, thumbnail: reading_owl_thumbnail}, 
             {src: chilling_cat_owl, thumbnail: chilling_cat_owl_thumbnail}, 
             {src: chilling_girl_owl, thumbnail: chilling_girl_owl_thumbnail}],
    icon: icon_night_owl
  },
] 


export default videoCategoryData;