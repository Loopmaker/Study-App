import music_icon from "../assets/icons/icon--music.png"
import sliders_icon from "../assets/icons/icon--sliders.png"

interface Props{
  setShowMusicPanel: (show: boolean) => void
  showMusicPanel: boolean
  setShowSfxPanel: (show: boolean) => void
  showSfxPanel: boolean
}

function SelectorBtn({
  setShowMusicPanel,
  showMusicPanel,
  setShowSfxPanel,
  showSfxPanel
}: Props) {

  return (
    <div className="absolute z-30 right-4 sm:right-8 top-1/2 translate-y-[-50%]" onPointerDown={(e) => {e.stopPropagation();}}>
      <button className="mb-4 h-10 sm:h-12 aspect-48/48 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform ease-in-out duration-200" onClick={() => { setShowMusicPanel(!showMusicPanel); setShowSfxPanel(false); }}>
        <img src={music_icon} alt="Music" className="w-10 invert"/>
      </button>
      <button className="mb-4 h-10 sm:h-12 aspect-48/48 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform ease-in-out duration-200" onClick={() => { setShowSfxPanel(!showSfxPanel); setShowMusicPanel(false); }}>
        <img src={sliders_icon} alt="Sliders" className="w-10 invert"/>
      </button>
    </div>
  )
}

export default SelectorBtn