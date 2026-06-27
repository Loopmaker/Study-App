import { useRef, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";
import type { Scene } from "../hooks/useScenes";

interface Props {
  showScenes: boolean;
  setShowScenes: (show: boolean) => void;
  scenes: Scene[];
  onSave: (name: string) => void;
  onLoad: (scene: Scene) => void;
  onDelete: (id: string) => void;
  presetsButtonRef?: React.RefObject<HTMLButtonElement | null>;
}

function ScenesPanel({
  showScenes,
  setShowScenes,
  scenes,
  onSave,
  onLoad,
  onDelete,
  presetsButtonRef,
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  useClickOutside(panelRef, setShowScenes, showScenes, presetsButtonRef ? [presetsButtonRef] : undefined);
  const [name, setName] = useState("");

  const handleSave = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onSave(trimmed);
    setName("");
  };

  const userScenes = scenes.filter((s) => !s.isDefault);
  const defaultScenes = scenes.filter((s) => s.isDefault);

  return (
    <div
      ref={panelRef}
      className={`w-full sm:w-80 sm:absolute sm:bottom-full sm:right-0 sm:mb-2 sm:rounded-2xl overflow-auto rounded-t-2xl border border-b-0 sm:border-b border-white/15 bg-black/70 shadow-2xl backdrop-blur-md transition-all duration-300 ${
        showScenes
          ? "max-h-[60vh] opacity-100 sm:translate-y-0"
          : "max-h-0 opacity-0 pointer-events-none sm:translate-y-2"
      }`}
    >
      <div className="p-4 text-white flex flex-col gap-4">

        <h2 className="text-xl sm:text-2xl font-semibold">Scenes</h2>

        {/* Save current as scene */}
        <div className="flex items-center gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            placeholder="Name this scene..."
            className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white outline-none placeholder:text-white/40 focus:border-emerald-300/60"
          />
          <button
            onClick={handleSave}
            className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-black transition hover:scale-105 active:scale-95"
          >
            Save
          </button>
        </div>

        {/* Default Scenes */}
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-widest text-white/30">
            Default
          </p>
          {defaultScenes.map((scene) => (
            <div
              key={scene.id}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2"
            >
              <span className="min-w-0 flex-1 truncate text-sm font-semibold text-white">
                {scene.name}
              </span>
              <button
                onClick={() => onLoad(scene)}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80 transition hover:bg-white/10"
              >
                Load
              </button>
            </div>
          ))}
        </div>

        {/* User Scenes */}
        {userScenes.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-widest text-white/30">
              Saved
            </p>
            {userScenes.map((scene) => (
              <div
                key={scene.id}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2"
              >
                <span className="min-w-0 flex-1 truncate text-sm font-semibold text-white">
                  {scene.name}
                </span>
                <button
                  onClick={() => onLoad(scene)}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80 transition hover:bg-white/10"
                >
                  Load
                </button>
                <button
                  onClick={() => onDelete(scene.id)}
                  aria-label={`Delete ${scene.name}`}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-red-300/80 transition hover:bg-white/10"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {userScenes.length === 0 && (
          <p className="text-center text-xs text-white/30 py-2">
            No saved scenes yet.
          </p>
        )}

      </div>
    </div>
  );
}

export default ScenesPanel;