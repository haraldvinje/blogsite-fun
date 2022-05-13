import { ReactNode } from 'react'
import Head from 'next/head'
import AnimationLayout from 'components/Layouts/AnimationLayout'
import Navbar from 'components/Navbar'
import { Toaster } from 'react-hot-toast'

const BaseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Head>
        <title>Blog Site Fun 🎉</title>
      </Head>
      <div className="min-h-screen w-[100%] overflow-hidden bg-light-gray">
        <Navbar />
        <AnimationLayout>
          <main className="my-20 py-[5%] px-[10%] xl:px-[20%]">{children}</main>
        </AnimationLayout>
        <Toaster />
      </div>
    </>
  )
}

export default BaseLayout
