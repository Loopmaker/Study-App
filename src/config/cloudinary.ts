const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const CLOUD_BASE = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload`
const PARAMS = "q_auto,f_auto,w_1280"

export const cdnVideo = (publicId: string): string =>
  `${CLOUD_BASE}/${PARAMS}/${publicId}.mp4`