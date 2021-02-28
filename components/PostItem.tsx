import { FC, memo } from 'react'
import { Post } from '@utils/types'
import styled from 'styled-components'
import { H5, Typography } from './Typography'
import Divider from './Divider'
import Button from './Button'
import Link from 'next/link'
import path from '@utils/path'

interface PostItemProps {
  post: Post
}

const Item = styled.li`
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  background-color: ${({ theme }) => theme.secondaryColor};
  padding: ${({ theme }) => theme.spacing * 2}px;
  margin-bottom: ${({ theme }) => theme.spacing * 2}px;
`

const PostTitle = styled(H5)`
  padding-inline: ${({ theme }) => theme.spacing}px;
`

const PostDescription = styled(Typography)`
  padding-inline: ${({ theme }) => theme.spacing}px;
  overflow: hidden;
  max-height: ${({ theme }) => theme.spacing * 11}px;
  margin-bottom: ${({ theme }) => theme.spacing * 2}px;
`

const PostLink = styled(Button)`
  margin-left: auto;
`

const PostItem: FC<PostItemProps> = ({ post }) => {
  return (
    <Item>
      <PostTitle as="h5">{post.title}</PostTitle>
      <Divider variant="horizontal" />
      <PostDescription>{post.body}</PostDescription>
      <Link href={path.page.post(post.id)}>
        <PostLink as="a">More</PostLink>
      </Link>
    </Item>
  )
}

export default memo(PostItem)
