import { useState } from "react";
import videoCategoryData from "../data/videoCategoryData";

export interface SceneIncluded {
  background: boolean;
  music: boolean;
  sfx: boolean;
}

export interface Scene {
  id: string;
  name: string;
  isDefault?: boolean;
  thumbnail?: string;
  included: SceneIncluded;
  // Video
  activeVideoCategory: number;
  activeVideo: string;
  // Music
  activeMusicCategory: number;
  songIndex: number;
  // SFX
  sfxVolumes: Record<string, number>;
}

const DEFAULT_SCENES: Scene[] = [
  {
    id: "default-deep-night",
    name: "Deep Night",
    isDefault: true,
    thumbnail: videoCategoryData[2].videos[0].thumbnail,
    included: { background: true, music: true, sfx: true},
    activeVideoCategory: 2,
    activeVideo: videoCategoryData[2].videos[0].src,
    activeMusicCategory: 1,
    songIndex: 0,
    sfxVolumes: { rain: 60, dry_thunder: 30 },
  },
  {
    id: "default-morning-focus",
    name: "Morning Focus",
    isDefault: true,
    thumbnail: videoCategoryData[0].videos[0].thumbnail,
    included: { background: true, music: true, sfx: true },
    activeVideoCategory: 0,
    activeVideo: videoCategoryData[0].videos[0].src,
    activeMusicCategory: 3,
    songIndex: 0,
    sfxVolumes: { forest: 50 },
  },
  {
    id: "default-cozy-corner",
    name: "Cozy Corner",
    isDefault: true,
    thumbnail: videoCategoryData[1].videos[0].thumbnail,
    included: { background: true, music: true, sfx: true },
    activeVideoCategory: 1,
    activeVideo: videoCategoryData[1].videos[0].src,
    activeMusicCategory: 4,
    songIndex: 0,
    sfxVolumes: { fire: 55 },
  },
];

const STORAGE_KEY = "drowse.scenes";

function loadScenes(): Scene[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const userScenes = raw ? (JSON.parse(raw) as Scene[]) : [];
    return [...DEFAULT_SCENES, ...userScenes];
  } catch {
    return [...DEFAULT_SCENES];
  }
}

export function useScenes() {
  const [scenes, setScenes] = useState<Scene[]>(loadScenes);

  const persist = (next: Scene[]) => {
    setScenes(next);
    try {
      const userScenes = next.filter((s) => !s.isDefault);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userScenes));
    } catch (error) {
    console.error("Failed to save scenes to localStorage:", error);
    }
  };

  const saveScene = (scene: Omit<Scene, "id" | "isDefault">) => {
    persist([...scenes, { ...scene, id: crypto.randomUUID(), isDefault: false }]);
  };

  const updateScene = (id: string, updated: Omit<Scene, "id" | "isDefault">) => {
    persist(scenes.map((s) => s.id === id ? { ...s, ...updated } : s));
  };

  const deleteScene = (id: string) => {
    persist(scenes.filter((s) => s.id !== id || !!s.isDefault));
  };

  return { scenes, saveScene, updateScene, deleteScene };
}