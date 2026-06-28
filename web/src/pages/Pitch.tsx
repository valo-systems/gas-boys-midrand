import { Link } from 'react-router-dom'
import { WarningCircle, CheckCircle, ArrowRight, Truck, Phone, ChatsCircle, Fire, SealCheck, Scales, Receipt, Bell, ArrowSquareOut } from '@phosphor-icons/react'

const painPoints = [
  {
    n: '01',
    label: 'Underfilling',
    title: 'Customers are weighing cylinders at home — and posting about it.',
    count: '8 of 28 one-star reviews',
    countSub: 'explicitly name underfilling as the reason',
    quotes: [
      { text: 'I paid for 9kg. I weighed it at home — it contained only 6.8kg.', meta: 'Google Review · 2023' },
      { text: 'Was a loyal customer for 5 years until I realised they were underfilling 9kg cylinders. Stopped using them last year.', meta: 'Google Review · 2022' },
    ],
    fix: 'Every order on the platform shows cylinder size, quantity, R/kg rate and total in writing — and prints an order reference. That paper trail creates accountability at the point of filling.',
    fixItems: ['Weight and price locked at checkout', 'Order reference on every confirmation', 'R20.90/kg displayed throughout — no ambiguity'],
  },
  {
    n: '02',
    label: 'Delivery Failures',
    title: 'Customers paid, waited days, then couldn\'t reach anyone.',
    count: '8 of 28 one-star reviews',
    countSub: 'describe paid orders that were never delivered',
    quotes: [
      { text: 'I\'m still waiting for my delivery after 3 days. Most of the time they don\'t pick up. They are ignoring me.', meta: 'Google Review · 2023' },
      { text: 'GAS BOYS took my cylinder and money and have still not delivered. Never use them!', meta: 'Google Review · 2023' },
    ],
    fix: 'Online ordering creates a timestamped record the moment the customer submits. They receive an order reference and your WhatsApp number in one tap — no payment taken without a digital trail.',
    fixItems: ['Instant order reference (e.g. GB-10482)', 'WhatsApp button pre-loaded with order details', 'Pay on delivery — no payment before delivery'],
  },
  {
    n: '03',
    label: 'Communication Blackout',
    title: 'Both phone numbers ring out. Emails go unanswered.',
    count: '5 complaints',
    countSub: 'about phones not being answered or no response to follow-ups',
    quotes: [
      { text: 'Both the phone numbers just ring out, so I went there to find the manager chatting on a personal phone call.', meta: 'Google Review · 2022' },
      { text: 'I\'m in need of the gas I paid for and most of the time they don\'t pick up.', meta: 'Google Review · 2023' },
    ],
    fix: 'Customers can order, book a service, request a quote and get their confirmation entirely online — without needing to call. WhatsApp is the fallback, not the primary channel.',
    fixItems: ['Full order flow with no phone call needed', 'Service bookings and bulk quotes online', 'WhatsApp pre-fills with customer\'s order details'],
  },
  {
    n: '04',
    label: 'Frontline Gate-Keeping',
    title: 'A single dismissive response lost a paying customer at the door.',
    count: '3 complaints',
    countSub: 'about staff turning customers away without exploring options',
    quotes: [
      { text: 'If the first response is "Sorry, we don\'t deliver 9kgs" — guess what? I\'ve checked out. You are losing business over silly mistakes.', meta: 'Google Review · 2024' },
      { text: 'By the time she offered an alternative, I was not interested. Customer value includes an experience of a company that actually wants my business.', meta: 'Google Review · 2024' },
    ],
    fix: 'The order page is self-service. The customer picks their size, enters their address, sees the price and confirms — zero gatekeeping. Staff only touch the order once it\'s placed.',
    fixItems: ['Self-service 3-step order flow', 'All sizes from 3kg to 48kg visible upfront', 'No staff interaction needed to place an order'],
  },
]

const features = [
  { icon: Fire, label: 'Online Order Flow', desc: '3-step order — size, details, confirm. Under 60 seconds. Works on any device.' },
  { icon: Receipt, label: 'Order Reference Numbers', desc: 'Every order gets a GB-XXXXX reference. Customer has it, you have it.' },
  { icon: ChatsCircle, label: 'WhatsApp Integration', desc: 'Pre-filled message with cylinder size and delivery address. One tap to confirm.' },
  { icon: Truck, label: 'Delivery Info Captured', desc: 'Full address, phone, email and special instructions stored per order.' },
  { icon: Scales, label: 'Transparent kg Pricing', desc: 'R20.90/kg shown on every size. No room for confusion or dispute.' },
  { icon: Bell, label: 'Service Bookings', desc: 'Repairs, installations and CoC certificates bookable online.' },
  { icon: SealCheck, label: 'Quote System', desc: 'Bulk and commercial clients submit volume requests directly.' },
  { icon: Phone, label: 'Admin Dashboard', desc: 'Live order, booking and quote management — one screen.' },
]

