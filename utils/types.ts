export type fetchStatus = 'pending' | 'idle' | 'fulfilled' | 'rejected'

export interface Comment {
  id: number
  postId: number
  body: string
}

export interface Post {
  id: number
  title: string
  body: string
  comments?: Comment[]
}

export interface PostInfo {
  title: string
  body: string
}
