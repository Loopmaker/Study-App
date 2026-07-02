import { useRef, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";
import type { Scene, SceneIncluded  } from "../hooks/useScenes";

interface Props {
  showScenes: boolean;
  setShowScenes: (show: boolean) => void;
  scenes: Scene[];
  onSave: (name: string, included: SceneIncluded) => void;
  onLoad: (scene: Scene) => void;
  onUpdate: (id: string, name: string, included: SceneIncluded) => void;
  onDelete: (id: string) => void;
  scenesButtonRef?: React.RefObject<HTMLButtonElement | null>;
}

const INCLUDED_LABELS: { key: keyof SceneIncluded; label: string }[] = [
  { key: "background", label: "Background" },
  { key: "music", label: "Music" },
  { key: "sfx", label: "Ambience" },
]

function ScenesPanel({
  showScenes,
  setShowScenes,
  scenes,
  onSave,
  onLoad,
  onUpdate,
  onDelete,
  scenesButtonRef,
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  useClickOutside(panelRef, setShowScenes, showScenes, scenesButtonRef ? [scenesButtonRef] : undefined);

  const [name, setName] = useState("");
  const [included, setIncluded] = useState<SceneIncluded>({
    background: true,
    music: true,
    sfx: true,
  });

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editIncluded, setEditIncluded] = useState<SceneIncluded>({
    background: true,
    music: true,
    sfx: true,
  });

  const toggleIncluded = (key: keyof SceneIncluded) => {
    setIncluded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleEditIncluded = (key: keyof SceneIncluded) => {
    setEditIncluded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onSave(trimmed, included);
    setName("");
    setIncluded({ background: true, music: true, sfx: true });
  };

  const handleEditOpen = (scene: Scene) => {
    setEditingId(scene.id);
    setEditName(scene.name);
    setEditIncluded(scene.included);
  };

  const handleEditSave = () => {
    if (!editingId) return;
    const trimmed = editName.trim();
    if (!trimmed) return;
    onUpdate(editingId, trimmed, editIncluded);
    setEditingId(null);
  };

  const handleEditCancel = () => {
    setEditingId(null);
  };

  const defaultScenes = scenes.filter((s) => s.isDefault);
  const userScenes = scenes.filter((s) => !s.isDefault);

  return (
    <div
      ref={panelRef}
      className={`custom-scrollbar w-full sm:w-88 sm:absolute sm:bottom-full sm:right-0 sm:mb-2 sm:rounded-2xl overflow-auto rounded-t-2xl border border-b-0 sm:border-b border-white/15 bg-black/70 shadow-2xl backdrop-blur-md transition-all duration-300 ${
        showScenes
          ? "max-h-[70vh] opacity-100 sm:translate-y-0"
          : "max-h-0 opacity-0 pointer-events-none sm:translate-y-2"
      }`}
    >
      <div className="p-4 text-white flex flex-col gap-4">

        <h2 className="text-xl sm:text-2xl font-semibold">Scenes</h2>

        {/* Save Form */}
        <div
          className="flex flex-col gap-3 p-3 rounded-xl border border-white/10 bg-white/5"
        >
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

          {/* Checkboxes */}
          <div className="flex flex-wrap gap-2">
            {INCLUDED_LABELS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => toggleIncluded(key)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer"
                style={{
                  backgroundColor: included[key] ? "rgba(52,211,153,0.15)" : "rgba(255,255,255,0.05)",
                  borderColor: included[key] ? "rgba(52,211,153,0.4)" : "rgba(255,255,255,0.15)",
                  color: included[key] ? "rgb(52,211,153)" : "rgba(255,255,255,0.4)",
                }}
              >
                <span>{included[key] ? "✓" : "+"}</span>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Default Scenes */}
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-widest text-white/30">Default</p>
          {defaultScenes.map((scene) => (
            <div
              key={scene.id}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 overflow-hidden"
            >
              {/* Thumbnail */}
              {scene.thumbnail && (
                <img
                  src={scene.thumbnail}
                  alt={scene.name}
                  className="w-16 h-12 object-cover shrink-0"
                />
              )}
              <span className="min-w-0 flex-1 truncate text-sm font-semibold text-white px-1">
                {scene.name}
              </span>
              <button
                onClick={() => onLoad(scene)}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80 transition hover:bg-white/10 mr-2 shrink-0"
              >
                Load
              </button>
            </div>
          ))}
        </div>

        {/* User Scenes */}
        {userScenes.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-widest text-white/30">Saved</p>
            {userScenes.map((scene) => (
              <div key={scene.id}>
                {editingId === scene.id ? (
                  // Edit Mode
                  <div className="flex flex-col gap-3 p-3 rounded-xl border border-emerald-300/30 bg-white/5">
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white outline-none focus:border-emerald-300/60"
                    />
                    {/* Edit Checkboxes */}
                    <div className="flex flex-wrap gap-2">
                      {INCLUDED_LABELS.map(({ key, label }) => (
                        <button
                          key={key}
                          onClick={() => toggleEditIncluded(key)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer"
                          style={{
                            backgroundColor: editIncluded[key] ? "rgba(52,211,153,0.15)" : "rgba(255,255,255,0.05)",
                            borderColor: editIncluded[key] ? "rgba(52,211,153,0.4)" : "rgba(255,255,255,0.15)",
                            color: editIncluded[key] ? "rgb(52,211,153)" : "rgba(255,255,255,0.4)",
                          }}
                        >
                          <span>{editIncluded[key] ? "✓" : "+"}</span>
                          {label}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleEditSave}
                        className="flex-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-black transition hover:scale-105"
                      >
                        Update
                      </button>
                      <button
                        onClick={handleEditCancel}
                        className="flex-1 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/60 transition hover:bg-white/10"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // Normal Mode
                  <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                    {scene.thumbnail && (
                      <img
                        src={scene.thumbnail}
                        alt={scene.name}
                        className="w-16 h-12 object-cover shrink-0"
                      />
                    )}
                    <div className="flex flex-col gap-1 flex-1 min-w-0 px-1 py-2">
                      <span className="text-sm font-semibold text-white truncate">
                        {scene.name}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onLoad(scene)}
                          className="rounded-full border border-white/15 bg-white/5 px-3 py-0.5 text-xs text-white/80 transition hover:bg-white/10"
                        >
                          Load
                        </button>
                        <button
                          onClick={() => handleEditOpen(scene)}
                          className="rounded-full border border-white/15 bg-white/5 px-3 py-0.5 text-xs text-white/80 transition hover:bg-white/10"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(scene.id)}
                          className="rounded-full border border-white/15 bg-white/5 px-3 py-0.5 text-xs text-red-300/80 transition hover:bg-white/10"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
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