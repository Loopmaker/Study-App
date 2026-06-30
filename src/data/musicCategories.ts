import { v4 as uuidv4 } from "uuid";
import type { MusicCategory } from "../types/types";

import cover_microphone from "../assets/covers/cover--microphone.jpg";
import cover__fish from "../assets/covers/cover--fish.jpg";
import cover__lofi from "../assets/covers/cover--lofi.jpg";
import cover__sleep from "../assets/covers/cover--sleep.jpg";
import cover__ambient from "../assets/covers/cover--ambient.jpg";
import cover__jazz from "../assets/covers/cover--jazz.jpg";
import { cdnAudio } from "../config/cloudinary";


const audio = {
  lofi_background_music:             cdnAudio("lofi_background_music_snwxkq"),
  lofi_girl:                         cdnAudio("lofi_girl_lxgjsy"),
  lofi_girl_hiphop:                  cdnAudio("lofi_girl_hiphop_edvaad"),
  lofi_calm_beat:                    cdnAudio("lofi_calm_beat_pet07g"),
  lofi_study_calm:                   cdnAudio("lofi_study_calm_sgcgs1"),
  sleepy_rain:                       cdnAudio("sleepy_rain_xss0lk"),
  silent_calm_piano:                 cdnAudio("silent_calm_piano_j5nlsf"),
  violin_sad:                        cdnAudio("violin_sad_wxsqvp"),
  nature_notes:                      cdnAudio("nature_notes_lsgq4z"),
  nature_calls:                      cdnAudio("nature_calls_nuhje1"),
  nature_documentary:                cdnAudio("nature_documentary_zise4p"),
  nature_dreamscape:                 cdnAudio("nature_dreamscape_hx76fe"),
  nature_melody:                     cdnAudio("nature_melody_nltyz1"),
  relaxing_piano_ambient:            cdnAudio("relaxing_piano_ambient_vxefiz"),
  meditative_rain_ambience:          cdnAudio("meditative_rain_ambience_zgdzum"),
  documentary_nature_ambient:        cdnAudio("documentary_nature_ambient_derfdp"),
  flute_rain_ambiance:               cdnAudio("flute_rain_ambiance_o4qry5"),
  inspiring_violin_background_music: cdnAudio("inspiring_violin_background_music_rraiqr"),
  modern_jazz_2:                     cdnAudio("modern-jazz-2_wgnwdj"),
  modern_jazz:                       cdnAudio("modern-jazz_dwqwxt"),
  lofi_jazz:                         cdnAudio("lofi-jazz_kg3omw"),
  traditional_jazz:                  cdnAudio("traditional-jazz_z9l5wa"),
  smooth_jazz:                       cdnAudio("smooth-jazz_kchhhm"),
}

