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
            <div className="bg-light-gray min-h-screen min-w-screen w-[100%] overflow-hidden">
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
