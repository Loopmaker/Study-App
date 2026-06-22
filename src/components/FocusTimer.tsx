import { useRef, useState } from "react";
import { useTimer } from "../hooks/useTimer";
import { playChime } from "../hooks/useAudioContext";
import useClickOutside from "../hooks/useClickOutside";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface Props {
  showTimer: boolean;
  setShowTimer: (show: boolean) => void;
  timerButtonRef?: React.RefObject<HTMLButtonElement | null>;
}

const PRESETS = [
  { id: "pomodoro", label: "Pomodoro", minutes: 25 },
  { id: "deep", label: "Deep Work", minutes: 50 },
];

function format(total: number): string {
  const m = Math.floor(total / 60).toString().padStart(2, "0");
  const s = Math.floor(total % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function FocusTimer({ showTimer, setShowTimer, timerButtonRef }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  useClickOutside(panelRef, setShowTimer, showTimer, timerButtonRef ? [timerButtonRef] : undefined);
  
  const [preferredMinutes, setPreferredMinutes] = useLocalStorage<number>(
    "drowse.timerMinutes",
    25,
  );
  const { duration, remaining, status, start, pause, reset, setMinutes } =
  useTimer(preferredMinutes, playChime);
  const [activePreset, setActivePreset] = useState<string>(
  preferredMinutes === 25
    ? "pomodoro"
    : preferredMinutes === 50
      ? "deep"
      : "custom",
);
const [custom, setCustom] = useState<string>("");

  const progress = duration > 0 ? ((duration - remaining) / duration) * 100 : 0;
  const isRunning = status === "running";

  const choosePreset = (id: string, minutes: number) => {
    setActivePreset(id);
    setPreferredMinutes(minutes);
    setMinutes(minutes);
  };

  const applyCustom = () => {
    const mins = parseInt(custom, 10);
    if (!Number.isNaN(mins) && mins > 0) {
      setActivePreset("custom");
      setPreferredMinutes(mins);
      setMinutes(mins);
    }
  };

  return (
    <div
      ref={panelRef}
      className={`custom-scrollbar fixed inset-x-3 bottom-24 z-50 max-h-[68vh] overflow-auto rounded-2xl border border-white/15 bg-black/70 shadow-2xl backdrop-blur-md transition-all duration-300 sm:inset-x-auto sm:right-6 sm:bottom-28 sm:w-107.5 ${
        showTimer
          ? "translate-y-0 opacity-100"
          : "translate-y-6 opacity-0 pointer-events-none"
      }`}
    >
      {/* Drag handle - visible only on mobile */}
      <div className="flex justify-center pt-3 pb-1 sm:hidden">
        <div className="w-12 h-1.5 bg-white/30 rounded-full" />
      </div>
      <div className="p-4 text-white">
        <h2 className="text-xl sm:text-2xl font-semibold">Focus</h2>

        <div className="mt-3 flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => choosePreset(p.id, p.minutes)}
              className={`rounded-full border px-3 py-1.5 text-sm transition ${
                activePreset === p.id
                  ? "border-emerald-300/70 bg-emerald-300/20 text-white"
                  : "border-white/15 bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              {p.label} · {p.minutes}m
            </button>
          ))}
          <div className="flex items-center gap-1">
            <input
              type="number"
              min={1}
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="min"
              className="w-16 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white outline-none placeholder:text-white/40 focus:border-emerald-300/60"
            />
            <button
              onClick={applyCustom}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white/70 transition hover:bg-white/10"
            >
              Set
            </button>
          </div>
        </div>

        <div className="mt-5 text-center">
          <p className="font-mono text-5xl font-semibold tabular-nums tracking-tight sm:text-6xl">
            {format(remaining)}
          </p>
          {status === "finished" && (
            <p className="mt-2 text-sm text-emerald-300">
              Session complete — nice rhythm.
            </p>
          )}
        </div>

        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-emerald-300/80 transition-all duration-300 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            onClick={isRunning ? pause : start}
            className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black transition hover:scale-105 active:scale-95"
          >
            {isRunning ? "Pause" : status === "paused" ? "Resume" : "Start"}
          </button>
          <button
            onClick={reset}
            className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white/80 transition hover:bg-white/10"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default FocusTimer;