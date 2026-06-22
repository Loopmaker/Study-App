import { useCallback, useEffect, useRef, useState } from "react";

export type TimerStatus = "idle" | "running" | "paused" | "finished";

export function useTimer(initialMinutes: number, onComplete?: () => void) {
  const [duration, setDuration] = useState<number>(initialMinutes * 60);
  const [remaining, setRemaining] = useState<number>(initialMinutes * 60);
  const [status, setStatus] = useState<TimerStatus>("idle");

  const intervalRef = useRef<number | null>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const clear = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const start = useCallback(() => {
    clear();
    setStatus("running");
    setRemaining((prev) => (prev <= 0 ? duration : prev));
    intervalRef.current = window.setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clear();
          setStatus("finished");
          onCompleteRef.current?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [duration]);

  const pause = useCallback(() => {
    clear();
    setStatus("paused");
  }, []);

  const reset = useCallback(() => {
    clear();
    setRemaining(duration);
    setStatus("idle");
  }, [duration]);

  const setMinutes = useCallback((minutes: number) => {
    clear();
    const secs = Math.max(1, Math.round(minutes * 60));
    setDuration(secs);
    setRemaining(secs);
    setStatus("idle");
  }, []);

  useEffect(() => clear, []);

  return { duration, remaining, status, start, pause, reset, setMinutes };
}