import type { SoundEffects } from "../types/types"
import dry_thunder from "../assets/sfx/dry_thunder.mp3"
import fire from "../assets/sfx/fire.mp3"
import forest from "../assets/sfx/forest.mp3"
import people from "../assets/sfx/people.mp3"
import rain_nature from "../assets/sfx/rain_nature.mp3"
import rain_storm from "../assets/sfx/rain_storm.mp3"
import rain from "../assets/sfx/rain.mp3"
import traffic from "../assets/sfx/traffic.mp3"
import water_stream from "../assets/sfx/water_stream.mp3"
import waterfall from "../assets/sfx/waterfall.mp3"
import wind from "../assets/sfx/wind.mp3"

const sfxData: SoundEffects[] = [
  {
    id: "dry_thunder",
    name: "Dry Thunder",
    src: dry_thunder,
  },
  {
    id: "fire",
    name: "Fire",
    src: fire,
  },
  {
    id: "forest",
    name: "Forest",
    src: forest,
  },
  {
    id: "people",
    name: "People",
    src: people,
  },
  {
    id: "rain_nature",
    name: "Rain Nature",
    src: rain_nature,
  },
  {
    id: "rain_storm",
    name: "Rain Storm",
    src: rain_storm,
  },
  {
    id: "rain",
    name: "Rain",
    src: rain,
  },
  {
    id: "traffic",
    name: "Traffic",
    src: traffic,
  },
  {
    id: "water_stream",
    name: "Water Stream",
    src: water_stream,
  },
  {
    id: "waterfall",
    name: "Waterfall",
    src: waterfall,
  },
  {
    id: "wind",
    name: "Wind",
    src: wind,
  },
]

export default sfxData;