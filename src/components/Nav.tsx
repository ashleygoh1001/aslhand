import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { navLinks } from '../data/manual'
import { springBouncy, springSnappy } from '../lib/motion'

const MotionNavLink = motion.create(NavLink)

function linkClassName(isActive: boolean, variant: 'default' | 'cta' = 'default') {
  if (variant === 'cta') {
    return `ml-2 rounded-full border-2 border-pop-ink px-4 py-2 text-sm font-bold ${
      isActive
        ? 'bg-pop-purple text-white shadow-pop-sm'
        : 'bg-pop-coral text-white shadow-pop-sm'
    }`
  }

  return `rounded-full px-3 py-2 text-sm font-medium ${
    isActive
      ? 'bg-pop-mint font-bold italic text-pop-ink'
      : 'text-pop-ink/70'
  }`
}

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const linkMotion = reduceMotion
    ? {}
    : {
        whileHover: { y: -2, scale: 1.04 },
        whileTap: { scale: 0.96 },
        transition: springSnappy,
      }

  return (
    <header
      className={`sticky top-0 z-50 border-b-2 ${
        scrolled
          ? 'border-pop-ink/10 bg-canvas/95 shadow-sm backdrop-blur'
          : 'border-transparent bg-canvas'
      }`}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <MotionNavLink
          to="/"
          className="text-base font-bold italic text-pop-purple sm:text-lg"
          end
          whileHover={
            reduceMotion
              ? undefined
              : { rotate: [-2, 2, 0], scale: 1.05, transition: { duration: 0.35 } }
          }
          whileTap={reduceMotion ? undefined : { scale: 0.95 }}
        >
          Build <span className="not-italic text-pop-coral">Buddy</span>
        </MotionNavLink>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.path}>
              <MotionNavLink
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) => linkClassName(isActive)}
                {...linkMotion}
              >
                {link.label}
              </MotionNavLink>
            </li>
          ))}
          <li>
            <MotionNavLink
              to="/build-manual"
              className={({ isActive }) => linkClassName(isActive, 'cta')}
              whileHover={reduceMotion ? undefined : { y: -3, scale: 1.06 }}
              whileTap={reduceMotion ? undefined : { scale: 0.95 }}
              transition={springBouncy}
            >
              Start building
            </MotionNavLink>
          </li>
        </ul>

        <motion.button
          type="button"
          className="rounded-full border-2 border-pop-ink p-2 text-pop-ink hover:bg-pop-lemon md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
          whileTap={reduceMotion ? undefined : { scale: 0.9 }}
          transition={springSnappy}
        >
          <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </motion.button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="border-t-2 border-pop-ink/10 bg-canvas px-4 py-4 md:hidden"
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1, height: 'auto' }}
            exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
            transition={springBouncy}
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.path}
                  initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                  animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, ...springSnappy }}
                >
                  <NavLink
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) =>
                      `block rounded-full px-3 py-2 text-base font-medium ${
                        isActive
                          ? 'bg-pop-mint font-bold italic text-pop-ink'
                          : 'text-pop-ink/70'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.li>
              ))}
              <motion.li
                initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.04, ...springSnappy }}
              >
                <NavLink
                  to="/build-manual"
                  className={({ isActive }) =>
                    `mt-2 block rounded-full border-2 border-pop-ink px-3 py-2 text-center text-base font-bold ${
                      isActive ? 'bg-pop-purple text-white' : 'bg-pop-coral text-white'
                    }`
                  }
                >
                  Start building
                </NavLink>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
