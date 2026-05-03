import { useRef, useState } from "react"
import volume_icon from "../assets/icons/icon--volume.png"
import mute_icon from "../assets/icons/icon--mute.png"
import { Slider } from "@mui/material"
import useClickOutside from "../hooks/useClickOutside"

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
  useClickOutside(wrapperRef, setMobileSliderOpen, mobileSliderOpen)
  const handleIconClick = (e: React.MouseEvent) => {
    const pointerType = (e.nativeEvent as PointerEvent).pointerType;
    if(pointerType === "touch"){
      setMobileSliderOpen((prev) => !prev);
    } else {
      onToggleMute();
    }
  };
  return (
    <div ref={wrapperRef} className="group flex items-center gap-2">
      <button className="hover:scale-105 transition-transform ease-in-out duration-200 shrink-0" onClick={handleIconClick}>
        <img
          src={isMuted || volume === 0 ? mute_icon : volume_icon}
          alt={isMuted ? "Unmute" : "Mute"}
          className="invert w-8 sm:w-10"
        />
      </button>

      <div className={`mt-2 transition-all duration-300 ease-in-out sm:w-0 sm:opacity-0 sm:group-hover:w-23.75 sm:group-hover:opacity-100 md:w-0 md:opacity-0 md:group-hover:w-23.75 md:group-hover:opacity-100 ${mobileSliderOpen ? "w-20" : "w-0 opacity-0"}`}>

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
              "& .MuiSlider-thumb": {
                width: 15,
                height: 16,
                "&:hover, &.Mui-active, &.Mui-focusVisible":{
                  boxShadow: "0 0 0 6px rgba(216, 137, 109, 0.2)",
                },
              },
            }}
          />
        </div>

      </div>
    </div>
  )
}

export default VolumeControl