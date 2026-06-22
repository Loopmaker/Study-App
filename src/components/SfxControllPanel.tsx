import { useRef, useEffect } from "react"
import { Slider } from "@mui/material"
import sfxData from "../data/sfxData"
import SfxControl from "./SfxControl"
import useClickOutside from "../hooks/useClickOutside"
import { setMasterSfxVolume } from "../hooks/useAudioContext"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { useSwipeToDismiss } from "../hooks/useSwipeToDismiss"

interface Props {
  showSfxPanel: boolean
  setShowSfxPanel: (show: boolean) => void
  sfxVolumes: Record<string, number>
  onSfxVolumeChange: (id: string, value: number) => void
  sfxButtonRef?: React.RefObject<HTMLButtonElement | null>;
}

function SfxControllPanel({showSfxPanel, setShowSfxPanel, sfxVolumes, onSfxVolumeChange, sfxButtonRef}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  useClickOutside(panelRef, setShowSfxPanel, showSfxPanel, sfxButtonRef ? [sfxButtonRef] : undefined);
  const { elementRef: swipeRef } = useSwipeToDismiss({ onDismiss: () => setShowSfxPanel(false) });
  const [masterVolume, setMasterVolume] = useLocalStorage<number>("drowse.masterAmbience", 100);

  useEffect(() => {
    setMasterSfxVolume(masterVolume / 100);
  }, [masterVolume]);

  const handleMasterChange = (_: Event, newValue: number | number[]) => {
    setMasterVolume(newValue as number);
  };
  return (
    <div ref={panelRef} {...swipeRef} className={`custom-scrollbar w-full sm:w-107.5 sm:absolute sm:bottom-full sm:right-0 sm:mb-2 sm:rounded-2xl overflow-auto rounded-t-2xl border border-b-0 sm:border-b border-white/15 bg-black/70 shadow-2xl backdrop-blur-md transition-all duration-300 ${
      showSfxPanel
        ? "max-h-[60vh] opacity-100 sm:translate-y-0"
        : "max-h-0 opacity-0 pointer-events-none sm:translate-y-2"
    }`}>

      <div className="p-3">
        <h2 className="text-xl sm:text-2xl font-semibold text-white">
          Ambience
        </h2>

        <div className="mt-3 grid grid-cols-[90px_1fr] items-center gap-2 border-b border-white/10 pb-3 pr-3">
          <span className="text-sm text-white/60">Master</span>
          <Slider
            value={masterVolume}
            min={0}
            max={100}
            onChange={handleMasterChange}
            sx={{
              color: "#d6896d",
              height: 8,
              "& .MuiSlider-thumb": {
                width: 16,
                height: 16,
                "&:hover, &.Mui-active, &.Mui-focusVisible": {
                  boxShadow: "0 0 0 6px rgba(216, 137, 109, 0.2)",
                },
              },
            }}
          />
        </div>
        <div className="my-2 sm:my-4 flex flex-col sm:gap-2">
          {sfxData.map((sfx) =>{
            return <SfxControl
              key={sfx.id}
              sfx={sfx}
              volume={sfxVolumes[sfx.id] ?? 0}
              onVolumeChange={(value) => onSfxVolumeChange(sfx.id, value)}
            />
          })}
        </div>
      </div>
    </div>
  )
}

export default SfxControllPanel