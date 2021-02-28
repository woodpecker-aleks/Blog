import { FC, memo } from 'react'
import styled from 'styled-components'
import Divider from '@components/Divider'
import Paper from '@components/Paper'
import { H4 } from '@components/Typography'
import { useDispatch } from 'react-redux'
import { useCallback, useState } from 'react'
import { createPost } from '@redux/postsReducer'
import Button from './Button'
import { useRouter } from 'next/dist/client/router'
import path from '@utils/path'
import { Post } from '@utils/types'

const TextField = styled(H4)`
  border-radius: ${({ theme }) => theme.borderRadius}px;
  border: none;
  padding: ${({ theme }) => theme.spacing}px;
  display: flex;
  width: 95%;
`

const TextArea = styled(TextField)`
  font-size: 1rem;
  resize: none;
`

const NewPostPagePaper = styled(Paper)`
  flex-direction: column;
`

const CreatePostButton = styled(Button)`
  margin-right: auto;
`

const PostCreator: FC = () => {
  const [values, setValues] = useState({
    title: '',
    body: '',
  })

  const router = useRouter()

  const dispatch = useDispatch()

  const handleDispatchCreatePost = useCallback(async () => {
    const { payload } = await dispatch(createPost(values))

    const newPost: Post = payload

    router.push(path.page.post(newPost.id))
  }, [dispatch, values])

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target

    setValues((prevValues) => ({ ...prevValues, [name]: value }))
  }, [])

  return (
    <>
      <NewPostPagePaper>
        <TextField
          as="input"
          type="text"
          placeholder="Post title..."
          value={values.title}
          name="title"
          onChange={handleInputChange}
        />
        <Divider variant="horizontal" />
        <TextArea
          name="body"
          as="textarea"
          placeholder="Post body..."
          value={values.body}
          onChange={handleInputChange}
        />
        <CreatePostButton onClick={handleDispatchCreatePost}>Create</CreatePostButton>
      </NewPostPagePaper>
    </>
  )
}

export default memo(PostCreator)
