export type fetchStatus = 'pending' | 'idle' | 'fulfilled' | 'rejected'

export interface comment {
  id: number
  postId: number
  body: string
}

export interface todo {
  id: number
  title: string
  body: string
  comments?: comment[]
}
