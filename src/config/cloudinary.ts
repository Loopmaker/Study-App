const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const CLOUD_BASE = `https://res.cloudinary.com/${CLOUD_NAME}`
const VIDEO_BASE = `${CLOUD_BASE}/video/upload`
const IMAGE_BASE = `${CLOUD_BASE}/image/upload`

const isMobile = window.innerWidth <= 768
const VIDEO_PARAMS = isMobile ? "q_auto,f_auto,w_720" : "q_auto,f_auto,w_1280"

export const cdnVideo = (publicId: string): string =>
  `${VIDEO_BASE}/${VIDEO_PARAMS}/${publicId}.mp4`

export const cdnAudio = (publicId: string): string =>
  `${VIDEO_BASE}/${publicId}.mp3`

export const cdnImage = (publicId: string): string =>
  `${IMAGE_BASE}/q_auto,f_auto,w_400/${publicId}`