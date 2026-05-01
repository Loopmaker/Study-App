import { useState } from "react"
import VideoPlayer from "./components/VideoPlayer"
import videoCategoryData from "./data/videoCategoryData"
import arrowDown from "./assets/icons/icon--arrow-down.png"

function App() {
  const [activeVideo, setActiveVideo] = useState<string | null>(
    videoCategoryData[0].videos[0]
  );
  const [isSceneControlVisible, setIsSceneControlVisible] = useState<boolean>(false);
  const [activeVideoCategory, setActiveVideoCategory] = useState<number>(0);

  const sceneControlVisibility = () => {
    setIsSceneControlVisible(!isSceneControlVisible)
  }

  return (
    <main className="relative h-screen bg-black overflow-hidden">
      <div className={`absolute top-4 left-1/2 w-fit max-w-130 min-w-67.5 flex flex-col gap-2 translate-x-[-50%] z-50 transition-all ease-in duration-300 ${isSceneControlVisible ? "translate-y-0" : "translate-y-[-80%]"}`}>

        <div className="flex items-center justify-center self-center border border-white/20 gap-6 bg-black/70 py-2 px-6 rounded-full shadow-md">
          {videoCategoryData.map((category, index: number) => {
            return <button key={category.id} className={`relative ${activeVideoCategory === index ? "opacity-100" : "opacity-50"}`} onClick={() => {
              setActiveVideo(category.videos[0]);
              setActiveVideoCategory(index);
            }}>
              <img src={category.icon} alt={category.category} className="w-9 invert"/>
              {activeVideoCategory === index && (
                <div className="absolute w-1 h-1 bg-emerald-400 rounded-full left-1/2 -translate-x-1/2 -bottom-1"></div>
              )}
            </button>
          })}
        </div>

        <div className="p-2 flex gap-2 flex-wrap justify-center bg-black/40 border border-white/20 rounded-lg shadow-sm">
          {videoCategoryData[activeVideoCategory].videos.map((video) => {
            return <button key={video} className="aspect-video" onClick={()=> {setActiveVideo(video)}}>
              <video src={video} className={`aspect-video w-30 rounded-md ${activeVideo === video? "ring-2 ring-emerald-400 opacity-100" : "opacity-90"}`} preload="metadata" disablePictureInPicture/>
            </button>
          })}
        </div>

        <button className="mt-4 flex items-center justify-center self-center w-fit rounded-full p-2" onClick={sceneControlVisibility}>
          <img 
            src={arrowDown} 
            className={`w-10 animate-bounce invert ${ isSceneControlVisible ? "rotate-180": "rotate-0" }`} 
            alt="Arrow Down"/>
        </button>
      </div>
      <VideoPlayer video={activeVideo}/>
    </main>
  )
}

export default App
