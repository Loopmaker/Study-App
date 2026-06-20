import { useEffect, useRef, useState } from "react"

interface Props {
  video: string | null
  nextVideo?: string | null  // for preloading
}

const VideoPlayer = ({ video, nextVideo }: Props) => {
  const [activeLayer, setActiveLayer] = useState<"a" | "b">("a")
  const videoA = useRef<HTMLVideoElement>(null)
  const videoB = useRef<HTMLVideoElement>(null)
  const preloadRef = useRef<HTMLVideoElement>(null)

  // Load initial video on mount
  useEffect(() => {
    if (video && videoA.current) {
      videoA.current.src = video
      videoA.current.play().catch(() => {})
    }
  }, [])

  // Crossfade when video changes
  useEffect(() => {
    if (!video) return

    const incoming = activeLayer === "a" ? videoB.current : videoA.current
    if (!incoming) return

    incoming.pause()
    incoming.src = video
    incoming.load()
    let cancelled = false

    const onReady = () => {
      if (cancelled) return
      incoming.play().catch(() => {})
      setActiveLayer(prev => prev === "a" ? "b" : "a")
    }
    
    incoming.addEventListener("canplay", onReady, { once: true })
    return () => {
      cancelled = true
      incoming.removeEventListener("canplay", onReady)
    }
  }, [video])

  // Silently preload next video
  useEffect(() => {
    if (nextVideo && preloadRef.current) {
      preloadRef.current.src = nextVideo
      preloadRef.current.load()
    }
  }, [nextVideo])

  // Pause when tab is hidden (saves battery on mobile)
  useEffect(() => {
    const handleVisibility = () => {
      const active = activeLayer === "a" ? videoA.current : videoB.current
      if (document.hidden) {
        active?.pause()
      } else {
        active?.play()
      }
    }
    document.addEventListener("visibilitychange", handleVisibility)
    return () => document.removeEventListener("visibilitychange", handleVisibility)
  }, [activeLayer])

  const layerStyle = (isActive: boolean) =>
    `absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
      isActive ? "opacity-100" : "opacity-0"
    }`

  return (
    <div className="fixed inset-0 pointer-events-none">
      <video ref={videoA} className={layerStyle(activeLayer === "a")} autoPlay muted loop playsInline />
      <video ref={videoB} className={layerStyle(activeLayer === "b")} autoPlay muted loop playsInline />
      {/* Hidden preloader */}
      <video ref={preloadRef} style={{ display: "none" }} muted playsInline />
    </div>
  )
}

export default VideoPlayer