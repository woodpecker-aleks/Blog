import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { useStore } from '../redux/store'
import theme from '../theme'

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}
