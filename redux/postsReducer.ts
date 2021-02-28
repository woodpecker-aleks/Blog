import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { PENDING, FULFILLED, IDLE, REJECTED } from '@utils/constants'
import path from '@utils/path'
import { fetchStatus, Post } from '@utils/types'

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
  },
})

export const postsSliceSelector = (state) => state.posts

export default postsSlice.reducer
