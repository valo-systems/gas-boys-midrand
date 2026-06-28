import { Link } from 'react-router-dom'
import { Truck, Wrench, Gear, SealCheck, ArrowRight } from '@phosphor-icons/react'
import { services } from '../data/mock'

const iconMap: Record<string, React.ElementType> = { Truck, Wrench, Gear, SealCheck }

export default function Services() {
  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
        <div className="section-label mb-3">What We Offer</div>
        <h1 className="font-display text-6xl md:text-7xl mb-4">OUR <span className="text-yellow-500">SERVICES</span></h1>
        <p className="text-gas-muted text-lg max-w-xl mb-16">LPG gas deliveries, professional repairs, certified installations and compliance certificates — all under one roof in Midrand.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map(s => {
            const Icon = iconMap[s.icon]
            return (
              <div key={s.id} className="card p-8 hover:border-yellow-500/30 transition-all duration-200 group">
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-500/20 transition-colors">
                    <Icon size={26} weight="duotone" className="text-yellow-500" />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-xl mb-1">{s.title}</h2>
                    <div className="text-sm text-yellow-500 font-medium">{s.tagline}</div>
                  </div>
                </div>
                <p className="text-gas-muted text-sm leading-relaxed mb-5">{s.description}</p>
                <ul className="space-y-2 mb-6">
                  {s.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gas-text2">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to={s.ctaLink} className="btn-primary text-sm py-2.5">
                  {s.cta} <ArrowRight size={14} weight="bold" />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
