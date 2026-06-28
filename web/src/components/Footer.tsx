import { Link } from 'react-router-dom'
import { MapPin, Phone, Envelope, Fire } from '@phosphor-icons/react'
import { contactInfo } from '../data/mock'

export default function Footer() {
  return (
    <footer className="bg-gas-surface border-t border-gas-border mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-yellow-500 flex items-center justify-center">
              <Fire size={15} weight="fill" className="text-black" />
            </div>
            <span className="font-display text-xl bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent leading-none pt-1">THE GAS BOYS</span>
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
            {['Gas Deliveries', 'Gas Repairs', 'Installations', 'CoC Certificate', 'Bulk Supply'].map(s => (
              <Link key={s} to="/services" className="text-sm text-gas-muted hover:text-yellow-500 transition-colors">{s}</Link>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <div className="section-label mb-4">Quick Links</div>
          <div className="flex flex-col gap-2.5">
            {[['Order Gas', '/order'], ['Shop', '/shop'], ['Book a Service', '/book'], ['Bulk Quote', '/quote'], ['About Us', '/about'], ['Our Pitch', '/pitch']].map(([l, to]) => (
              <Link key={to} to={to} className="text-sm text-gas-muted hover:text-yellow-500 transition-colors">{l}</Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <div className="section-label mb-4">Contact</div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2.5 text-sm text-gas-muted">
              <MapPin size={15} className="text-yellow-500 mt-0.5 flex-shrink-0" weight="duotone" />
              <span>{contactInfo.address}</span>
            </div>
            <a href={`tel:${contactInfo.phone1.replace(/\s/g,'')}`} className="flex gap-2.5 text-sm text-gas-muted hover:text-yellow-500 transition-colors">
              <Phone size={15} className="text-yellow-500 flex-shrink-0" weight="fill" />
              {contactInfo.phone1}
            </a>
            <a href={`mailto:${contactInfo.email}`} className="flex gap-2.5 text-sm text-gas-muted hover:text-yellow-500 transition-colors">
              <Envelope size={15} className="text-yellow-500 flex-shrink-0" weight="duotone" />
              {contactInfo.email}
            </a>
            <div className="text-sm text-gas-muted">Mon–Fri: 8am – 5pm</div>
          </div>
        </div>
      </div>

      <div className="border-t border-gas-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-gas-muted2">
          <span>© 2026 The Gas Boys Midrand. All rights reserved.</span>
          <span>218 Whisken Road, Crowthorne, Midrand · SAQCC Gas Registered</span>
        </div>
      </div>
    </footer>
  )
}
