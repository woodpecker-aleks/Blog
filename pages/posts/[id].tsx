import Navigation from '@components/Navigation'
import Container from '@components/Container'
import styled from 'styled-components'
import Paper from '@components/Paper'
import { NextPage, NextPageContext } from 'next'
import { H2, Typography } from '@components/Typography'
import Divider from '@components/Divider'
import { initializeStore } from '@redux/store'
import { currentPostSliceSelector, fetchCurrentPost } from '@redux/currentPostReducer'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@components/Button'
import { useRouter } from 'next/dist/client/router'
import { useLayoutEffect } from 'react'
import Head from 'next/head'
import { PENDING } from '@utils/constants'
import Progress from '@components/Progress'

const PostBody = styled(Paper)`
  flex-direction: column;
  align-items: flex-start;
  margin-block: ${({ theme }) => theme.spacing}px;
`

const PostTitle = styled(H2)`
  padding-inline: ${({ theme }) => theme.spacing}px;
`

const PostDescription = styled(Typography)`
  padding-inline: ${({ theme }) => theme.spacing}px;
  margin-bottom: ${({ theme }) => theme.spacing * 2}px;
`

const EditPostButton = styled(Button)`
  margin-block: ${({ theme }) => theme.spacing}px;
  margin-right: ${({ theme }) => theme.spacing}px;
`

const PostProgress = styled(Progress)`
  margin-top: ${({ theme }) => theme.spacing * 5}px;
  margin-inline: auto;
`

interface PostPageProps {
  serverRender: boolean
  error: boolean
}

const PostPage: NextPage<PostPageProps> = ({ serverRender }) => {
  const { post, fetchStatus } = useSelector(currentPostSliceSelector)

  const dispatch = useDispatch()

  const router = useRouter()

  const postId = Number(router.query.id)

  useLayoutEffect(() => {
    if (!serverRender) dispatch(fetchCurrentPost(postId))
  }, [serverRender])

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Container>
        <Navigation />
        {fetchStatus === PENDING ? (
          <PostProgress />
        ) : (
          <PostBody>
            <PostTitle>{post.title}</PostTitle>
            <Divider variant="horizontal" />
            <PostDescription>{post.body}</PostDescription>
            <Divider variant="horizontal" />
            <EditPostButton>Edit</EditPostButton>
          </PostBody>
        )}
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

  if (req) await store.dispatch(fetchCurrentPost(postId))
  else serverRender = false

  return { initialReduxState: store.getState(), serverRender }
}

export default PostPage
