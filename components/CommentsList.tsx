import { Comment } from '@utils/types'
import { FC, memo } from 'react'
import CommentItem from './CommentItem'
import Paper from './Paper'
import styled from 'styled-components'
import { H5 } from '@components/Typography'

const CommentsListContainer = styled(Paper)`
  flex-direction: column;
  max-width: 300px;
  padding: ${({ theme }) => theme.spacing}px;
`

const NoCommentsTitle = styled(H5)`
  margin-inline: auto;
`

interface CommentsListProps {
  readonly comments: Comment[]
}

const CommentsList: FC<CommentsListProps> = ({ comments }) => {
  let commentsList

  if (comments.length) commentsList = comments.map((comment) => <CommentItem key={comment.id} comment={comment} />)
  else
    commentsList = (
      <NoCommentsTitle transform="uppercase" as="h5">
        No comments
      </NoCommentsTitle>
    )

  return <CommentsListContainer>{commentsList}</CommentsListContainer>
}

export default memo(CommentsList)
