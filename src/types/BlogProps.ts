export interface BlogProps {
  title: string
  id: string
  date: string
  url: string
  likeCount: number
  thumbnail: string
  user: User
  author: Author
}

interface User {
  name: string
}

interface Author {
  authorName: string
  authorImage: string
}
