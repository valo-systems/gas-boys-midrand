import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Phone, List, X, Fire } from '@phosphor-icons/react'

const links = [
  { label: 'Order Gas', to: '/order' },
  { label: 'Services', to: '/services' },
  { label: 'Shop', to: '/shop' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gas-bg/95 backdrop-blur-xl border-b border-gas-border shadow-xl' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-yellow-500 flex items-center justify-center">
              <Fire size={16} weight="fill" className="text-black" />
            </div>
            <span className="font-display text-2xl bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent leading-none pt-1">
              THE GAS BOYS
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === l.to || location.pathname.startsWith(l.to + '/') ? 'text-gas-text bg-gas-card' : 'text-gas-muted hover:text-gas-text hover:bg-gas-card/50'}`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:0114681130" className="flex items-center gap-1.5 text-sm text-gas-muted hover:text-gas-text transition-colors">
              <Phone size={14} weight="fill" />
              011 468 1130
            </a>
            <Link to="/order" className="btn-primary text-sm py-2 px-4 rounded-lg">
              <Fire size={14} weight="fill" />
              Order Gas
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-gas-text p-1">
            {open ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-40 bg-gas-bg/98 backdrop-blur-xl flex flex-col pt-20 px-6 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map(l => (
              <Link key={l.to} to={l.to} className="px-4 py-3.5 text-lg font-medium text-gas-text2 border-b border-gas-border">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3">
            <Link to="/order" className="btn-primary justify-center text-base py-3.5">
              <Fire size={18} weight="fill" /> Order Gas Now
            </Link>
            <a href="tel:0114681130" className="btn-ghost justify-center text-base py-3.5">
              <Phone size={18} weight="fill" /> 011 468 1130
            </a>
          </div>
        </div>
      )}
    </>
  )
}
