import { Link } from 'react-router-dom'
import { Truck, Wrench, Gear, SealCheck, Fire, ArrowRight, ChatsCircle, CheckCircle } from '@phosphor-icons/react'
import ReviewsWidget from '../components/ReviewsWidget'

const services = [
  { icon: Truck, label: 'Gas Deliveries', desc: 'All sizes. Door-to-door or drive-through collection.', to: '/services/deliveries' },
  { icon: Wrench, label: 'Gas Repairs', desc: 'Qualified techs. Appliances, pipes and regulators.', to: '/services/repairs' },
  { icon: Gear, label: 'Installations', desc: 'Residential, commercial and industrial installs.', to: '/services/installations' },
  { icon: SealCheck, label: 'CoC Certificate', desc: 'Compliance certs and annual inspections.', to: '/services/coc' },
]

const steps = [
  { n: 1, title: 'Pick your size', sub: '9kg, 19kg or 48kg' },
  { n: 2, title: 'Enter address', sub: 'Delivery or collection' },
  { n: 3, title: 'Confirm order', sub: 'Under 60 seconds' },
  { n: 4, title: 'We deliver', sub: 'Pay on delivery' },
]

export default function Home() {
  return (
    <div className="pt-16">
      {/* ── Hero ── */}
      <section className="relative min-h-[90vh] flex items-center bg-grad-hero overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(255,214,0,0.1)_0%,transparent_65%)]" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-semibold tracking-widest uppercase mb-6">
              <SealCheck size={12} weight="duotone" /> Midrand's Trusted LPG Supplier
            </div>
            <h1 className="font-display text-[80px] md:text-[100px] leading-[0.88] text-gas-text mb-6">
              FAST<br />
              <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">GAS.</span><br />
              YOUR WAY.
            </h1>
            <p className="text-base md:text-lg text-gas-muted max-w-md leading-relaxed mb-8">
              Deliveries, repairs, installations and compliance certificates. Drive-through or door-to-door across Midrand and Gauteng.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <Link to="/order" className="btn-primary text-base py-3.5 px-7">
                <Fire size={18} weight="fill" /> Order Gas Now
              </Link>
              <Link to="/book" className="btn-ghost text-base py-3.5 px-7">
                Book a Service <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="badge-yellow"><CheckCircle size={11} weight="fill" /> LPG Certified</span>
              <span className="badge-yellow"><CheckCircle size={11} weight="fill" /> SANS Compliant</span>
              <span className="badge-yellow">ORYX Gas</span>
            </div>
          </div>

          {/* Price card */}
          <div className="hidden lg:block">
            <div className="glass p-8 max-w-sm ml-auto">
              <div className="text-xs font-bold tracking-[3px] text-gas-muted uppercase mb-6">ORYX Gas Pricing</div>
              <div className="space-y-3">
                {[['9 kg', 'R180.00'], ['14 kg', 'R292.60'], ['19 kg', 'R395.00'], ['48 kg', 'R970.00']].map(([size, price]) => (
                  <div key={size} className="flex justify-between items-center py-2.5 border-b border-gas-border last:border-0">
                    <div>
                      <div className="font-semibold text-sm">{size} Refill</div>
                      <div className="text-xs text-gas-muted">R20.90/kg</div>
                    </div>
                    <div className="font-display text-2xl text-yellow-500">{price}</div>
                  </div>
                ))}
              </div>
              <Link to="/order" className="btn-primary w-full justify-center mt-6 text-sm">
                <Truck size={15} weight="duotone" /> Order Now — Pay on Delivery
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <div className="border-y border-gas-border bg-gas-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[['9+', 'Cylinder Sizes'], ['R20.90', 'Per Kg — ORYX'], ['5 km', 'Delivery Radius'], ['4.8★', 'Google Rating']].map(([v, l]) => (
            <div key={l} className="text-center py-2">
              <div className="font-display text-2xl text-yellow-500">{v}</div>
              <div className="text-xs text-gas-muted uppercase tracking-widest mt-0.5">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Services ── */}
      <section className="page-section">
        <div className="section-label mb-3">What We Do</div>
        <h2 className="font-display text-5xl md:text-6xl text-gas-text mb-10">
          OUR <span className="text-yellow-500">SERVICES</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map(({ icon: Icon, label, desc, to }) => (
            <Link key={label} to={to} className="card p-6 group hover:border-yellow-500/40 hover:-translate-y-1 transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-5 group-hover:bg-yellow-500/20 transition-colors">
                <Icon size={22} weight="duotone" className="text-yellow-500" />
              </div>
              <div className="font-semibold mb-2">{label}</div>
              <div className="text-sm text-gas-muted leading-relaxed mb-4">{desc}</div>
              <div className="flex items-center gap-1 text-xs text-yellow-500 font-semibold group-hover:gap-2 transition-all">
                Learn more <ArrowRight size={12} weight="bold" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-gas-surface border-y border-gas-border">
        <div className="page-section">
          <div className="section-label mb-3">Simple Process</div>
          <h2 className="font-display text-5xl md:text-6xl mb-10">HOW IT <span className="text-yellow-500">WORKS</span></h2>
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="absolute top-[28px] left-[12%] right-[12%] h-px bg-gradient-to-r from-yellow-500/50 to-orange-500/30 hidden md:block" />
            {steps.map(({ n, title, sub }) => (
              <div key={n} className="relative text-center">
                <div className="w-14 h-14 rounded-full bg-yellow-500 text-black font-display text-2xl flex items-center justify-center mx-auto mb-4 shadow-yellow-glow">{n}</div>
                <div className="font-semibold mb-1">{title}</div>
                <div className="text-sm text-gas-muted">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WhatsApp CTA ── */}
      <section className="page-section">
        <div className="glass p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-display text-4xl md:text-5xl mb-2">PREFER TO <span className="text-yellow-500">WHATSAPP?</span></div>
            <p className="text-gas-muted">Send us a message and we'll sort out your order in minutes.</p>
          </div>
          <a
            href="https://wa.me/27640263510?text=Hi%20Gas%20Boys!%20I%27d%20like%20to%20order%20gas."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-base py-3.5 px-8 flex-shrink-0"
          >
            <ChatsCircle size={20} weight="fill" /> Chat on WhatsApp
          </a>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="bg-gas-surface border-t border-gas-border">
        <div className="page-section">
          <div className="section-label mb-3">Customer Reviews</div>
          <h2 className="font-display text-5xl md:text-6xl mb-10">WHAT THEY <span className="text-yellow-500">SAY</span></h2>
          <ReviewsWidget limit={3} />
        </div>
      </section>
    </div>
  )
}
