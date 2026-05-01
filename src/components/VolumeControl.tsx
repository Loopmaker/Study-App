import { useRef, useState } from "react"
import volume_icon from "../assets/icons/icon--volume.png"
import mute_icon from "../assets/icons/icon--mute.png"
import { Slider } from "@mui/material"

interface Props {
  volume: number
  isMuted: boolean
  onVolumeChange: (volume: number) => void
  onToggleMute: () => void
}
function VolumeControl({
  volume,
  isMuted,
  onVolumeChange,
  onToggleMute,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [mobileSliderOpen, setMobileSliderOpen] = useState<boolean>(false);
  const handleIconClick = (e: React.MouseEvent) => {
    const pointerType = (e.nativeEvent as PointerEvent).pointerType;
    if(pointerType === "touch"){
      setMobileSliderOpen((prev) => !prev);
    } else {
      onToggleMute();
    }
  };
  return (
    <div ref={wrapperRef}>
      <button className="hover:scale-105 transition-transform ease-in-out duration-200 shrink-0" onClick={handleIconClick}>
        <img 
          src={isMuted || volume === 0 ? mute_icon : volume_icon}
          alt={isMuted ? "Unmute" : "Mute"}
          className="invert w-7 sm:w-9"
          onClick={onToggleMute}
        />
      </button>

      <div className={`mt-2 transition-all duration-300 ease-in-out sm:w-0 sm:opacity-0 sm:group-hover:w-23.75 sm:group-hover:opacity-100 ${mobileSliderOpen ? "w-20" : "w-0 opacity-0"}`}>

        <div className="px-1">
          <Slider 
            value={isMuted ? 0 : volume}
            min={0} 
            max={100} 
            onChange={(_, newValue) => {
              if(isMuted) onToggleMute();
              onVolumeChange(newValue as number);
            }} 
            sx={{
              color: "#d6896d",
              height: 8,
            }}
          />
        </div>

      </div>
    </div>
  )
}

export default VolumeControl