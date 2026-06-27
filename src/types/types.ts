type Song = {
  id: string
  title: string
  artist: string
  src: string
}

type VideoItem = {
  src: string
  thumbnail: string
}

type VideoCategory = {
  id: string
  category: string
  videos: VideoItem[]
  icon: string
}

type SoundEffects = {
  id: string
  name: string
  src: string
}

type MusicCategory = {
  id: string
  category: string
  music: Song[]
  cover: string
}

type Task = {
  id: string
  text: string
  createdAt: number
}

type CompletedTask = {
  id: string
  text: string
  completedAt: number
}

export type { Song, VideoCategory, VideoItem, SoundEffects, MusicCategory, Task, CompletedTask }