import { FC, memo } from 'react'
import styled from 'styled-components'
import { Post } from '@utils/types'
import PostItem from '@components/PostItem'

interface PostsListProps {
  posts: Post[]
}

const List = styled.ul`
  display: flex;
  flex-direction: column;
`

const PostsList: FC<PostsListProps> = ({ posts }) => {
  return (
    <List>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </List>
  )
}

export default memo(PostsList)
