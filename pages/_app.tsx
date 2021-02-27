import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import store from '../redux/store'
import theme from '../theme'
import App from 'next/app'
import { createWrapper } from 'next-redux-wrapper'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    )
  }
}

const makeStore = () => store

const wrapper = createWrapper(makeStore)

export default wrapper.withRedux(MyApp)
