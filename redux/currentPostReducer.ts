import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { PENDING, FULFILLED, IDLE, REJECTED } from '@utils/constants'
import path from '@utils/path'
import { fetchStatus, Post } from '@utils/types'

export interface initialStateProps {
  fetchStatus: fetchStatus
  post: Post
  editorMode: boolean
}

const initialState: initialStateProps = {
  fetchStatus: IDLE,
  post: { id: 0, title: '', body: '' },
  editorMode: false,
}

export const fetchCurrentPost = createAsyncThunk('currentPost/fetchPost', async (postId: number) => {
  const res = await axios.get(path.api.post(postId, true))

  const fetchedCurrentPost: Post = res.data

  return fetchedCurrentPost
})

const currentPostSlice = createSlice({
  name: 'currentPost',
  initialState,

  reducers: {
    toggleEditorMode(state, action) {
      state.editorMode = !state.editorMode
    },
  },

  extraReducers: {
    [fetchCurrentPost.fulfilled as any]: (state, action) => {
      const fetchedPosts: Post = action.payload

      state.post = fetchedPosts

      state.fetchStatus = FULFILLED
    },
    [fetchCurrentPost.pending as any]: (state, action) => {
      state.fetchStatus = PENDING
    },
    [fetchCurrentPost.rejected as any]: (state, action) => {
      state.fetchStatus = REJECTED
    },
  },
})

export const { toggleEditorMode } = currentPostSlice.actions

export const currentPostSliceSelector = (state) => state.currentPost

export default currentPostSlice.reducer
