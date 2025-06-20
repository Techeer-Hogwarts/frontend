export interface ProfileQueryParams {
  position?: string[]
  year?: string[]
  university?: string[]
  grade?: string[]
  cursorId?: number
  limit?: number
  sortBy?: string
  hasNext?: boolean
}

export interface ResumeQueryParams {
  position?: string[]
  year?: string[]
  category?: string
  cursorId?: number
  limit?: number
  sortBy?: string
}
