import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Phone, List, X, MagnifyingGlass } from '@phosphor-icons/react'
import logo from '/logo/gas-boys-logo-transparent-256.png'

const links = [
  { label: 'Order Gas', to: '/order' },
  { label: 'Services', to: '/services' },
  { label: 'Shop', to: '/shop' },
  { label: 'Safety', to: '/safety' },
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
          <Link to="/" className="flex items-center">
            <img src={logo} alt="The Gas Boys Midrand" className="h-10 w-auto" />
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
            <Link
              to="/track"
              className={`flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg transition-colors ${
                location.pathname === '/track' ? 'text-yellow-500 bg-gas-card' : 'text-gas-muted hover:text-gas-text hover:bg-gas-card/50'
              }`}
            >
              <MagnifyingGlass size={14} weight="bold" />
              Track Order
            </Link>
            <Link to="/order" className="btn-primary text-sm py-2 px-4 rounded-lg">
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
            <Link to="/track" className="px-4 py-3.5 text-lg font-medium text-gas-text2 border-b border-gas-border flex items-center gap-2">
              <MagnifyingGlass size={18} /> Track My Order
            </Link>
          </div>
          <div className="mt-6 flex flex-col gap-3">
            <Link to="/order" className="btn-primary justify-center text-base py-3.5">
              Order Gas Now
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
