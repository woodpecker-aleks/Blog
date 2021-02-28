import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { PENDING, FULFILLED, IDLE, REJECTED } from '@utils/constants'
import path from '@utils/path'
import { fetchStatus, Post, PostInfo } from '@utils/types'

interface initialStateProps {
  fetchStatus: fetchStatus
  posts: Post[]
}

const initialState: initialStateProps = {
  fetchStatus: IDLE,
  posts: [],
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const res = await axios.get(path.api.posts)

  const fetchedPosts: Post[] = res.data

  return fetchedPosts
})

export const deletePost = createAsyncThunk('posts/deletePost', async (postId: number) => {
  await axios.delete(path.api.post(postId))

  return postId
})

export const createPost = createAsyncThunk('posts/createPost', async (postInfo: PostInfo) => {
  const res = await axios.post(path.api.posts, postInfo)

  const createdPost = res.data

  return createdPost
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.fulfilled as any]: (state, action) => {
      const fetchedPosts: Post[] = action.payload

      state.posts = fetchedPosts

      state.fetchStatus = FULFILLED
    },
    [fetchPosts.pending as any]: (state, action) => {
      state.fetchStatus = PENDING
    },
    [fetchPosts.rejected as any]: (state, action) => {
      state.fetchStatus = REJECTED
    },

    [deletePost.fulfilled as any]: (state, action) => {
      const deletedPostId: number = action.payload

      state.posts = state.posts.filter((post) => post.id !== deletedPostId)
    },

    [createPost.fulfilled as any]: (state, action) => {
      const createdPost: Post = action.payload

      state.posts.push(createdPost)
    },
  },
})

export const postsSliceSelector = (state) => state.posts

export default postsSlice.reducer
