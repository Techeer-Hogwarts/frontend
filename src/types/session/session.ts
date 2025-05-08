export interface SessionFormData {
  thumbnail: string
  title: string
  presenter: string
  date: string
  position: string
  category: string
  videoUrl: string
  fileUrl: string
}

export interface User {
  name: string
  profileImage: string
}

export interface Session {
  id: string
  title: string
  date: string
  presenter: string
  likeCount: number
  thumbnail: string
  videoUrl: string
  fileUrl: string
  user: User
}
