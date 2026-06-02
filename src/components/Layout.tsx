import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useLocation, useOutlet } from 'react-router-dom'
import { pageTransition } from '../lib/motion'
import { Footer } from './Footer'
import { Nav } from './Nav'
import { ScrollToTop } from './ScrollToTop'

export function Layout() {
  const location = useLocation()
  const outlet = useOutlet()
  const reduceMotion = useReducedMotion()

  return (
    <>
      <ScrollToTop />
      <Nav />
      <main className="min-h-[calc(100vh-8rem)] overflow-x-clip">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={pageTransition}
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}
