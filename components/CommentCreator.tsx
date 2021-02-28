import { createCommentForCurrentPost } from '@redux/currentPostReducer'
import { FC, memo, useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import Button from './Button'
import Paper from './Paper'
import { Typography } from './Typography'

const CommentCreatorContainer = styled(Paper)`
  margin-bottom: ${({ theme }) => theme.spacing}px;
  flex-direction: column;
  align-items: flex-start;
`

const TextArea = styled(Typography)`
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  resize: none;
  padding: ${({ theme }) => theme.spacing}px;
  width: 95%;
`

interface CommentCreatorProps {
  postId: number
}

const CommentCreator: FC<CommentCreatorProps> = ({ postId }) => {
  const [commentValue, setCommentValue] = useState('')

  const dispatch = useDispatch()

  const handleCommentValueChange = useCallback((e) => {
    setCommentValue(e.target.value)
  }, [])

  const handleDispatchCreateComment = useCallback(async () => {
    await dispatch(createCommentForCurrentPost({ postId, body: commentValue }))

    setCommentValue('')
  }, [dispatch, commentValue, postId])

  return (
    <CommentCreatorContainer>
      <TextArea placeholder="Comment..." as="textarea" value={commentValue} onChange={handleCommentValueChange} />
      <Button onClick={handleDispatchCreateComment}>Push</Button>
    </CommentCreatorContainer>
  )
}

export default memo(CommentCreator)
