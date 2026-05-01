import { v4 as uuidv4 } from "uuid";
import type { MusicCategory } from "../types/types";
import lofi_background_music from "../assets/music/lofi_background_music.mp3";
import lofi_girl from "../assets/music/lofi_girl.mp3";
import lofi_girl_hiphop from "../assets/music/lofi_girl_hiphop.mp3";
import lofi_calm_beat from "../assets/music/lofi_calm_beat.mp3";
import lofi_study_calm from "../assets/music/lofi_study_calm.mp3";
import sleepy_rain from "../assets/music/sleepy_rain.mp3";
import silent_calm_piano from "../assets/music/silent_calm_piano.mp3";
import violin_sad from "../assets/music/violin_sad.mp3";
import nature_notes from "../assets/music/nature_notes.mp3";
import nature_calls from "../assets/music/nature_calls.mp3";
import nature_documentary from "../assets/music/nature_documentary.mp3";
import nature_dreamscape from "../assets/music/nature_dreamscape.mp3";
import nature_melody from "../assets/music/nature_melody.mp3";
import relaxing_piano_ambient from "../assets/music/relaxing_piano_ambient.mp3";
import meditative_rain_ambience from "../assets/music/meditative_rain_ambience.mp3";
import documentary_nature_ambient from "../assets/music/documentary_nature_ambient.mp3";
import flute_rain_ambiance from "../assets/music/flute_rain_ambiance.mp3";
import inspiring_violin_background_music from "../assets/music/inspiring_violin_background_music.mp3";

import cover_microphone from "../assets/covers/cover--microphone.jpg";
import cover__fish from "../assets/covers/cover--fish.jpg";
import cover__lofi from "../assets/covers/cover--lofi.jpg";
import cover__sleep from "../assets/covers/cover--sleep.jpg";
import cover__ambient from "../assets/covers/cover--ambient.jpg";

