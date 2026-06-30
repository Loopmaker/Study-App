import { useRef, useState } from "react"
import musicCategories from "../data/musicCategories"
import useClickOutside from "../hooks/useClickOutside"
import { useSwipeToDismiss } from "../hooks/useSwipeToDismiss"

interface Props {
  showMusicPanel: boolean
  activeMusicCategory: number
  setActiveMusicCategory: (category: number) => void
  setSongIndex: (index: number) => void
  setShowMusicPanel: (show: boolean) => void
  musicButtonRef?: React.RefObject<HTMLButtonElement | null>
  currentTrackSrc?: string | null
}

function MusicPanel({
  showMusicPanel,
  activeMusicCategory,
  setActiveMusicCategory,
  setShowMusicPanel,
  setSongIndex,
  musicButtonRef,
  currentTrackSrc,
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  useClickOutside(panelRef, setShowMusicPanel, showMusicPanel, musicButtonRef ? [musicButtonRef] : undefined);
  const { elementRef: swipeRef } = useSwipeToDismiss({ onDismiss: () => setShowMusicPanel(false) });

  const [browsingCategory, setBrowsingCategory] = useState(activeMusicCategory);

  const selectSong = (songId: string) => {
    const newIndex = musicCategories[browsingCategory].music.findIndex(s => s.id === songId);
    setActiveMusicCategory(browsingCategory);
    setSongIndex(newIndex);
  };

  return (
    <div ref={panelRef} {...swipeRef} className={`custom-scrollbar w-full sm:w-107.5 sm:absolute sm:bottom-full sm:right-0 sm:mb-2 sm:rounded-2xl overflow-auto rounded-t-2xl border border-b-0 sm:border-b border-white/15 bg-black/70 shadow-2xl backdrop-blur-md transition-all duration-300 ${
      showMusicPanel
        ? "max-h-[60vh] opacity-100 sm:translate-y-0"
        : "max-h-0 opacity-0 pointer-events-none sm:translate-y-2"
    }`}>

      <div className="p-3 grid grid-cols-2 gap-2 overflow-y-auto text-white pb-6">
        {musicCategories.map((category, index: number) => {
          return <button key={category.id} className={`p-1 flex items-center gap-2 rounded-md ${browsingCategory === index ? "opacity-100 bg-white/15 ring-1 ring-white/30" : "opacity-80"}`} onClick={() => setBrowsingCategory(index)}>
            <img src={category.cover} alt={category.category} className="sm:w-17.5 w-11 h-11 rounded-md object-cover"/>
            <h2 className="font-semibold text-base sm:text-lg">{category.category}</h2>
          </button>
        })}
      </div>

      <div className="border-t-2 border-white/20">
        {browsingCategory !== null && (
          <div className="p-3 flex flex-col gap-2">
            {musicCategories[browsingCategory].music.map((song) => {
              const isCurrentlyPlaying = currentTrackSrc === song.src;
              return (
              <button 
                key={song.id}
                className={`px-1 py-2 w-full flex items-center gap-2 rounded-md ${isCurrentlyPlaying ? " bg-white/15 ring-1 text-white ring-white/30" : "opacity-80 text-white/80"}`}
                onClick={() => selectSong(song.id)}
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