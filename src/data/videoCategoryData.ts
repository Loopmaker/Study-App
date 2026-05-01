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
import type { VideoCategory } from "../types/types"


const videoCategoryData: VideoCategory[] = [
  {
    id: uuidv4(),
    category: "Sunshine",
    videos: [cat_sunshine, sunset_sunshine],
    icon: icon_sunshine,
  },
  {
    id: uuidv4(),
    category: "Snow",
    videos: [writing_snow, fireplace_snow],
    icon: icon_snow,
  },
   {
    id: uuidv4(),
    category: "Rain",
    videos: [cozy_rain, writing_rain],
    icon: icon_rain,
  },
   {
    id: uuidv4(),
    category: "Night Owl",
    videos: [night_study_owl, reading_owl, chilling_cat_owl, chilling_girl_owl],
    icon: icon_night_owl
  },
] 


export default videoCategoryData;