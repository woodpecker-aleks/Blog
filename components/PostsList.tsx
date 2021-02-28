import { FC, memo } from 'react'
import styled from 'styled-components'
import { Post } from '@utils/types'
import PostItem from '@components/PostItem'
import { H5 } from './Typography'

interface PostsListProps {
  posts: Post[]
}

const List = styled.ul`
  display: flex;
  flex-direction: column;
  padding-inline: ${({ theme }) => theme.spacing}px;
`

const NoPostsTitle = styled(H5)`
  margin-inline: auto;
`

const PostsList: FC<PostsListProps> = ({ posts }) => {
  return (
    <List>
      {posts.length ? (
        posts.map((post) => <PostItem key={post.id} post={post} />)
      ) : (
        <NoPostsTitle as="h5" transform="uppercase">
          No posts
        </NoPostsTitle>
      )}
    </List>
  )
}

export default memo(PostsList)
