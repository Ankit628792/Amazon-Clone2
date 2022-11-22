import { Provider } from 'react-redux'
import { store } from '../app/store'
import '../styles/globals.css'
import { Provider as AuthProvider } from 'next-auth/client'
import Router from 'next/router'
import ProgressBar from '@badrap/bar-of-progress'
import Head from 'next/head'

const progress = new ProgressBar({
  size: 3,
  color: '#fbbf24',
  className: "z-50",
  delay: 100
})

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Amazon 2.0</title>
        <link rel='icon' href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta charSet="UTF-8" />
        <meta name="description" content="Amazon 2.0 - This is a Amazon Shopping Site's clone version. Here we can able to add your items to the cart and also able to purchase the products using your card via stripe payment method" />
        <meta name="author" content="@ankit_628792" />
        <meta name='theme-color' content='#fbbf24' />
      </Head>
      <AuthProvider session={pageProps.session}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </AuthProvider>
    </>
  )
}

export default MyApp
