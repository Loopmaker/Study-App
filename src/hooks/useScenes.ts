import { useState } from "react";

export interface Scene {
  id: string;
  name: string;
  isDefault?: boolean;
  // Video
  activeVideoCategory: number;
  activeVideo: string;
  // Music
  activeMusicCategory: number;
  songIndex: number;
  // SFX
  sfxVolumes: Record<string, number>;
  // Timer
  timerMode: "pomodoro" | "deepwork" | "custom";
  customWork: string;
  customBreak: string;
  customSessions: string;
}

import videoCategoryData from "../data/videoCategoryData";

const DEFAULT_SCENES: Scene[] = [
  {
    id: "default-deep-night",
    name: "Deep Night",
    isDefault: true,
    activeVideoCategory: 2, // Rain
    activeVideo: videoCategoryData[2].videos[0].src,
    activeMusicCategory: 1, // Lo-fi
    songIndex: 0,
    sfxVolumes: { rain: 60, dry_thunder: 30 },
    timerMode: "deepwork",
    customWork: "90",
    customBreak: "20",
    customSessions: "2",
  },
  {
    id: "default-morning-focus",
    name: "Morning Focus",
    isDefault: true,
    activeVideoCategory: 0, // Sunshine
    activeVideo: videoCategoryData[0].videos[0].src,
    activeMusicCategory: 3, // Nature
    songIndex: 0,
    sfxVolumes: { forest: 50 },
    timerMode: "pomodoro",
    customWork: "25",
    customBreak: "5",
    customSessions: "4",
  },
  {
    id: "default-cozy-corner",
    name: "Cozy Corner",
    isDefault: true,
    activeVideoCategory: 1, // Snow
    activeVideo: videoCategoryData[1].videos[0].src,
    activeMusicCategory: 4, // Sleep
    songIndex: 0,
    sfxVolumes: { fire: 55 },
    timerMode: "pomodoro",
    customWork: "25",
    customBreak: "5",
    customSessions: "4",
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
      // only persist user scenes, not defaults
      const userScenes = next.filter((s) => !s.isDefault);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userScenes));
    } catch {
      // ignore quota / private-mode errors
    }
  };

  const saveScene = (scene: Omit<Scene, "id" | "isDefault">) => {
    persist([...scenes, { ...scene, id: crypto.randomUUID(), isDefault: false }]);
  };

  const deleteScene = (id: string) => {
    // prevent deleting default scenes
    persist(scenes.filter((s) => s.id !== id || s.isDefault));
  };

  return { scenes, saveScene, deleteScene };
}