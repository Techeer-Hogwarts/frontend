export interface Resume {
  id: string
  createdAt: number
  title: string
  url: string
  category: string
  position: string
  likeCount: number
  bookCount: number
  year: string
  user: {
    id: number
    name: string
    profileImage: string
    year: number
    mainPosition: string
  }
  likeList: string[]
  bookmarkList: string[]
  onLikeUpdate?: (id: string, newLikeCount: number) => void
  onBookmarkUpdate?: (id: string, newBookmarkCount: number) => void
}

export interface ResumeProps {
  likeCount: number
  bookCount: number
  resume: Resume
  likeList: string[]
  onLikeUpdate: (resumeId: string, newLikeCount: number) => void
  bookmarkList: string[]
  onBookmarkUpdate: (resumeId: string, newBookmarkCount: number) => void
}