const musicCategories: MusicCategory[] = [
  {
    id: uuidv4(),
    category: "All Music",
    cover: cover_microphone,
    music: [
      { id: uuidv4(), title: "Lo-fi Background Music",            artist: "Various Artists", src: audio.lofi_background_music },
      { id: uuidv4(), title: "Lo-fi Girl",                        artist: "Various Artists", src: audio.lofi_girl },
      { id: uuidv4(), title: "Lo-fi Girl Hip Hop",                artist: "Various Artists", src: audio.lofi_girl_hiphop },
      { id: uuidv4(), title: "Lo-fi Calm Beat",                   artist: "Various Artists", src: audio.lofi_calm_beat },
      { id: uuidv4(), title: "Lo-fi Study Calm",                  artist: "Various Artists", src: audio.lofi_study_calm },
      { id: uuidv4(), title: "Relaxing Piano Ambient",            artist: "Various Artists", src: audio.relaxing_piano_ambient },
      { id: uuidv4(), title: "Meditative Rain Ambience",          artist: "Various Artists", src: audio.meditative_rain_ambience },
      { id: uuidv4(), title: "Documentary Nature Ambient",        artist: "Various Artists", src: audio.documentary_nature_ambient },
      { id: uuidv4(), title: "Flute Rain Ambiance",               artist: "Various Artists", src: audio.flute_rain_ambiance },
      { id: uuidv4(), title: "Nature Notes",                      artist: "Various Artists", src: audio.nature_notes },
      { id: uuidv4(), title: "Nature Calls",                      artist: "Various Artists", src: audio.nature_calls },
      { id: uuidv4(), title: "Nature Documentary",                artist: "Various Artists", src: audio.nature_documentary },
      { id: uuidv4(), title: "Nature Dreamscape",                 artist: "Various Artists", src: audio.nature_dreamscape },
      { id: uuidv4(), title: "Nature Melody",                     artist: "Various Artists", src: audio.nature_melody },
      { id: uuidv4(), title: "Sleepy Rain",                       artist: "Various Artists", src: audio.sleepy_rain },
      { id: uuidv4(), title: "Silent Calm Piano",                 artist: "Various Artists", src: audio.silent_calm_piano },
      { id: uuidv4(), title: "Violin Sad",                        artist: "Various Artists", src: audio.violin_sad },
      { id: uuidv4(), title: "Inspiring Violin Background Music", artist: "Various Artists", src: audio.inspiring_violin_background_music },
      { id: uuidv4(), title: "Modern Jazz",      artist: "Various Artists", src: audio.modern_jazz },
      { id: uuidv4(), title: "Modern Jazz II",   artist: "Various Artists", src: audio.modern_jazz_2 },
      { id: uuidv4(), title: "Lo-fi Jazz",       artist: "Various Artists", src: audio.lofi_jazz },
      { id: uuidv4(), title: "Traditional Jazz", artist: "Various Artists", src: audio.traditional_jazz },
      { id: uuidv4(), title: "Smooth Jazz",      artist: "Various Artists", src: audio.smooth_jazz },
    ],
  },
  {
    id: uuidv4(),
    category: "Lo-fi",
    cover: cover__lofi,
    music: [
      { id: uuidv4(), title: "Lo-fi Background Music", artist: "Various Artists", src: audio.lofi_background_music },
      { id: uuidv4(), title: "Lo-fi Girl",              artist: "Various Artists", src: audio.lofi_girl },
      { id: uuidv4(), title: "Lo-fi Girl Hip Hop",      artist: "Various Artists", src: audio.lofi_girl_hiphop },
      { id: uuidv4(), title: "Lo-fi Calm Beat",         artist: "Various Artists", src: audio.lofi_calm_beat },
      { id: uuidv4(), title: "Lo-fi Study Calm",        artist: "Various Artists", src: audio.lofi_study_calm },
    ],
  },
  {
    id: uuidv4(),
    category: "Ambient",
    cover: cover__ambient,
    music: [
      { id: uuidv4(), title: "Relaxing Piano Ambient",     artist: "Various Artists", src: audio.relaxing_piano_ambient },
      { id: uuidv4(), title: "Meditative Rain Ambience",   artist: "Various Artists", src: audio.meditative_rain_ambience },
      { id: uuidv4(), title: "Documentary Nature Ambient", artist: "Various Artists", src: audio.documentary_nature_ambient },
      { id: uuidv4(), title: "Flute Rain Ambiance",        artist: "Various Artists", src: audio.flute_rain_ambiance },
    ],
  },
  {
    id: uuidv4(),
    category: "Nature",
    cover: cover__fish,
    music: [
      { id: uuidv4(), title: "Nature Notes",       artist: "Various Artists", src: audio.nature_notes },
      { id: uuidv4(), title: "Nature Calls",       artist: "Various Artists", src: audio.nature_calls },
      { id: uuidv4(), title: "Nature Documentary", artist: "Various Artists", src: audio.nature_documentary },
      { id: uuidv4(), title: "Nature Dreamscape",  artist: "Various Artists", src: audio.nature_dreamscape },
      { id: uuidv4(), title: "Nature Melody",      artist: "Various Artists", src: audio.nature_melody },
    ],
  },
  {
    id: uuidv4(),
    category: "Sleep",
    cover: cover__sleep,
    music: [
      { id: uuidv4(), title: "Sleepy Rain",                       artist: "Various Artists", src: audio.sleepy_rain },
      { id: uuidv4(), title: "Silent Calm Piano",                 artist: "Various Artists", src: audio.silent_calm_piano },
      { id: uuidv4(), title: "Violin Sad",                        artist: "Various Artists", src: audio.violin_sad },
      { id: uuidv4(), title: "Inspiring Violin Background Music", artist: "Various Artists", src: audio.inspiring_violin_background_music },
    ],
  },
  {
  id: uuidv4(),
  category: "Jazz",
  cover: cover__jazz,
  music: [
    { id: uuidv4(), title: "Modern Jazz",      artist: "Various Artists", src: audio.modern_jazz },
    { id: uuidv4(), title: "Modern Jazz II",   artist: "Various Artists", src: audio.modern_jazz_2 },
    { id: uuidv4(), title: "Lo-fi Jazz",       artist: "Various Artists", src: audio.lofi_jazz },
    { id: uuidv4(), title: "Traditional Jazz", artist: "Various Artists", src: audio.traditional_jazz },
    { id: uuidv4(), title: "Smooth Jazz",      artist: "Various Artists", src: audio.smooth_jazz },
  ],
},
];


export default musicCategories;