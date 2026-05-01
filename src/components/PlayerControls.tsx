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
      setIsPlaying(true);
      return nextIndex;
    });
  }

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
    <div className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap">
      <button className="rotate-180 w-10 sm:w-11.5 hover:scale-105 transition-transform ease-in-out duration-200" onClick={prevSong}>
        <img src={prev} className="invert" alt="Previous"/>
      </button>

      <button className="w-12 sm:w-15 hover:scale-105 transition-transform ease-in-out duration-200" onClick={() => setIsPlaying(!isPlaying)}>
        <img src={isPlaying ? pause : play} className="invert" alt={isPlaying ? "Pause" : "Play"}/>
      </button>

      <button className="w-10 sm:w-11.5 hover:scale-105 transition-transform ease-in-out duration-200" onClick={nextSong}>
        <img src={next} className="invert" alt="Previous"/>
      </button>
      <VolumeControl 
        volume={volume}
        isMuted={isMuted}
        onVolumeChange={setVolume}
        onToggleMute={() => setIsMuted(!isMuted)}
      />
      <audio ref={audioRef} src={currentTrack?.src || ""} autoPlay/>
    </div>
  );
}
export default PlayerControls