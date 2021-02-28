import { FC, memo } from 'react'
import styled from 'styled-components'
import { Post } from '@utils/types'
import PostItem from '@components/PostItem'
import { H5 } from './Typography'
import Progress from './Progress'

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  padding-inline: ${({ theme }) => theme.spacing}px;
`

const NoPostsTitle = styled(H5)`
  margin-inline: auto;
`

const PostsProgress = styled(Progress)`
  margin-inline: auto;
  margin-top: ${({ theme }) => theme.spacing * 2}px;
`

interface PostsListProps {
  posts: Post[]
  loading: boolean
}

const PostsList: FC<PostsListProps> = ({ posts, loading }) => {
  let postsList

  if (loading) {
    postsList = <PostsProgress />
  } else if (posts.length) {
    postsList = posts.map((post) => <PostItem key={post.id} post={post} />)
  } else {
    postsList = (
      <NoPostsTitle as="h5" transform="uppercase">
        No posts
      </NoPostsTitle>
    )
  }

  return <List>{postsList}</List>
}

export default memo(PostsList)
