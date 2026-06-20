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
}

function PlayerControls({
  activeMusicCategory,
  currentTrack,
  songIndex,
  setSongIndex,
  setCurrentTrack
}: Props){
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(20);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    if(isPlaying){
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
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
        className="grid h-14 w-14 place-items-center rounded-full bg-white text-black shadow-lg transition hover:scale-105 active:scale-95 sm:h-16 sm:w-16"
        onClick={() => setIsPlaying(!isPlaying)}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        <img
          src={isPlaying ? pause : play}
          className="h-7 w-7"
          alt=""
        />
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

      <audio ref={audioRef} src={currentTrack?.src || ""} autoPlay />
    </div>
  )
}
export default PlayerControls