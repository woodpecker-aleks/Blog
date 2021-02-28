import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { PENDING, FULFILLED, IDLE, REJECTED } from '@utils/constants'
import path from '@utils/path'
import { Comment, fetchStatus, Post } from '@utils/types'

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

export const updateCurrentPost = createAsyncThunk('currentPost/updatePost', async (newPostInfo: Post) => {
  const { id, ...restNewPostInfo } = newPostInfo

  const res = await axios.put(path.api.post(id), restNewPostInfo)

  const updatedPost: Post = res.data

  return updatedPost
})

export const deleteCurrentPost = createAsyncThunk('currentPost/deletePost', async (postId: number) => {
  await axios.delete(path.api.post(postId))
})

export const createCommentForCurrentPost = createAsyncThunk(
  'currentPost/createComment',
  async (commentInfo: { postId: number; body: string }) => {
    const res = await axios.post(path.api.comments, commentInfo)

    const createdComment: Comment = res.data

    return createdComment
  },
)

const currentPostSlice = createSlice({
  name: 'currentPost',
  initialState,

  reducers: {
    toggleEditorMode(state) {
      state.editorMode = !state.editorMode
    },
  },

  extraReducers: {
    [fetchCurrentPost.fulfilled as any]: (state, action) => {
      const fetchedPost: Post = action.payload

      state.post = fetchedPost

      state.fetchStatus = FULFILLED
    },
    [fetchCurrentPost.pending as any]: (state, action) => {
      state.fetchStatus = PENDING
    },
    [fetchCurrentPost.rejected as any]: (state, action) => {
      state.fetchStatus = REJECTED
    },

    [updateCurrentPost.fulfilled as any]: (state, action) => {
      const updatedPost: Post = action.payload

      state.post = { ...state.post, ...updatedPost }

      state.fetchStatus = FULFILLED
    },
    [updateCurrentPost.pending as any]: (state, action) => {
      state.fetchStatus = PENDING
    },
    [updateCurrentPost.rejected as any]: (state, action) => {
      state.fetchStatus = REJECTED
    },

    [deleteCurrentPost.fulfilled as any]: (state, action) => {
      state.post = { id: 0, title: '', body: '' }
    },

    [createCommentForCurrentPost.fulfilled as any]: (state, action) => {
      const createdComment: Comment = action.payload

      state.post.comments.push(createdComment)
    },
  },
})

export const { toggleEditorMode } = currentPostSlice.actions

export const currentPostSliceSelector = (state) => state.currentPost

export default currentPostSlice.reducer
