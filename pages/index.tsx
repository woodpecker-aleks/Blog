import Navigation from '@components/Navigation'
import Container from '@components/Container'
import { H1 } from '@components/Typography'
import Main from '@components/Main'
import { NextPage } from 'next'
import Head from 'next/head'

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Container>
        <Navigation />
        <Main>
          <H1 as="h1">Welcome to my blog!</H1>
        </Main>
      </Container>
    </>
  )
}

export default HomePage
