import { Truck, Wrench, Gear, SealCheck, Users, Storefront, Clipboard } from '@phosphor-icons/react'
import { credentials, overallRating } from '../data/mock'
import ReviewsWidget from '../components/ReviewsWidget'
import { Link } from 'react-router-dom'

const iconMap: Record<string, React.ElementType> = { Truck, Wrench, Gear, SealCheck, Users, Storefront, Clipboard }

export default function About() {
  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="section-label mb-3">Our Story</div>
            <h1 className="font-display text-6xl md:text-7xl mb-6">ABOUT <span className="text-yellow-500">US</span></h1>
            <p className="text-gas-muted text-base leading-relaxed mb-4">
              The Gas Boys Midrand is a registered LPG gas supplier based in Crowthorne, Midrand. We supply ORYX gas directly from refineries to residential, commercial and industrial clients across Gauteng.
            </p>
            <p className="text-gas-muted text-base leading-relaxed mb-6">
              Our team of SAQCC Gas-registered technicians handles everything from cylinder deliveries and appliance repairs to full gas installations and compliance certificates — all under one roof.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="badge-yellow">SAQCC Gas Registered</span>
              <span className="badge-yellow">LPG Safety Association</span>
              <span className="badge-yellow">SANS 10087 Compliant</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[['9+', 'Cylinder Sizes'], ['48kg', 'Largest Cylinder'], [`${overallRating.total}+`, 'Google Reviews'], [`${overallRating.average}★`, 'Average Rating']].map(([v, l]) => (
              <div key={l} className="card p-6 text-center">
                <div className="font-display text-5xl text-yellow-500 mb-1">{v}</div>
                <div className="text-sm text-gas-muted">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Credentials */}
        <div className="mb-20">
          <div className="section-label mb-3">Why Choose Us</div>
          <h2 className="font-display text-5xl mb-10">OUR <span className="text-yellow-500">CREDENTIALS</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {credentials.map(c => {
              const Icon = iconMap[c.icon]
              return (
                <div key={c.title} className="card p-6">
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-4">
                    <Icon size={22} weight="duotone" className="text-yellow-500" />
                  </div>
                  <div className="font-semibold mb-2">{c.title}</div>
                  <div className="text-sm text-gas-muted leading-relaxed">{c.body}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-16">
          <div className="section-label mb-3">Customer Reviews</div>
          <h2 className="font-display text-5xl mb-10">WHAT CLIENTS <span className="text-yellow-500">SAY</span></h2>
          <ReviewsWidget limit={6} />
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-10 text-center">
          <h3 className="font-display text-5xl mb-3">READY TO <span className="text-yellow-500">ORDER?</span></h3>
          <p className="text-gas-muted mb-6">Fast delivery, great prices, ORYX Gas quality you can trust.</p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link to="/order" className="btn-primary text-base py-3.5 px-8">Order Gas Now</Link>
            <Link to="/contact" className="btn-ghost text-base py-3.5 px-8">Get in Touch</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
