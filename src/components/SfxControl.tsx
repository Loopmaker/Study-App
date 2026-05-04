import { useEffect, useRef, useState } from "react";
import { Slider } from "@mui/material";
import { getAudioContext } from "../hooks/useAudioContext";
import type { SoundEffects } from "../types/types";

interface Props {
  sfx: SoundEffects;
}

function SfxControl({ sfx }: Props) {
  const [volume, setVolume] = useState<number>(0);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isSetupRef = useRef<boolean>(false);

  const setupAudio = () => {
    if (isSetupRef.current) return;
    isSetupRef.current = true;

    const ctx = getAudioContext();
    const audio = new Audio(sfx.src);
    audio.loop = true;
    audioRef.current = audio;

    const source = ctx.createMediaElementSource(audio);
    const gain = ctx.createGain();
    gain.gain.value = 0;

    source.connect(gain);
    gain.connect(ctx.destination);

    sourceRef.current = source;
    gainRef.current = gain;
  };

  const handleChange = (_: Event, newValue: number | number[]) => {
    const val = newValue as number;
    setVolume(val);

    // Lazy init audio on first interaction (required by mobile browsers)
    setupAudio();

    const ctx = getAudioContext();
    if (ctx.state === "suspended") ctx.resume();

    if (gainRef.current) {
      gainRef.current.gain.value = val / 100;
    }

    if (audioRef.current) {
      if (val > 0) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      sourceRef.current?.disconnect();
      gainRef.current?.disconnect();
    };
  }, []);

  return (
    <div className="grid grid-cols-[120px_1fr] sm:grid-cols-[150px_1fr] items-center">
      <h3 className="text-base sm:text-lg text-gray-200">{sfx.name}</h3>
      <Slider
        value={volume}
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
        onChange={handleChange}
      />
    </div>
  );
}

export default SfxControl;