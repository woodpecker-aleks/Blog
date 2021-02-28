import { FC, memo, useCallback } from 'react'
import { Post } from '@utils/types'
import styled from 'styled-components'
import { H5, Typography } from './Typography'
import Divider from './Divider'
import Button from './Button'
import Link from 'next/link'
import path from '@utils/path'
import Paper from './Paper'
import { useDispatch } from 'react-redux'
import { deletePost } from '@redux/postsReducer'

interface PostItemProps {
  post: Post
}

const Item = styled(Paper)`
  flex-direction: column;
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

const DeletePostButton = styled(Button)`
  background-color: #b71c1c;
  margin-left: ${({ theme }) => theme.spacing}px;
`

const PostActionBar = styled.div`
  display: flex;
`

const PostItem: FC<PostItemProps> = ({ post }) => {
  const dispatch = useDispatch()

  const handleDispatchDeletePost = useCallback(() => {
    dispatch(deletePost(post.id))
  }, [dispatch, post.id])

  return (
    <Item as="li">
      <PostTitle as="h5">{post.title}</PostTitle>
      <Divider variant="horizontal" />
      <PostDescription>{post.body}</PostDescription>
      <PostActionBar>
        <Link href={path.page.post(post.id)}>
          <PostLink as="a">More</PostLink>
        </Link>
        <DeletePostButton onClick={handleDispatchDeletePost}>Delete</DeletePostButton>
      </PostActionBar>
    </Item>
  )
}

export default memo(PostItem)
