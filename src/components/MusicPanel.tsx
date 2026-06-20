import { useRef } from "react"
import musicCategories from "../data/musicCategories"
import useClickOutside from "../hooks/useClickOutside"

interface Props {
  showMusicPanel: boolean
  activeMusicCategory: number
  setActiveMusicCategory: (category: number) => void
  songIndex: number
  setSongIndex: (index: number) => void
  setShowMusicPanel: (show: boolean) => void
}
function MusicPanel({
  showMusicPanel,
  activeMusicCategory,
  setActiveMusicCategory,
  setShowMusicPanel,
  songIndex,
  setSongIndex
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  useClickOutside(panelRef, setShowMusicPanel, showMusicPanel)

  return (
    <div ref={panelRef} className={`custom-scrollbar fixed inset-x-3 bottom-24 z-50 max-h-[68vh] overflow-auto rounded-2xl border border-white/15 bg-black/70 shadow-2xl backdrop-blur-md transition-all duration-300 sm:inset-x-auto sm:right-6 sm:bottom-28 sm:w-107.5 ${
      showMusicPanel
        ? "translate-y-0 opacity-100"
        : "translate-y-6 opacity-0 pointer-events-none"
    }`}>

      <div className="p-3 grid grid-cols-2 gap-2 overflow-y-auto text-white">
        {musicCategories.map((category, index: number) => {
          return <button key={category.id} className={`p-1 flex items-center gap-2 rounded-md ${activeMusicCategory === index ? "opacity-100 bg-white/15 ring-1 ring-white/30" : "opacity-80"}`} onClick={() => {setActiveMusicCategory(index); setSongIndex(0)}}>
            <img src={category.cover} alt={category.category} className="sm:w-17.5 w-11 h-11 rounded-md object-cover"/>
            <h2 className="font-semibold text-base sm:text-lg">{category.category}</h2>
          </button>
        })}
      </div>

      <div className="border-t-2 border-white/20">
        {activeMusicCategory !== null && (
          <div className="p-3 flex flex-col gap-2">
            {musicCategories[activeMusicCategory].music.map((song) => {
              return (
              <button 
                key={song.id}
                className={`px-1 py-2 w-full flex items-center gap-2 rounded-md ${songIndex === musicCategories[activeMusicCategory].music.findIndex(s => s.id === song.id) ? " bg-white/15 ring-1 text-white ring-white/30" : "opacity-80 text-white/80"}`}
                onClick={() => setSongIndex(musicCategories[activeMusicCategory].music.findIndex(s => s.id === song.id)
                )}
              >
                <span className="font-semibold text-sm sm:text-base">{song.title}</span>
              </button>
              )
            })}
          </div>
          )}
      </div>
    </div>
  )
}

export default MusicPanel