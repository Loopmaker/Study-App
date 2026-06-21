import type { Song } from "../types/types"
import prev from "../assets/icons/icon--next.png"
import play from "../assets/icons/icon--play.png"
import pause from "../assets/icons/icon--pause.png"
import next from "../assets/icons/icon--next.png"
import { useEffect, useRef, useState } from "react"
import musicCategories from "../data/musicCategories"
import VolumeControl from "./VolumeControl"

interface Props {
  activeMusicCategory: number
  currentTrack: Song | null
  songIndex: number
  setSongIndex: React.Dispatch<React.SetStateAction<number>>
  setCurrentTrack: React.Dispatch<React.SetStateAction<Song | null>>
  isPlaying: boolean
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  hasError: boolean
  setHasError: React.Dispatch<React.SetStateAction<boolean>>
}

function PlayerControls({
  activeMusicCategory,
  currentTrack,
  songIndex,
  setSongIndex,
  setCurrentTrack,
  isPlaying,
  setIsPlaying,
  isLoading,
  setIsLoading,
  hasError,
  setHasError
}: Props){
  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState<number>(20);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    setCurrentTrack(musicCategories[activeMusicCategory].music[songIndex]);
  }, [songIndex, activeMusicCategory]);

  const nextSong = () => {
    setSongIndex((prevIndex) => {
      const nextIndex = prevIndex < musicCategories[activeMusicCategory].music.length - 1 ? prevIndex + 1 : 0;
      return nextIndex;
    });
    setIsPlaying(true);
  }

  useEffect(()=> {
    if(!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume / 100;
  }, [volume, isMuted])

   const prevSong = () => {
    setSongIndex((prevIndex) => prevIndex > 0 ? prevIndex - 1 : musicCategories[activeMusicCategory].music.length - 1)
  }

  useEffect(() => {
    const audio = audioRef.current;
    if(!audio) return;
    const handleEnded = () => {
      nextSong()
    }
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    }
  }, [activeMusicCategory]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onLoadStart = () => { setIsLoading(true); setHasError(false); };
    const onWaiting = () => setIsLoading(true);
    const onCanPlay = () => setIsLoading(false);
    const onPlaying = () => { setIsLoading(false); setHasError(false); };
    const onError = () => { setIsLoading(false); setHasError(true); setIsPlaying(false); };

    audio.addEventListener("loadstart", onLoadStart);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("error", onError);
    return () => {
      audio.removeEventListener("loadstart", onLoadStart);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("error", onError);
    };
  }, []);
  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4">
      <button
        className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-white/15 active:scale-95 sm:h-11 sm:w-11"
        onClick={prevSong}
        aria-label="Previous track"
      >
        <img src={prev} className="h-5 w-5 rotate-180 invert sm:h-6 sm:w-6" alt="" />
      </button>

      <button
        className="grid h-14 w-14 place-items-center rounded-full bg-white text-black shadow-lg transition hover:scale-105 active:scale-95 disabled:opacity-60 disabled:hover:scale-100 sm:h-16 sm:w-16"
        onClick={() => setIsPlaying(!isPlaying)}
        disabled={isLoading || hasError}
        aria-busy={isLoading}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isLoading ? (
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-black/30 border-t-black" />
        ) : (
          <img src={isPlaying ? pause : play} className="h-7 w-7" alt="" />
        )}
      </button>

      <button
        className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-white/15 active:scale-95 sm:h-11 sm:w-11"
        onClick={nextSong}
        aria-label="Next track"
      >
        <img src={next} className="h-5 w-5 invert sm:h-6 sm:w-6" alt="" />
      </button>

      <VolumeControl
        volume={volume}
        isMuted={isMuted}
        onVolumeChange={setVolume}
        onToggleMute={() => setIsMuted((prev) => !prev)}
      />

      <audio ref={audioRef} src={currentTrack?.src || ""} />
    </div>
  )
}
export default PlayerControls