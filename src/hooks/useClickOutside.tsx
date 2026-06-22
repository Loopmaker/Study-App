import { useEffect } from "react";

const useClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  setState: (value: boolean) => void,
  enabled: boolean,
  ignoreRefs?: React.RefObject<HTMLElement | null>[],
) => {
  useEffect(() => {
    if (!enabled) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (ref.current && ref.current.contains(event.target as Node)) {
        return;
      }

      if (ignoreRefs) {
        for (const ignoreRef of ignoreRefs) {
          if (ignoreRef.current && ignoreRef.current.contains(event.target as Node)) {
            return;
          }
        }
      }

      setState(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [ref, setState, enabled, ignoreRefs]);
};

export default useClickOutside;