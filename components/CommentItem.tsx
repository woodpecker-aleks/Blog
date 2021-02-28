import { Comment } from '@utils/types'
import { FC, memo } from 'react'
import styled from 'styled-components'
import Paper from './Paper'
import { Typography } from './Typography'

const CommentContainer = styled(Paper)`
  background-color: ${({ theme }) => theme.backgroundColor};
  margin-bottom: ${({ theme }) => theme.spacing}px;
`

interface CommentItemProps {
  comment: Comment
}

const CommentItem: FC<CommentItemProps> = ({ comment }) => {
  return (
    <CommentContainer as="li">
      <Typography>{comment.body}</Typography>
    </CommentContainer>
  )
}

export default memo(CommentItem)
