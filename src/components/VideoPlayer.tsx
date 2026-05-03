import { useEffect, useRef, useState } from "react"

interface Props {
  video: string | null
}

const VideoPlayer = ({ video }: Props) => {
  const [currentVideo, setCurrentVideo] = useState<string | null>(video);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [fade, setFade] = useState<boolean>(false);

  useEffect(() => {
    if(!video) return;

    if(videoRef.current){
      setFade(true);
      const timeout = setTimeout(() => {
        setCurrentVideo(video);
        setFade(false);
        videoRef.current?.play();
      }, 100);

      return () => clearTimeout(timeout)
    }
  },[video])

  return (
    <div className="fixed inset-0 pointer-events-none">
      <video
        ref={videoRef}
        src={currentVideo || "" }
        autoPlay
        muted
        loop
        className={`object-cover w-full h-full transition-opacity duration-200 ${fade ? "opacity-0" : "opacity-100"}`}/>
    </div>
  )
}

export default VideoPlayer