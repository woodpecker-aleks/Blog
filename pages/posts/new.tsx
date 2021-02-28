import Navigation from '@components/Navigation'
import Container from '@components/Container'
import { NextPage } from 'next'
import Head from 'next/head'
import { H2 } from '@components/Typography'
import PostCreator from '@components/PostCreator'

const NewPostPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Posts page</title>
      </Head>
      <Container>
        <Navigation />
        <H2>Create new post</H2>
        <PostCreator />
      </Container>
    </>
  )
}

export default NewPostPage
