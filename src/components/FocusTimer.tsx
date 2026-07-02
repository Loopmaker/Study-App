import { useRef, useState, useEffect, useCallback } from "react";
import useClickOutside from "../hooks/useClickOutside";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { Task, CompletedTask } from "../types/types";
import { cdnAudio } from "../config/cloudinary";

interface Props {
  showTimer: boolean;
  setShowTimer: (show: boolean) => void;
  timerButtonRef?: React.RefObject<HTMLButtonElement | null>;
}

type TimerMode = "pomodoro" | "deepwork" | "custom";
type TimerPhase = "work" | "break";

const PRESETS = {
  pomodoro: { workDuration: 25, breakDuration: 5, sessions: 4 },
  deepwork: { workDuration: 90, breakDuration: 20, sessions: 2 },
  custom: { workDuration: 25, breakDuration: 5, sessions: 4 },
};

const ALARM_SOUNDS: { label: string; src: string }[] = [
  { label: "Bell", src: cdnAudio("bell_bxxakh") },
  { label: "Chime", src: cdnAudio("chime_wbckcc") },
  { label: "Beep", src: cdnAudio("beep_znspxk") },
];

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function FocusTimer({ showTimer, setShowTimer, timerButtonRef }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  useClickOutside(
    panelRef,
    setShowTimer,
    showTimer,
    timerButtonRef ? [timerButtonRef] : undefined,
  );

  // Tasks
  const [tasks, setTasks] = useLocalStorage<Task[]>("drowse.tasks", []);
  const [completed, setCompleted] = useLocalStorage<CompletedTask[]>(
    "drowse.completed",
    [],
  );
  const [taskInput, setTaskInput] = useState("");
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  // Timer
  const [mode, setMode] = useState<TimerMode>("pomodoro");
  const [phase, setPhase] = useState<TimerPhase>("work");
  const [secondsLeft, setSecondsLeft] = useState(
    PRESETS.pomodoro.workDuration * 60,
  );
  const [isRunning, setIsRunning] = useState(false);
  const [currentSession, setCurrentSession] = useState(1);
  const [sessions, setSessions] = useState(PRESETS.pomodoro.sessions);
  const [alarmIndex, setAlarmIndex] = useState(0);
  const [alarmRinging, setAlarmRinging] = useState(false);

  // Custom inputs
  const [customWork, setCustomWork] = useState("25");
  const [customBreak, setCustomBreak] = useState("5");
  const [customSessions, setCustomSessions] = useState("4");

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const alarmRef = useRef<HTMLAudioElement | null>(null);

  const activeTask = tasks.find((t) => t.id === activeTaskId) ?? null;

  // Tasks logic
  const addTask = () => {
    const trimmed = taskInput.trim();
    if (!trimmed) return;
    const newTask: Task = {
      id: crypto.randomUUID(),
      text: trimmed,
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
    setTaskInput("");
  };

  const handleSelectTask = (id: string) => {
    setActiveTaskId(activeTaskId === id ? null : id);
  };

  const completeTask = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    setCompleted((prev) => [
      {
        id: task.id,
        text: task.text,
        completedAt: Date.now(),
      },
      ...prev,
    ]);
    setTasks((prev) => prev.filter((t) => t.id !== id));
    if (activeTaskId === id) setActiveTaskId(null);
  };

  const clearHistory = () => setCompleted([]);

  // Timer logic
  const triggerAlarm = useCallback(() => {
    if (alarmRef.current) return;

    setIsRunning(false);
    setAlarmRinging(true);

    const audio = new Audio(ALARM_SOUNDS[alarmIndex].src);
    audio.loop = true;
    audio.play().catch(() => {});

    alarmRef.current = audio;
  }, [alarmIndex]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            triggerAlarm();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current!);
    }
    return () => clearInterval(intervalRef.current!);
  }, [isRunning, triggerAlarm]);

  const handleModeChange = (newMode: TimerMode) => {
    setMode(newMode);
    setIsRunning(false);
    setPhase("work");
    setCurrentSession(1);
    clearInterval(intervalRef.current!);
    alarmRef.current?.pause();
    alarmRef.current = null;
    setAlarmRinging(false);

    if (newMode === "custom") {
      const work = parseInt(customWork) || 1;
      setSessions(parseInt(customSessions) || 1);
      setSecondsLeft(work * 60);
    } else {
      setSessions(PRESETS[newMode].sessions);
      setSecondsLeft(PRESETS[newMode].workDuration * 60);
    }
  };

  const applyCustom = () => {
    const work = parseInt(customWork) || 1;
    const sessions = parseInt(customSessions) || 1;
    setSessions(sessions);
    setSecondsLeft(work * 60);
    setPhase("work");
    setCurrentSession(1);
    setIsRunning(false);
  };

  const advanceSession = () => {
    const workSecs =
      (mode === "custom"
        ? parseInt(customWork) || 1
        : PRESETS[mode].workDuration) * 60;
    const breakSecs =
      (mode === "custom"
        ? parseInt(customBreak) || 1
        : PRESETS[mode].breakDuration) * 60;

    if (phase === "work") {
      if (currentSession >= sessions) {
        setCurrentSession(1);
        setPhase("work");
        setSecondsLeft(workSecs);
      } else {
        setPhase("break");
        setSecondsLeft(breakSecs);
      }
    } else {
      setCurrentSession((prev) => prev + 1);
      setPhase("work");
      setSecondsLeft(workSecs);
    }
  };

  const stopAlarm = () => {
    if (alarmRef.current) {
      alarmRef.current.loop = false;
      alarmRef.current.pause();
      alarmRef.current.currentTime = 0;
      alarmRef.current.src = "";
      alarmRef.current.load();
      alarmRef.current = null;
    }
    setAlarmRinging(false);
    advanceSession();
  };

  const handleReset = () => {
    clearInterval(intervalRef.current!);
    if (alarmRef.current) {
      alarmRef.current.loop = false;
      alarmRef.current.pause();
      alarmRef.current.currentTime = 0;
      alarmRef.current.src = "";
      alarmRef.current.load();
      alarmRef.current = null;
    }
    setAlarmRinging(false);
    setIsRunning(false);
    setPhase("work");
    setCurrentSession(1);
    const workSecs =
      (mode === "custom"
        ? parseInt(customWork) || 1
        : PRESETS[mode].workDuration) * 60;
    setSecondsLeft(workSecs);
  };

  useEffect(() => {
    return () => {
      alarmRef.current?.pause();
      alarmRef.current = null;
    };
  }, []);

  return (
    <div
      ref={panelRef}
      className={`custom-scrollbar w-full sm:w-96 sm:absolute sm:bottom-full sm:right-0 sm:mb-2 sm:rounded-2xl overflow-auto rounded-t-2xl border border-b-0 sm:border-b border-white/15 bg-black/70 shadow-2xl backdrop-blur-md transition-all duration-300 ${
        showTimer
          ? "max-h-[60vh] sm:max-h-[80vh] opacity-100 sm:translate-y-0"
          : "max-h-0 opacity-0 pointer-events-none sm:translate-y-2"
      }`}
    >
      <div className="p-3 sm:p-4 text-white flex flex-col gap-2 sm:gap-4">
        {/* Mode Selector */}
        <div className="relative flex gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
          {/* Sliding pill */}
          <div
            className="absolute top-1 bottom-1 rounded-lg bg-white/15 transition-all duration-300 ease-out"
            style={{
              width: `calc(${100 / 3}% - 4px)`,
              left: `calc(${["pomodoro", "deepwork", "custom"].indexOf(mode) * (100 / 3)}% + 2px)`,
            }}
          />
          {(["pomodoro", "deepwork", "custom"] as TimerMode[]).map((m) => (
            <button
              key={m}
              onClick={() => handleModeChange(m)}
              className="relative z-10 flex-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer"
              style={{
                color: mode === m ? "#fff" : "rgba(255,255,255,0.45)",
              }}
            >
              {m === "deepwork"
                ? "Deep Work"
                : m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>

        {/* Custom Settings */}
        <div
          className={`grid transition-all duration-300 ease-out ${
            mode === "custom"
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 flex-wrap">
              {[
                { label: "Work", value: customWork, set: setCustomWork },
                { label: "Break", value: customBreak, set: setCustomBreak },
                {
                  label: "Sessions",
                  value: customSessions,
                  set: setCustomSessions,
                },
              ].map(({ label, value, set }) => (
                <div key={label} className="flex items-center gap-1.5 flex-1">
                  <span className="text-xs text-white/50 shrink-0">
                    {label}
                  </span>
                  <input
                    type="number"
                    min={1}
                    value={value}
                    onChange={(e) => set(e.target.value)}
                    onFocus={(e) => e.target.select()}
                    onBlur={(e) => {
                      const num = parseInt(e.target.value);
                      if (!num || num < 1) set("1");
                    }}
                    className="w-12 px-2 py-1 rounded-lg text-xs text-center outline-none bg-white/10 border border-white/15 text-white"
                  />
                </div>
              ))}
              <button
                onClick={applyCustom}
                className="w-full py-1.5 rounded-lg text-xs font-semibold text-white cursor-pointer bg-white/15 hover:bg-white/20 transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Phase + Session */}
        <p className="text-xs text-center uppercase tracking-widest text-white/40 my-0">
          {phase === "work" ? "Focus" : "Break"} · Session {currentSession} of{" "}
          {sessions}
        </p>

        {/* Timer Display */}
        <div
          className="text-center text-5xl sm:text-7xl font-bold leading-none"
          style={{
            fontFamily: "var(--font-mono, 'Courier New', monospace)",
            color: alarmRinging ? "#fc8181" : "#fff",
            letterSpacing: "-2px",
          }}
        >
          {formatTime(secondsLeft)}
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          {alarmRinging ? (
            <button
              onClick={stopAlarm}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold cursor-pointer bg-red-400/80 hover:bg-red-400 transition-colors text-white"
            >
              Stop Alarm
            </button>
          ) : (
            <button
              onClick={() => setIsRunning((prev) => !prev)}
              className="flex-1 py-2 sm:py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-colors text-white"
              style={{
                backgroundColor: isRunning
                  ? "rgba(255,255,255,0.15)"
                  : "rgba(52,211,153,0.9)",
              }}
            >
              {isRunning ? "Pause" : "Start"}
            </button>
          )}
          <button
            onClick={handleReset}
            className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-sm font-medium cursor-pointer border border-white/15 bg-white/5 hover:bg-white/10 transition-colors text-white/70"
          >
            Reset
          </button>
        </div>

        {/* Alarm Sound */}
        <div className="flex items-center gap-2">
          <p className="text-xs text-white/40 shrink-0">Alarm</p>
          <div className="flex gap-1 flex-1">
            {ALARM_SOUNDS.map((sound, i) => (
              <button
                key={sound.label}
                onClick={() => setAlarmIndex(i)}
                className="flex-1 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors border border-white/15"
                style={{
                  backgroundColor:
                    alarmIndex === i ? "rgba(255,255,255,0.15)" : "transparent",
                  color: alarmIndex === i ? "#fff" : "rgba(255,255,255,0.45)",
                }}
              >
                {sound.label}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Active Task Display */}
        <div
          className="px-3 py-2.5 rounded-xl text-sm border"
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            borderColor: activeTask
              ? "rgba(52,211,153,0.5)"
              : "rgba(255,255,255,0.1)",
            color: activeTask ? "rgb(52,211,153)" : "rgba(255,255,255,0.35)",
          }}
        >
          {activeTask ? `↳ ${activeTask.text}` : "No task selected"}
        </div>

        {/* Task Input */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
          <input
            type="text"
            placeholder="Add a task..."
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            className="flex-1 text-sm outline-none bg-transparent text-white placeholder:text-white/30"
          />
          <button
            onClick={addTask}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white cursor-pointer bg-emerald-400/80 hover:bg-emerald-400 transition-colors"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <div className="flex flex-col gap-2">
          {tasks.length === 0 && (
            <p className="text-xs text-center py-4 text-white/30">
              No tasks yet.
            </p>
          )}
          {tasks.map((task) => {
            const isActive = task.id === activeTaskId;
            return (
              <div
                key={task.id}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all"
                style={{
                  borderColor: isActive
                    ? "rgba(52,211,153,0.5)"
                    : "rgba(255,255,255,0.1)",
                  backgroundColor: isActive
                    ? "rgba(52,211,153,0.08)"
                    : "rgba(255,255,255,0.03)",
                }}
              >
                {/* Complete button */}
                <button
                  onClick={() => completeTask(task.id)}
                  className="w-4 h-4 rounded-full border-2 shrink-0 cursor-pointer hover:bg-emerald-400/20 transition-colors"
                  style={{ borderColor: "rgb(52,211,153)" }}
                  title="Mark complete"
                />
                {/* Task text */}
                <span
                  onClick={() => handleSelectTask(task.id)}
                  className="text-sm flex-1 cursor-pointer select-none"
                  style={{
                    color: isActive
                      ? "rgb(52,211,153)"
                      : "rgba(255,255,255,0.8)",
                  }}
                >
                  {task.text}
                </span>
                {isActive && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-400/20 text-emerald-300 shrink-0">
                    active
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* History */}
        {completed.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowHistory((prev) => !prev)}
                className="text-xs text-white/40 hover:text-white/60 transition-colors cursor-pointer"
              >
                {showHistory ? "Hide" : "Show"} completed · {completed.length}
              </button>
              {showHistory && (
                <button
                  onClick={clearHistory}
                  className="text-xs text-white/30 hover:text-white/50 transition-colors cursor-pointer hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>

            {showHistory && (
              <div className="flex flex-col gap-2">
                {completed.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl border border-white/10 bg-white/3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full shrink-0 bg-emerald-400/60 flex items-center justify-center">
                        <svg
                          width="8"
                          height="8"
                          viewBox="0 0 10 10"
                          fill="none"
                        >
                          <path
                            d="M2 5L4 7L8 3"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="text-xs line-through text-white/30">
                        {task.text}
                      </span>
                    </div>
                    <span className="text-xs text-white/25 shrink-0 ml-3">
                      {formatDate(task.completedAt)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default FocusTimer;
