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
