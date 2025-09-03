import { LikeListItem } from './like/like'

export interface BlogPostProps {
  title: string
  userName?: string
  userImage?: string
  date: string
  id: string
  url: string
  likeCount: number
  image: string
  category?: string
  likeList: LikeListItem[]
  authorName: string
  authorImage: string
  onDelete?: (id: string) => void
  onLikeUpdate?: (id: string, newLikeCount: number) => void
}
