import { ReactNode } from 'react'
import AnimationLayout from './AnimationLayout'
import Navbar from '../Navbar'
import { Toaster } from 'react-hot-toast'

const BaseLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="bg-light-gray min-h-screen min-w-screen w-[100%] overflow-hidden">
            <Navbar />
            <AnimationLayout>
                <main className="my-20 py-[5%] px-[10%] xl:px-[20%]">{children}</main>
            </AnimationLayout>
            <Toaster />
        </div>
    )
}

export default BaseLayout
