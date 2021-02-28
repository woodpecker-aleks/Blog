import { FC, memo } from 'react'
import { Post } from '@utils/types'
import styled from 'styled-components'

interface PostItemProps {
  post: Post
}

const Item = styled.li`
  display: flex;
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.secondaryColor};
  padding: ${({ theme }) => theme.spacing};
`

const PostItem: FC<PostItemProps> = ({ post }) => {
  return <Item>{post.title}</Item>
}

export default memo(PostItem)
