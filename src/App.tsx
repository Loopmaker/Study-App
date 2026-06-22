import { useRef, useState } from "react"
import VideoPlayer from "./components/VideoPlayer"
import videoCategoryData from "./data/videoCategoryData"
import arrowDown from "./assets/icons/icon--arrow-down.png"
import shrink_icon from "./assets/icons/icon--shrink.png"
import expand_icon from "./assets/icons/icon--expand.png"
import musicIcon from "./assets/icons/icon--music.png"
import slidersIcon from "./assets/icons/icon--sliders.png"
import type { Song } from "./types/types"
import musicCategories from "./data/musicCategories"
import PlayerControls from "./components/PlayerControls"
import MusicPanel from "./components/MusicPanel"
import SfxControllPanel from "./components/SfxControllPanel"
import FocusTimer from "./components/FocusTimer"
import PresetsPanel from "./components/PresetsPanel"
import { usePresets, type Preset } from "./hooks/usePresets"

function App() {
  const [activeVideo, setActiveVideo] = useState<string | null>(
    videoCategoryData[0].videos[0].src
  );
  const getNextVideo = (): string | null => {
  const categoryVideos = videoCategoryData[activeVideoCategory].videos
  const currentIndex = categoryVideos.findIndex(v => v.src === activeVideo)
  const nextIndex = (currentIndex + 1) % categoryVideos.length
  return categoryVideos[nextIndex].src
}
  const fullscreenRef = useRef<HTMLElement>(null)
  const [isSceneControlVisible, setIsSceneControlVisible] = useState<boolean>(false);
  const [activeVideoCategory, setActiveVideoCategory] = useState<number>(0);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
 
  const [activeMusicCategory, setActiveMusicCategory] = useState<number>(0);
  const [currentTrack, setCurrentTrack] = useState<Song | null>(
    musicCategories[activeMusicCategory].music[0],
  );
  const [songIndex, setSongIndex] = useState<number>(0);
  const [showMusicPanel, setShowMusicPanel] = useState<boolean>(false);
  const [showSfxPanel, setShowSfxPanel] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [showTimer, setShowTimer] = useState<boolean>(false);
  const [showPresets, setShowPresets] = useState<boolean>(false);
  const [sfxVolumes, setSfxVolumes] = useState<Record<string, number>>({});
  const { presets, savePreset, deletePreset } = usePresets();

  const sceneControlVisibility = () => {
    setIsSceneControlVisible(!isSceneControlVisible)
  }
  const setSfxVolume = (id: string, value: number) => {
    setSfxVolumes((prev) => ({ ...prev, [id]: value }));
  };

  const handleSavePreset = (name: string) => {
    savePreset({ name, activeMusicCategory, songIndex, sfxVolumes });
  };

  const handleLoadPreset = (preset: Preset) => {
    setActiveMusicCategory(preset.activeMusicCategory);
    setSongIndex(preset.songIndex);
    setSfxVolumes(preset.sfxVolumes);
    setIsPlaying(true);
  };

  const toogleFullscreen = () => {
    if(!fullscreenRef.current) return;
    if(isFullScreen){
      document.exitFullscreen().catch((err) => {
        console.error("Error existing fullscreen", err)
      });
      setIsFullScreen(false);
    } else {
      fullscreenRef.current.requestFullscreen().catch((err) => {
        console.error("Error entering fullscreen:", err);
      });
      setIsFullScreen(true);
    }
  }

  return (
    <main className="relative h-screen bg-black overflow-hidden" ref={fullscreenRef}>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-10 h-32 bg-linear-to-b from-black/55 to-transparent" />
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-10 h-44 bg-linear-to-t from-black/75 via-black/35 to-transparent" />
      <button className="absolute top-4 sm:top-8 right-4 sm:right-8 z-50 flex items-center justify-center h-10 sm:h-12 aspect-46/48 bg-black/40 backdrop-blur-sm border border-white/20 rounded-md hover:scale-105 transition-transform ease-in-out duration-200" onClick={toogleFullscreen}>
      <img src={isFullScreen ? shrink_icon : expand_icon} alt="Fullscreen Toogle" className="invert h-[70%]"/>
      </button>

      <div className={`absolute top-4 left-1/2 w-fit max-w-130 min-w-67.5 flex flex-col gap-2 translate-x-[-50%] z-50 transition-all ease-in duration-300 ${isSceneControlVisible ? "translate-y-0" : "translate-y-[-80%]"}`}>

        <div className="flex items-center justify-center self-center gap-2 rounded-full border border-white/15 bg-black/55 px-3 py-2 shadow-lg backdrop-blur-md">
          {videoCategoryData.map((category, index: number) => {
            return <button key={category.id} className={`relative grid h-10 w-10 place-items-center rounded-full transition ${
            activeVideoCategory === index
              ? "bg-white/15 opacity-100"
              : "opacity-55 hover:bg-white/10 hover:opacity-90"
              }`} 
            onClick={() => {
              setActiveVideo(category.videos[0].src);
              setActiveVideoCategory(index);
            }}>
              <img src={category.icon} alt={category.category} className="h-6 w-6 invert"/>
              {activeVideoCategory === index && (
                <div className="absolute w-1 h-1 bg-emerald-400 rounded-full left-1/2 -translate-x-1/2 -bottom-1"></div>
              )}
            </button>
          })}
        </div>

        <div className="p-2 flex gap-2 flex-wrap justify-center bg-black/40 border border-white/20 rounded-lg shadow-sm">
         {videoCategoryData[activeVideoCategory].videos.map((video) => {
              return (
                <button
                  key={video.src}
                  className="aspect-video"
                  onClick={() => setActiveVideo(video.src)}
                >
                  <img
                    src={video.thumbnail}
                    className={`aspect-video w-30 rounded-md ${
                      activeVideo === video.src
                        ? "ring-2 ring-emerald-400 opacity-100"
                        : "opacity-90"
                    }`}
                  />
                </button>
              );
            })}
        </div>

        <button className="mt-4 flex items-center justify-center self-center w-fit rounded-full p-2" onClick={sceneControlVisibility}>
          <img 
            src={arrowDown} 
            className={`w-10 animate-bounce invert ${ isSceneControlVisible ? "rotate-180": "rotate-0" }`} 
            alt="Arrow Down"/>
        </button>
      </div>

      <MusicPanel
        showMusicPanel={showMusicPanel}
        activeMusicCategory={activeMusicCategory}
        setActiveMusicCategory={setActiveMusicCategory}
        songIndex={songIndex}
        setSongIndex={setSongIndex}
        setShowMusicPanel={setShowMusicPanel}
      />
      <SfxControllPanel
        showSfxPanel={showSfxPanel}
        setShowSfxPanel={setShowSfxPanel}
        sfxVolumes={sfxVolumes}
        onSfxVolumeChange={setSfxVolume}
      />

      <FocusTimer showTimer={showTimer} setShowTimer={setShowTimer} />

      <PresetsPanel
        showPresets={showPresets}
        setShowPresets={setShowPresets}
        presets={presets}
        onSave={handleSavePreset}
        onLoad={handleLoadPreset}
        onDelete={deletePreset}
      />

      <VideoPlayer video={activeVideo} nextVideo={getNextVideo()} />
      <footer className="fixed inset-x-3 bottom-3 z-50 sm:inset-x-6 sm:bottom-6">
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-3 rounded-2xl border border-white/15 bg-black/55 p-3 text-white shadow-2xl backdrop-blur-md md:grid-cols-[1fr_auto_1fr] md:gap-5 md:px-5">
            <div className="min-w-0 text-center md:text-left">
              <p className="flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45 md:justify-start">
                {hasError ? (
                  <span className="text-red-300/80">Playback error</span>
                ) : isLoading ? (
                  <>
                    <span className="h-2.5 w-2.5 animate-spin rounded-full border border-white/30 border-t-white/80" />
                    Loading…
                  </>
                ) : isPlaying ? (
                  <>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Now playing
                  </>
                ) : (
                  "Paused"
                )}
              </p>

              {hasError ? (
                <p className="truncate text-sm font-semibold text-red-300/90 sm:text-base">
                  Couldn't load this track
                </p>
              ) : currentTrack ? (
                <p className="truncate text-sm font-semibold text-white sm:text-base">
                  {currentTrack.title}
                </p>
              ) : (
                <p className="text-sm text-white/60">Choose a track</p>
              )}
            </div>

          <PlayerControls
            activeMusicCategory={activeMusicCategory}
            currentTrack={currentTrack}
            songIndex={songIndex}
            setSongIndex={setSongIndex}
            setCurrentTrack={setCurrentTrack}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            hasError={hasError}
            setHasError={setHasError}
          />

          <div className="flex items-center justify-center gap-2 md:justify-end">
            <button
              className={`grid h-11 w-11 place-items-center rounded-full border transition ${
                showMusicPanel
                  ? "border-emerald-300/70 bg-emerald-300/20"
                  : "border-white/15 bg-white/10 hover:bg-white/15"
              }`}
              onClick={() => {
                setShowMusicPanel(!showMusicPanel)
                setShowSfxPanel(false)
                setShowTimer(false)
                setShowPresets(false)
              }}
              aria-label="Open music panel"
            >
              <img src={musicIcon} alt="" className="h-6 w-6 invert" />
            </button>

            <button
              className={`grid h-11 w-11 place-items-center rounded-full border transition ${
                showSfxPanel
                  ? "border-emerald-300/70 bg-emerald-300/20"
                  : "border-white/15 bg-white/10 hover:bg-white/15"
              }`}
              onClick={() => {
                setShowSfxPanel(!showSfxPanel)
                setShowMusicPanel(false)
                setShowTimer(false)
                setShowPresets(false)
              }}
              aria-label="Open ambience mixer"
            >
              <img src={slidersIcon} alt="" className="h-6 w-6 invert" />
            </button>
            <button
              className={`grid h-11 w-11 place-items-center rounded-full border transition ${
                showTimer
                  ? "border-emerald-300/70 bg-emerald-300/20"
                  : "border-white/15 bg-white/10 hover:bg-white/15"
              }`}
              onClick={() => {
                setShowTimer(!showTimer)
                setShowMusicPanel(false)
                setShowSfxPanel(false)
                setShowPresets(false)
              }}
              aria-label="Open focus timer"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="13" r="8" />
                <path d="M12 9v4l2.5 2.5" />
                <path d="M9 2h6" />
              </svg>
            </button>
            <button
              className={`grid h-11 w-11 place-items-center rounded-full border transition ${
                showPresets
                  ? "border-emerald-300/70 bg-emerald-300/20"
                  : "border-white/15 bg-white/10 hover:bg-white/15"
              }`}
              onClick={() => {
                setShowPresets(!showPresets)
                setShowMusicPanel(false)
                setShowSfxPanel(false)
                setShowTimer(false)
              }}
              aria-label="Open presets"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
              </svg>
            </button>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default App
