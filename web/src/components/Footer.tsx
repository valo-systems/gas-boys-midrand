import { Link } from 'react-router-dom'
import { MapPin, Phone, Envelope, Lock } from '@phosphor-icons/react'
import { useSettingsStore } from '../stores/useSettingsStore'
import logo from '/logo/gas-boys-logo-transparent-512.png'

export default function Footer() {
  const s = useSettingsStore(st => st.settings)

  return (
    <footer className="bg-gas-surface border-t border-gas-border mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="mb-4">
            <img src={logo} alt={s.businessName} className="h-12 w-auto" />
          </div>
          <p className="text-sm text-gas-muted leading-relaxed mb-4">Midrand's trusted LPG supplier. Fast, safe, certified. ORYX Gas direct from refineries.</p>
          <div className="flex gap-2">
            <span className="badge-yellow">LPG Certified</span>
            <span className="badge-yellow">SANS Compliant</span>
          </div>
        </div>

        {/* Services */}
        <div>
          <div className="section-label mb-4">Services</div>
          <div className="flex flex-col gap-2.5">
            {['Gas Deliveries', 'Gas Repairs', 'Installations', 'CoC Certificate', 'Bulk Supply'].map(sv => (
              <Link key={sv} to="/services" className="text-sm text-gas-muted hover:text-yellow-500 transition-colors">{sv}</Link>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <div className="section-label mb-4">Quick Links</div>
          <div className="flex flex-col gap-2.5">
            {[['Order Gas', '/order'], ['Shop', '/shop'], ['Book a Service', '/book'], ['Gas Safety', '/safety'], ['Bulk Quote', '/quote'], ['About Us', '/about']].map(([l, to]) => (
              <Link key={to} to={to} className="text-sm text-gas-muted hover:text-yellow-500 transition-colors">{l}</Link>
            ))}
          </div>
        </div>

        {/* Contact — driven by settings store */}
        <div>
          <div className="section-label mb-4">Contact</div>
          <div className="flex flex-col gap-3">
            <a href={s.mapUrl} target="_blank" rel="noopener noreferrer" className="flex gap-2.5 text-sm text-gas-muted hover:text-yellow-500 transition-colors">
              <MapPin size={15} className="text-yellow-500 mt-0.5 flex-shrink-0" weight="duotone" />
              {s.address}
            </a>
            <a href={`tel:${s.phone.replace(/\s/g, '')}`} className="flex gap-2.5 text-sm text-gas-muted hover:text-yellow-500 transition-colors">
              <Phone size={15} className="text-yellow-500 flex-shrink-0" weight="fill" />
              {s.phone}
            </a>
            <a href={`mailto:${s.email}`} className="flex gap-2.5 text-sm text-gas-muted hover:text-yellow-500 transition-colors">
              <Envelope size={15} className="text-yellow-500 flex-shrink-0" weight="duotone" />
              {s.email}
            </a>
            <div className="text-sm text-gas-muted">
              Mon–Fri: {s.hours.weekdays}<br />
              Sat: {s.hours.saturday} · Sun: {s.hours.sunday}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gas-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-gas-muted2">
          <span>© 2026 {s.businessName}. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span>{s.address} · SAQCC Gas Registered</span>
            <Link
              to="/admin"
              className="flex items-center gap-1 text-gas-muted2/40 hover:text-gas-muted transition-colors duration-300"
              title="Staff login"
            >
              <Lock size={10} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
