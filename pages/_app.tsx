import { Provider } from 'react-redux'
import { useStore } from '@redux/store'
import { ThemeProvider } from 'styled-components'
import theme from '@utils/theme'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <>
      <Head>
        <title>Testing work</title>
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  )
}
