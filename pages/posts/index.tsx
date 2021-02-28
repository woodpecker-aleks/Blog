import Navigation from '@components/Navigation'
import Container from '@components/Container'
import { fetchPosts, postsSliceSelector } from '@redux/postsReducer'
import { useSelector } from 'react-redux'
import PostsList from '@components/PostsList'
import { initializeStore } from '@redux/store'

const Posts = () => {
  const { posts } = useSelector(postsSliceSelector)

  return (
    <Container>
      <Navigation />
      <PostsList posts={posts} />
    </Container>
  )
}

Posts.getInitialProps = async () => {
  const store = initializeStore()

  await store.dispatch(fetchPosts())

  return { initialReduxState: store.getState() }
}

export default Posts
