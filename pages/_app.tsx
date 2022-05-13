import 'styles/globals.css'
import BaseLayout from 'components/Layouts/Layout'
import { AppProps } from 'next/app'
import { UserContext } from 'lib/context'
import { useUserData } from 'lib/hooks'

function MyApp({ Component, pageProps }: AppProps) {
  const userData = useUserData()

  return (
    <UserContext.Provider value={userData}>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </UserContext.Provider>
  )
}

export default MyApp
