import { ReactNode } from 'react'
import Head from 'next/head'
import AnimationWrapper from 'components/AnimationWrapper'
import Navbar from 'components/Navbar'
import { Toaster } from 'react-hot-toast'

const BaseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Head>
        <title>Blog Site Fun 🎉</title>
      </Head>
      <div className="min-h-screen w-full overflow-hidden bg-light-gray">
        <Navbar />
        <AnimationWrapper>
          <main className="my-20 px-[10%] py-[5%] xl:px-[20%]">{children}</main>
        </AnimationWrapper>
        <Toaster />
      </div>
    </>
  )
}

export default BaseLayout
