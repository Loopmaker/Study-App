import { useEffect, useRef, useState } from "react";
import { Slider } from "@mui/material";
import { getAudioContext, getMasterSfxGain } from "../hooks/useAudioContext";
import type { SoundEffects } from "../types/types";
import volume_icon from "../assets/icons/icon--volume.png";
import mute_icon from "../assets/icons/icon--mute.png";

interface Props {
  sfx: SoundEffects;
  volume: number;
  onVolumeChange: (value: number) => void;
}

function SfxControl({ sfx, volume, onVolumeChange }: Props) {
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isSetupRef = useRef<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setupAudio = () => {
    if (isSetupRef.current) return;
    isSetupRef.current = true;

    const ctx = getAudioContext();
    const audio = new Audio(sfx.src);
    audio.loop = true;
    audioRef.current = audio;
    audio.addEventListener("loadstart", () => setIsLoading(true));
    audio.addEventListener("waiting", () => setIsLoading(true));
    audio.addEventListener("canplaythrough", () => setIsLoading(false));
    audio.addEventListener("playing", () => setIsLoading(false));

    const source = ctx.createMediaElementSource(audio);
    const gain = ctx.createGain();
    gain.gain.value = 0;

    source.connect(gain);
    gain.connect(getMasterSfxGain());

    sourceRef.current = source;
    gainRef.current = gain;
  };

  const ensureAudio = () => {
    setupAudio();
    const ctx = getAudioContext();
    if (ctx.state === "suspended") ctx.resume();
  };

  const handleChange = (_: Event, newValue: number | number[]) => {
    ensureAudio();
    const val = newValue as number;
    if (val > 0 && isMuted) setIsMuted(false);
    onVolumeChange(val);
  };

  const toggleMute = () => {
    ensureAudio();
    setIsMuted((prev) => !prev);
  };

    useEffect(() => {
      const effective = isMuted ? 0 : volume / 100;
      if (effective > 0) ensureAudio();
      if (!gainRef.current || !audioRef.current) return;
      gainRef.current.gain.value = effective;
      if (effective > 0) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
  }, [volume, isMuted]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      sourceRef.current?.disconnect();
      gainRef.current?.disconnect();
    };
  }, []);

const isActive = volume > 0 && !isMuted;

return (
    <div className="grid grid-cols-[110px_auto_1fr] sm:grid-cols-[140px_auto_1fr] items-center gap-2 sm:gap-3">
      <div className="flex items-center gap-2 min-w-0">
        <span
          className={`h-1.5 w-1.5 shrink-0 rounded-full transition ${
            isActive ? "bg-emerald-400" : "bg-white/20"
          }`}
        />
        <h3
          className={`truncate text-base sm:text-lg transition ${
            isActive ? "text-white" : "text-gray-400"
          }`}
        >
          {sfx.name}
        </h3>
      </div>

      <button
        onClick={toggleMute}
        disabled={volume === 0}
        aria-label={isMuted ? `Unmute ${sfx.name}` : `Mute ${sfx.name}`}
        className="grid h-7 w-7 place-items-center rounded-full transition hover:bg-white/10 disabled:opacity-40"
      >
        {isLoading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        ) : (
          <img
            src={isMuted || volume === 0 ? mute_icon : volume_icon}
            alt=""
            className="h-5 w-5 invert"
          />
        )}
      </button>

      <Slider
        value={isMuted ? 0 : volume}
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