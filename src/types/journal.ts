export type PhotoMemory = {
  id: string
  type: 'photo'
  photo_url: string
  caption?: string
  location_text?: string
  created_at: string
}

export type QuoteMemory = {
  id: string
  type: 'quote'
  text: string
  created_at: string
}

export type QaMemory = {
  id: string
  type: 'qa'
  question: string
  answer: string
  created_at: string
}

export type ListMemory = {
  id: string
  type: 'list'
  title: string
  items: string[]
  created_at: string
}

export type Memory = PhotoMemory | QuoteMemory | QaMemory | ListMemory

export type Trip = {
  id: string
  title: string
  caption: string
  start_date: string
  end_date: string
  location_text: string
  cover_image: string
  memories: Memory[]
}

export type UserProfileStats = {
  trips: number
  memories: number
  photos: number
}

export type UserProfile = {
  id: string
  name: string
  username: string
  profile_photo: string
  bio?: string
  homebase: string
  countries_visited: string[]
  stats: UserProfileStats
}
