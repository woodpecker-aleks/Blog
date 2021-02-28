import { FC, memo } from 'react'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import Paper from '@components/Paper'
import { H2, Typography } from '@components/Typography'
import Button from '@components/Button'
import Divider from '@components/Divider'
import Progress from '@components/Progress'
import { deleteCurrentPost, toggleEditorMode, updateCurrentPost } from '@redux/currentPostReducer'
import { Post } from '@utils/types'
import { useRouter } from 'next/dist/client/router'
import path from '@utils/path'

const PostBody = styled(Paper)`
  flex-direction: column;
  align-items: flex-start;
  margin-block: ${({ theme }) => theme.spacing}px;
`

const PostTitle = styled(H2)`
  width: 95%;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  border: none;
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spacing}px;
  padding-inline: ${({ theme }) => theme.spacing}px;
`

const PostDescription = styled(Typography)`
  padding-inline: ${({ theme }) => theme.spacing}px;
  margin-bottom: ${({ theme }) => theme.spacing * 2}px;
  width: 95%;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  border: none;
  resize: none;
`

const EditPostButton = styled(Button)`
  margin-block: ${({ theme }) => theme.spacing}px;
  margin-right: ${({ theme }) => theme.spacing}px;
`

const PostActionBar = styled.div`
  display: flex;
  align-items: center;
`

const DeletePostButton = styled(Button)`
  background-color: #b71c1c;
  margin-left: ${({ theme }) => theme.spacing}px;
`

const PostProgress = styled(Progress)`
  margin-top: ${({ theme }) => theme.spacing * 5}px;
  margin-inline: auto;
`

interface PostInfoProps {
  loading: boolean
  post: Post
  editorMode: boolean
}

const PostInfo: FC<PostInfoProps> = ({ loading, post, editorMode }) => {
  const dispatch = useDispatch()

  const router = useRouter()

  const [values, setValues] = useState({
    title: post.title,
    body: post.body,
  })

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target

    setValues((prevValues) => ({ ...prevValues, [name]: value }))
  }, [])

  const handleDispatchDeleteCurrentPost = useCallback(async () => {
    await dispatch(deleteCurrentPost(post.id))

    router.push(path.page.posts)
  }, [dispatch, post.id])

  const handleDispatchToggleEditorMode = useCallback(() => {
    dispatch(toggleEditorMode())
  }, [dispatch])

  const handleDispatchUpdateCurrentPost = useCallback(() => {
    dispatch(updateCurrentPost({ ...values, id: post.id }))
    dispatch(toggleEditorMode())
  }, [dispatch, values, post.id])

  if (loading) return <PostProgress />
  else
    return (
      <PostBody>
        {editorMode ? (
          <PostTitle as="input" name="title" onChange={handleInputChange} value={values.title} />
        ) : (
          <PostTitle as="h2">{post.title}</PostTitle>
        )}
        <Divider variant="horizontal" />
        {editorMode ? (
          <PostDescription as="textarea" name="body" onChange={handleInputChange} value={values.body} />
        ) : (
          <PostDescription>{post.body}</PostDescription>
        )}
        <Divider variant="horizontal" />
        <PostActionBar>
          <EditPostButton
            disabled={!values.title}
            onClick={editorMode ? handleDispatchUpdateCurrentPost : handleDispatchToggleEditorMode}
          >
            {editorMode ? 'Save' : 'Edit'}
          </EditPostButton>
          <DeletePostButton onClick={handleDispatchDeleteCurrentPost}>Delete</DeletePostButton>
        </PostActionBar>
      </PostBody>
    )
}

export default memo(PostInfo)
