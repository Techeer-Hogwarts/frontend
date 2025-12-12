// 이력서 목록 기본 타입
export interface ResumeQueryParams {
  position?: string[]
  year?: string[]
  category?: string
  cursorId?: number
  limit?: number
  sortBy?: string
}

// 이력서 상세 정보 타입
export interface ResumeDetail {
  id: number
  createdAt: number
  title: string
  url: string
  category: string
  position: string
  likeCount: number
  user: {
    id: number
    name: string
    profileImage: string
    year: number
    mainPosition: string
  }
}

// 이력서 목록 응답 타입
export interface ResumeListResponse {
  data: any[]
  hasNext: boolean
  nextCursor?: number
}

// 인기 이력서 응답 타입
export interface BestResumeResponse {
  data: any[]
  hasNext: boolean
  nextCursor?: number
}

// 사용자 이력서 응답 타입
export interface UserResumeResponse {
  data: any[]
  hasNext: boolean
  nextCursor?: number
}

// 좋아요/북마크 요청 타입
export interface LikeBookmarkRequest {
  contentId: number
  category: 'SESSION' | 'BLOG' | 'RESUME' | 'PROJECT' | 'STUDY'
  likeStatus?: boolean
  bookmarkStatus?: boolean
}

// 이력서 업로드 요청 타입
export interface ResumeUploadRequest {
  category: string
  position: string
  title: string
  isMain: boolean
}
