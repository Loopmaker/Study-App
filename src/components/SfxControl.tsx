import { useEffect, useRef, useState } from "react"
import type { SoundEffects } from "../types/types"
import { Slider } from "@mui/material";

interface Props{
  sfx: SoundEffects
}
function SfxControl( {sfx}: Props) {
  const [volume, setVolume] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if(audioRef.current){
      audioRef.current.volume = volume / 100;
    }
  }, [volume])
  return (
    <div className="grid grid-cols-[120px_1fr] sm:grid-cols-[150px_1fr] items-center">
      <h3 className="text-base sm:text-lg text-gray-200">{sfx.name}</h3>

      <audio ref={audioRef} loop>
        <source src={sfx.src} type="audio/mpeg"/>
        Your Browser does not support the audio element.
      </audio>

      <Slider
        value={volume}
        sx={{
          color: "#d6896d",
              height: 8,
              "& .MuiSlider-thumb": {
                width: 16,
                height: 16,
                "&:hover, &.Mui-active, &.Mui-focusVisible":{
                  boxShadow: "0 0 0 6px rgba(216, 137, 109, 0.2)",
                },
              },
        }}
        onChange={(_, newValue) => {
          setVolume(newValue as number)
          if(audioRef.current){
            audioRef.current.muted = false;
            audioRef.current.volume = newValue as number / 100;
            audioRef.current.play().catch((err) => {
              console.error("Error playing audio:", err)
            })
          }
        }}
      />
    </div>
  )
}

export default SfxControl