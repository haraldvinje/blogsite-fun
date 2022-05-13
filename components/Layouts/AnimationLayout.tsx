import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion'
import { fadeIn } from 'lib/animations'

const AnimationLayout = ({ children }: { children: ReactNode }) => {
  const animation = fadeIn
  const router = useRouter()

  return (
    <div>
      <LazyMotion features={domAnimation}>
        <AnimatePresence exitBeforeEnter>
          <m.div
            key={router.route.concat(animation.name)}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={animation.variants}
            transition={animation.transition}
          >
            {children}
          </m.div>
        </AnimatePresence>
      </LazyMotion>
    </div>
  )
}

export default AnimationLayout
