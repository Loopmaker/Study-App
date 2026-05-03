import { useRef } from "react"
import sfxData from "../data/sfxData"
import SfxControl from "./SfxControl"
import useClickOutside from "../hooks/useClickOutside"

interface Props{
  showSfxPanel: boolean
  setShowSfxPanel: (show: boolean) => void
}

function SfxControllPanel({showSfxPanel, setShowSfxPanel}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  useClickOutside(panelRef, setShowSfxPanel, showSfxPanel);
  return (
    <div ref={panelRef} className={`custom-scrollbar w-75 sm:w-107.5 h-130 bg-black/40 absolute z-50 top-1/2 right-18 sm:right-24 transform -translate-y-1/2 transition-all duration-300 rounded-lg border border-white/40 shadow-sm overflow-hidden ${showSfxPanel ? "translate-x-0" : "translate-x-[135%]"}`}>
      <div className="p-3">
        <h2 className="text-xl sm:text-2xl font-semibold text-white">
          SFX Controls
        </h2>
        <div className="my-2 sm:my-4 flex flex-col sm:gap-2">
          {sfxData.map((sfx) =>{
            return <SfxControl key={sfx.id} sfx={sfx}/>
          })}
        </div>
      </div>
    </div>
  )
}

export default SfxControllPanel