const musicCategories: MusicCategory[] = [
  {
    id: uuidv4(),
    category: "All Music",
    music: [
      {
        id: uuidv4(),
        title: "Lo-fi Background Music",
        artist: "Various Artists",
        src: lofi_background_music,
      },
      {
        id: uuidv4(),
        title: "Lo-fi Girl",
        artist: "Various Artists",
        src: lofi_girl,
      },
      {
        id: uuidv4(),
        title: "Lo-fi Girl Hip Hop",
        artist: "Various Artists",
        src: lofi_girl_hiphop,
      },
      {
        id: uuidv4(),
        title: "Lo-fi Calm Beat",
        artist: "Various Artists",
        src: lofi_calm_beat,
      },
      {
        id: uuidv4(),
        title: "Lo-fi Study Calm",
        artist: "Various Artists",
        src: lofi_study_calm,
      },
      {
        id: uuidv4(),
        title: "Relaxing Piano Ambient",
        artist: "Various Artists",
        src: relaxing_piano_ambient,
      },
      {
        id: uuidv4(),
        title: "Meditative Rain Ambience",
        artist: "Various Artists",
        src: meditative_rain_ambience,
      },
      {
        id: uuidv4(),
        title: "Documentary Nature Ambient",
        artist: "Various Artists",
        src: documentary_nature_ambient,
      },
      {
        id: uuidv4(),
        title: "Flute Rain Ambiance",
        artist: "Various Artists",
        src: flute_rain_ambiance,
      },
      {
        id: uuidv4(),
        title: "Nature Notes",
        artist: "Various Artists",
        src: nature_notes,
      },
      {
        id: uuidv4(),
        title: "Nature Calls",
        artist: "Various Artists",
        src: nature_calls,
      },
      {
        id: uuidv4(),
        title: "Nature Documentary",
        artist: "Various Artists",
        src: nature_documentary,
      },
      {
        id: uuidv4(),
        title: "Nature Dreamscape",
        artist: "Various Artists",
        src: nature_dreamscape,
      },
      {
        id: uuidv4(),
        title: "Nature Melody",
        artist: "Various Artists",
        src: nature_melody,
      },
      {
        id: uuidv4(),
        title: "Sleepy Rain",
        artist: "Various Artists",
        src: sleepy_rain,
      },
      {
        id: uuidv4(),
        title: "Silent Calm Piano",
        artist: "Various Artists",
        src: silent_calm_piano,
      },
      {
        id: uuidv4(),
        title: "Violin Sad",
        artist: "Various Artists",
        src: violin_sad,
      },
      {
        id: uuidv4(),
        title: "Inspiring Violin Background Music",
        artist: "Various Artists",
        src: inspiring_violin_background_music,
      },
    ],
    cover: cover_microphone,
  },
  {
    id: uuidv4(),
    category: "Lo-fi",
    music: [
      {
        id: uuidv4(),
        title: "Lo-fi Background Music",
        artist: "Various Artists",
        src: lofi_background_music,
      },
      {
        id: uuidv4(),
        title: "Lo-fi Girl",
        artist: "Various Artists",
        src: lofi_girl,
      },
      {
        id: uuidv4(),
        title: "Lo-fi Girl Hip Hop",
        artist: "Various Artists",
        src: lofi_girl_hiphop,
      },
      {
        id: uuidv4(),
        title: "Lo-fi Calm Beat",
        artist: "Various Artists",
        src: lofi_calm_beat,
      },
      {
        id: uuidv4(),
        title: "Lo-fi Study Calm",
        artist: "Various Artists",
        src: lofi_study_calm,
      },
    ],
    cover: cover__lofi,
  },
  {
    id: uuidv4(),
    category: "Ambient",
    music: [
      {
        id: uuidv4(),
        title: "Relaxing Piano Ambient",
        artist: "Various Artists",
        src: relaxing_piano_ambient,
      },
      {
        id: uuidv4(),
        title: "Meditative Rain Ambience",
        artist: "Various Artists",
        src: meditative_rain_ambience,
      },
      {
        id: uuidv4(),
        title: "Documentary Nature Ambient",
        artist: "Various Artists",
        src: documentary_nature_ambient,
      },
      {
        id: uuidv4(),
        title: "Flute Rain Ambiance",
        artist: "Various Artists",
        src: flute_rain_ambiance,
      },
    ],
    cover: cover__ambient,
  },
  {
    id: uuidv4(),
    category: "Nature",
    music: [
      {
        id: uuidv4(),
        title: "Nature Notes",
        artist: "Various Artists",
        src: nature_notes,
      },
      {
        id: uuidv4(),
        title: "Nature Calls",
        artist: "Various Artists",
        src: nature_calls,
      },
      {
        id: uuidv4(),
        title: "Nature Documentary",
        artist: "Various Artists",
        src: nature_documentary,
      },
      {
        id: uuidv4(),
        title: "Nature Dreamscape",
        artist: "Various Artists",
        src: nature_dreamscape,
      },
      {
        id: uuidv4(),
        title: "Nature Melody",
        artist: "Various Artists",
        src: nature_melody,
      },
    ],
    cover: cover__fish,
  },
  {
    id: uuidv4(),
    category: "Sleep",
    music: [
      {
        id: uuidv4(),
        title: "Sleepy Rain",
        artist: "Various Artists",
        src: sleepy_rain,
      },
      {
        id: uuidv4(),
        title: "Silent Calm Piano",
        artist: "Various Artists",
        src: silent_calm_piano,
      },
      {
        id: uuidv4(),
        title: "Violin Sad",
        artist: "Various Artists",
        src: violin_sad,
      },

      {
        id: uuidv4(),
        title: "Inspiring Violin Background Music",
        artist: "Various Artists",
        src: inspiring_violin_background_music,
      },
    ],
    cover: cover__sleep,
  },
];

export default musicCategories;