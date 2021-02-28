import Navigation from '@components/Navigation'
import Container from '@components/Container'
import { NextPage, NextPageContext } from 'next'
import { initializeStore } from '@redux/store'
import { fetchCurrentPost, currentPostSliceSelector } from '@redux/currentPostReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/dist/client/router'
import { useLayoutEffect } from 'react'
import Head from 'next/head'
import { PENDING, REJECTED } from '@utils/constants'
import PostInfo from '@components/PostInfo'

interface PostPageProps {
  readonly serverRender: boolean
  readonly error: boolean
}

const PostPage: NextPage<PostPageProps> = ({ serverRender, error }) => {
  const router = useRouter()

  const { post, fetchStatus, editorMode } = useSelector(currentPostSliceSelector)

  const dispatch = useDispatch()

  useLayoutEffect(() => {
    const postId = Number(router.query.id)

    if (error) router.push('/not-found')

    if (!serverRender) dispatch(fetchCurrentPost(postId))
  }, [serverRender, error, router.query.id])

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Container>
        <Navigation />
        <PostInfo loading={fetchStatus === PENDING} post={post} editorMode={editorMode} />
      </Container>
    </>
  )
}

interface PostPageContext extends NextPageContext {
  query: {
    id: string
  }
}

PostPage.getInitialProps = async ({ query, req }: PostPageContext) => {
  const store = initializeStore()
  const postId = Number(query.id)
  let serverRender = true
  let error = false

  if (req) await store.dispatch(fetchCurrentPost(postId))
  else serverRender = false

  if (store.getState().currentPost.fetchStatus === REJECTED) error = true

  return { initialReduxState: store.getState(), serverRender, error }
}

export default PostPage
