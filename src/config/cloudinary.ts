const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const CLOUD_BASE = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload`

const isMobile = window.innerWidth <= 768
const VIDEO_PARAMS = isMobile ? "q_auto,f_auto,w_720" : "q_auto,f_auto,w_1280"

export const cdnVideo = (publicId: string): string =>
  `${CLOUD_BASE}/${VIDEO_PARAMS}/${publicId}.mp4`

export const cdnAudio = (publicId: string): string =>
  `${CLOUD_BASE}/${publicId}.mp3`