import { useRef, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";
import type { Preset } from "../hooks/usePresets";

interface Props {
  showPresets: boolean;
  setShowPresets: (show: boolean) => void;
  presets: Preset[];
  onSave: (name: string) => void;
  onLoad: (preset: Preset) => void;
  onDelete: (id: string) => void;
  presetsButtonRef?: React.RefObject<HTMLButtonElement | null>;
}

function PresetsPanel({
  showPresets,
  setShowPresets,
  presets,
  onSave,
  onLoad,
  onDelete,
  presetsButtonRef
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  useClickOutside(panelRef, setShowPresets, showPresets, presetsButtonRef ? [presetsButtonRef] : undefined);
  const [name, setName] = useState<string>("");

  const handleSave = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onSave(trimmed);
    setName("");
  };

  return (
    <div
      ref={panelRef}
      className={`w-full sm:w-80 sm:absolute sm:bottom-full sm:right-0 sm:mb-2 sm:rounded-2xl overflow-auto rounded-t-2xl border border-b-0 sm:border-b border-white/15 bg-black/70 shadow-2xl backdrop-blur-md transition-all duration-300 ${
        showPresets
          ? "max-h-[60vh] opacity-100 sm:translate-y-0"
          : "max-h-0 opacity-0 pointer-events-none sm:translate-y-2"
      }`}
    >

      <div className="p-4 text-white">
        <h2 className="text-xl sm:text-2xl font-semibold">Presets</h2>

        <div className="mt-3 flex items-center gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
            }}
            placeholder="Name this mix"
            className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white outline-none placeholder:text-white/40 focus:border-emerald-300/60"
          />
          <button
            onClick={handleSave}
            className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-black transition hover:scale-105 active:scale-95"
          >
            Save
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          {presets.length === 0 ? (
            <p className="py-6 text-center text-sm text-white/50">
              No preset saved yet
            </p>
          ) : (
            presets.map((preset) => (
              <div
                key={preset.id}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2"
              >
                <span className="min-w-0 flex-1 truncate text-sm font-semibold text-white">
                  {preset.name}
                </span>
                <button
                  onClick={() => onLoad(preset)}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80 transition hover:bg-white/10"
                >
                  Load
                </button>
                <button
                  onClick={() => onDelete(preset.id)}
                  aria-label={`Delete ${preset.name}`}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-red-300/80 transition hover:bg-white/10"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default PresetsPanel;