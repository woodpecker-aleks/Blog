import Navigation from '@components/Navigation'
import Container from '@components/Container'
import { H1 } from '@components/Typography'
import Main from '@components/Main'

const Index = () => {
  return (
    <Container>
      <Navigation />
      <Main>
        <H1 as="h1">Welcome to my blog!</H1>
      </Main>
    </Container>
  )
}

export default Index
