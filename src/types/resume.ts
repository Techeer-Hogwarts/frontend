interface Resume {
  id: string
  createdAt: number
  title: string
  category: string
  position: string
  likeCount: number
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
