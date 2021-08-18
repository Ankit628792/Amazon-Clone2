import { Provider } from 'react-redux'
import { store } from '../app/store'
import '../styles/globals.css'
import { Provider as AuthProvider } from 'next-auth/client'
import Router from 'next/router'
import ProgressBar from '@badrap/bar-of-progress'

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
    <AuthProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </AuthProvider>
  )
}

export default MyApp
