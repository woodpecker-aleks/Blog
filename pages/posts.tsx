import Navigation from '../components/Navigation'
import Container from '../components/Container'
import { fetchPosts } from '../redux/postsReducer'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const Posts = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  return (
    <Container>
      <Navigation />
    </Container>
  )
}

export default Posts