export default function Pitch() {
  return (
    <div className="pt-16 min-h-screen">
      {/* Hero */}
      <section className="relative bg-grad-hero border-b border-gas-border overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(255,214,0,0.08)_0%,transparent_65%)]" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-semibold tracking-widest uppercase mb-6">
            <Fire size={11} weight="fill" /> Based on 139 Google Reviews
          </div>
          <h1 className="font-display text-[64px] md:text-[88px] leading-[0.88] mb-6">
            WE READ YOUR<br />
            <span className="text-yellow-500">REVIEWS.</span>
          </h1>
          <p className="text-lg text-gas-muted max-w-xl leading-relaxed mb-8">
            139 Google reviews. 28 one-star. Four complaints that repeat over and over.
            We built a platform that addresses every single one — and this site is the proof of concept.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/order" className="btn-primary py-3.5 px-7 text-base">
              Try the Demo <ArrowRight size={16} weight="bold" />
            </Link>
            <a
              href="https://www.google.com/maps/place/The+Gas+Boys+Midrand"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost py-3.5 px-7 text-base"
            >
              View Reviews <ArrowSquareOut size={16} weight="bold" />
            </a>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="border-b border-gas-border bg-gas-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            ['139', 'Total Google Reviews'],
            ['28', 'One-Star Reviews'],
            ['4', 'Recurring Complaints'],
            ['4.0★', 'Avg — could be higher'],
          ].map(([v, l]) => (
            <div key={l}>
              <div className="font-display text-3xl text-yellow-500">{v}</div>
              <div className="text-xs text-gas-muted uppercase tracking-widest mt-0.5">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pain points */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="section-label mb-3">The Pattern</div>
        <h2 className="font-display text-5xl md:text-6xl mb-4">
          FOUR PROBLEMS.<br /><span className="text-yellow-500">ONE PLATFORM.</span>
        </h2>
        <p className="text-gas-muted mb-12 max-w-xl">These aren't random complaints. They're the same four issues — repeated across years and dozens of reviewers. All of them are operational and all of them are fixable with the right tools.</p>

        <div className="space-y-8">
          {painPoints.map((p) => (
            <div key={p.n} className="card rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="px-6 pt-6 pb-5 border-b border-gas-border flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-display text-4xl text-gas-border">{p.n}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <WarningCircle size={14} weight="fill" className="text-red-400" />
                      <span className="text-xs font-bold tracking-widest uppercase text-red-400">{p.label}</span>
                    </div>
                    <div className="font-semibold text-gas-text">{p.title}</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-display text-xl text-red-400">{p.count}</div>
                  <div className="text-xs text-gas-muted">{p.countSub}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Quotes */}
                <div className="px-6 py-5 border-b md:border-b-0 md:border-r border-gas-border space-y-4">
                  <div className="text-xs font-bold tracking-widest uppercase text-gas-muted mb-3">What customers wrote</div>
                  {p.quotes.map((q, i) => (
                    <div key={i} className="pl-3 border-l-2 border-red-500/40">
                      <p className="text-sm text-gas-text2 leading-relaxed italic">"{q.text}"</p>
                      <p className="text-xs text-gas-muted mt-1.5">{q.meta}</p>
                    </div>
                  ))}
                </div>

                {/* Fix */}
                <div className="px-6 py-5 bg-green-500/5">
                  <div className="text-xs font-bold tracking-widest uppercase text-green-400 mb-3">What the platform does</div>
                  <p className="text-sm text-gas-muted leading-relaxed mb-4">{p.fix}</p>
                  <ul className="space-y-2">
                    {p.fixItems.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <CheckCircle size={14} weight="fill" className="text-green-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What's built */}
      <section className="bg-gas-surface border-y border-gas-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="section-label mb-3">What's Live</div>
          <h2 className="font-display text-5xl md:text-6xl mb-3">
            ALREADY <span className="text-yellow-500">BUILT.</span>
          </h2>
          <p className="text-gas-muted mb-10 max-w-xl">Every page you've navigated on this site is a working feature — not a mockup. Here's what's in the platform today.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="card p-5">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-4">
                  <Icon size={18} weight="duotone" className="text-yellow-500" />
                </div>
                <div className="font-semibold text-sm mb-1.5">{label}</div>
                <div className="text-xs text-gas-muted leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we haven't done yet */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="section-label mb-3">Next Steps</div>
        <h2 className="font-display text-5xl md:text-6xl mb-3">
          WHAT COMES <span className="text-yellow-500">NEXT.</span>
        </h2>
        <p className="text-gas-muted mb-10 max-w-xl">The demo is frontend only. If you say yes, here's what gets wired up.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { n: '1', title: 'Backend & Orders DB', desc: 'Orders, bookings and quotes stored in a real database. Admin dashboard goes live with real data.' },
            { n: '2', title: 'WhatsApp Notifications', desc: 'Automated order confirmations sent to customer and driver via WhatsApp API on order placement.' },
            { n: '3', title: 'Domain & Hosting', desc: 'Custom domain, SSL, production hosting. Site goes live and replaces or supplements the current Google Business presence.' },
          ].map(({ n, title, desc }) => (
            <div key={n} className="glass p-6">
              <div className="font-display text-5xl text-yellow-500/30 mb-3">{n}</div>
              <div className="font-semibold mb-2">{title}</div>
              <div className="text-sm text-gas-muted leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gas-surface border-t border-gas-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 text-center">
          <div className="section-label mb-4">The Demo</div>
          <h2 className="font-display text-6xl md:text-7xl mb-4">
            YOU'RE ALREADY <span className="text-yellow-500">ON IT.</span>
          </h2>
          <p className="text-gas-muted text-lg max-w-lg mx-auto mb-10">
            Every page on this site is a live feature built for The Gas Boys Midrand.
            Place an order. Book a service. See the admin panel.
            This is what your customers would use from day one.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/order" className="btn-primary text-base py-3.5 px-8">
              <Fire size={18} weight="fill" /> Place a Test Order
            </Link>
            <Link to="/admin" className="btn-ghost text-base py-3.5 px-8">
              View Admin Panel <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
