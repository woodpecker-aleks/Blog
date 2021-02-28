import Navigation from '@components/Navigation'
import Container from '@components/Container'
import { fetchPosts, postsSliceSelector } from '@redux/postsReducer'
import { useSelector, useDispatch } from 'react-redux'
import PostsList from '@components/PostsList'
import { initializeStore } from '@redux/store'
import { NextPage } from 'next'
import { PENDING } from '@utils/constants'
import { useLayoutEffect } from 'react'
import Head from 'next/head'

interface PostsPageProps {
  serverRender: boolean
}

const PostsPage: NextPage<PostsPageProps> = ({ serverRender }) => {
  const { posts, fetchStatus } = useSelector(postsSliceSelector)

  const dispatch = useDispatch()

  useLayoutEffect(() => {
    if (!serverRender) dispatch(fetchPosts())
  }, [serverRender])

  return (
    <>
      <Head>
        <title>Posts page</title>
      </Head>
      <Container>
        <Navigation />
        <PostsList posts={posts} loading={fetchStatus === PENDING} />
      </Container>
    </>
  )
}

PostsPage.getInitialProps = async ({ req }) => {
  const store = initializeStore()
  let serverRender = true

  if (req) await store.dispatch(fetchPosts())
  else serverRender = false

  return { initialReduxState: store.getState(), serverRender }
}

export default PostsPage
