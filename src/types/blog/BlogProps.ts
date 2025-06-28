export interface BlogProps {
  title: string
  id: string
  date: string
  url: string
  category: string
  likeCount: number
  thumbnail: string
  user: User
  author: Author
}

interface User {
  name: string
  profileImage: string
}

interface Author {
  authorName: string
  authorImage: string
}

export interface ChallengeTerms {
  termId: number
  termName: string
}

export interface BlogChallengeProps {
  blogId: number
  title: string
  url: string
  likeCount: number
  createdAt: string
  author: string
  authorImage?: string
  thumbnail?: string
}
