export interface ProfileQueryParams {
  position?: string[]
  year?: string[]
  university?: string[]
  grade?: string[]
  limit?: number
}

export interface ResumeQueryParams {
  position?: string[]
  year?: string[]
  category?: string
  cursorId?: number
  limit?: number
}
