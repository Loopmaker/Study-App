import { useState } from "react";

export interface Preset {
  id: string;
  name: string;
  activeMusicCategory: number;
  songIndex: number;
  sfxVolumes: Record<string, number>;
}

const STORAGE_KEY = "drowse.presets";

function loadPresets(): Preset[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Preset[]) : [];
  } catch {
    return [];
  }
}

export function usePresets() {
  const [presets, setPresets] = useState<Preset[]>(loadPresets);

  const persist = (next: Preset[]) => {
    setPresets(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore quota / private-mode errors
    }
  };

  const savePreset = (preset: Omit<Preset, "id">) => {
    persist([...presets, { ...preset, id: crypto.randomUUID() }]);
  };

  const deletePreset = (id: string) => {
    persist(presets.filter((p) => p.id !== id));
  };

  return { presets, savePreset, deletePreset };
}