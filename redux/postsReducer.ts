import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { PENDING, FULFILLED, IDLE, REJECTED } from '../constants'
import path from '../path'
import { fetchStatus, todo } from '../types'

interface initialStateProps {
  fetchStatus: fetchStatus
  posts: todo[]
}

const initialState = {
  fetchStatus: IDLE,
  posts: [],
} as initialStateProps

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const res = await axios.get(path.api.posts.all)

  const fetchedPosts: todo[] = res.data

  return fetchedPosts
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.fulfilled as any]: (state, action) => {
      const fetchedPosts = action.payload

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
