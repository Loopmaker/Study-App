import { useEffect } from "react";


const useClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  setState: (value: boolean) => void,
  enabled: boolean,
) => {

  useEffect(() => {
    if(!enabled) return;

    const handlePointerDown = (event: PointerEvent) => {
      if(ref.current && !ref.current.contains(event.target as Node)){
        setState(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => { document.removeEventListener("pointerdown", handlePointerDown); };
  }, [ref, setState, enabled])
};

export default useClickOutside;