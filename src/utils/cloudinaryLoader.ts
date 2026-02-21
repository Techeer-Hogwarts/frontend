import { ImageLoaderProps } from 'next/image'

/**
 * Cloudinary URL Generator
 * 이미지와 비디오 모두 지원하는 Cloudinary Fetch URL을 생성합니다.
 */
export const getCloudinaryUrl = (
  src: string,
  width?: number,
  quality?: number,
) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dzgjafm08'

  if (!src) return src

  // 이미 Cloudinary URL인 경우 무시
  if (src.includes('cloudinary.com')) {
    return src
  }

  // 확장자 추출 (쿼리 파라미터 제거 후)
  const cleanSrc = src.split('?')[0].trim()
  const isVideo = cleanSrc.match(/\.(webm|mp4|ogv|mov)$/i)
  const resourceType = isVideo ? 'video' : 'image'

  // f_auto: 최적 포맷, q_auto: 최적 화질
  let transformation = 'f_auto,q_auto:eco'
  if (width) transformation += `,w_300`
  if (quality) transformation += `,q_${quality}`

  const result = `https://res.cloudinary.com/${cloudName}/${resourceType}/fetch/${transformation}/${encodeURIComponent(src.trim())}`

  return result
}

/**
 * Next.js Image 전용 Loader
 */
const cloudinaryLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return getCloudinaryUrl(src, width, quality)
}

export default cloudinaryLoader
