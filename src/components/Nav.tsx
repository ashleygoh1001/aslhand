import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { navLinks } from '../data/manual'

function linkClassName(isActive: boolean, variant: 'default' | 'cta' = 'default') {
  if (variant === 'cta') {
    return `ml-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-dartmouth-green-dark text-white'
        : 'bg-dartmouth-green text-white hover:bg-dartmouth-green-dark'
    }`
  }

  return `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-dartmouth-green-light text-dartmouth-green'
      : 'text-gray-600 hover:bg-dartmouth-green-light hover:text-dartmouth-green'
  }`
}

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-shadow ${
        scrolled
          ? 'border-gray-200 bg-canvas/95 shadow-sm backdrop-blur'
          : 'border-transparent bg-canvas'
      }`}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <NavLink
          to="/"
          className="text-sm font-semibold text-dartmouth-green sm:text-base"
          end
        >
          ASL Hand
        </NavLink>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) => linkClassName(isActive)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink
              to="/build-manual"
              className={({ isActive }) => linkClassName(isActive, 'cta')}
            >
              Start building
            </NavLink>
          </li>
        </ul>

        <button
          type="button"
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
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
        </button>
      </nav>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-gray-200 bg-canvas px-4 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2 text-base font-medium ${
                      isActive
                        ? 'bg-dartmouth-green-light text-dartmouth-green'
                        : 'text-gray-700 hover:bg-dartmouth-green-light hover:text-dartmouth-green'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink
                to="/build-manual"
                className={({ isActive }) =>
                  `mt-2 block rounded-lg px-3 py-2 text-center text-base font-medium ${
                    isActive
                      ? 'bg-dartmouth-green-dark text-white'
                      : 'bg-dartmouth-green text-white hover:bg-dartmouth-green-dark'
                  }`
                }
              >
                Start building
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
