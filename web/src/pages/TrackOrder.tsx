import { useSearchParams, Link } from 'react-router-dom'
import { useOrderStore, type OrderStatus } from '../stores/useOrderStore'
import {
  ClockCountdown, CheckCircle, Truck, SealCheck,
  ChatsCircle, ArrowRight, MagnifyingGlass, Warning,
} from '@phosphor-icons/react'

// ── Status config ─────────────────────────────────────────────────────────────
const STEPS: { status: OrderStatus; label: string; sub: string; Icon: React.ElementType }[] = [
  { status: 'pending',    label: 'Order Received',    sub: 'Your order is in the queue',         Icon: ClockCountdown },
  { status: 'confirmed',  label: 'Confirmed',          sub: 'We\'ve confirmed your order',        Icon: CheckCircle },
  { status: 'dispatched', label: 'Out for Delivery',   sub: 'Your gas is on the way',             Icon: Truck },
  { status: 'delivered',  label: 'Delivered',          sub: 'Enjoy your gas!',                    Icon: SealCheck },
]

const STATUS_INDEX: Record<OrderStatus, number> = {
  pending: 0, confirmed: 1, dispatched: 2, delivered: 3, cancelled: -1,
}

function fmt(date: Date) {
  return date.toLocaleString('en-ZA', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}

// ── Not found state ───────────────────────────────────────────────────────────
function NotFound({ ref: searchRef }: { ref: string }) {
  return (
    <div className="pt-24 min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-gas-card border border-gas-border flex items-center justify-center mx-auto mb-6">
          <Warning size={40} className="text-yellow-500" weight="duotone" />
        </div>
        <h2 className="font-display text-4xl mb-3">ORDER <span className="text-yellow-500">NOT FOUND</span></h2>
        <p className="text-gas-muted mb-2">We couldn't find an order with reference</p>
        {searchRef && (
          <div className="inline-block bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-4 py-2 mb-4">
            <span className="font-display text-yellow-500">{searchRef}</span>
          </div>
        )}
        <p className="text-gas-muted text-sm mb-8">Double-check your reference number, or contact us via WhatsApp.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={`https://wa.me/27640263510?text=Hi%20Gas%20Boys!%20I%20can%27t%20find%20my%20order%20${searchRef ? encodeURIComponent(searchRef) : ''}.%20Can%20you%20help?`}
            target="_blank" rel="noopener noreferrer"
            className="btn-whatsapp justify-center py-3 px-6"
          >
            <ChatsCircle size={18} weight="fill" /> WhatsApp Us
          </a>
          <Link to="/order" className="btn-ghost justify-center py-3 px-6">Place New Order</Link>
        </div>
      </div>
    </div>
  )
}

// ── Search form (no ref in URL) ───────────────────────────────────────────────
function SearchForm() {
  return (
    <div className="pt-24 min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md w-full">
        <div className="w-20 h-20 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mx-auto mb-6">
          <MagnifyingGlass size={40} className="text-yellow-500" weight="duotone" />
        </div>
        <h2 className="font-display text-4xl mb-2">TRACK YOUR <span className="text-yellow-500">ORDER</span></h2>
        <p className="text-gas-muted mb-8 text-sm">Enter your order reference number to see live status</p>
        <form
          onSubmit={e => {
            e.preventDefault()
            const val = (e.currentTarget.elements.namedItem('ref') as HTMLInputElement).value.trim().toUpperCase()
            if (val) window.location.href = `/track?ref=${val}`
          }}
          className="flex gap-3"
        >
          <input
            name="ref"
            className="input flex-1 text-center font-display text-xl tracking-widest uppercase placeholder:normal-case placeholder:font-body placeholder:text-sm"
            placeholder="e.g. GB-2026-1003"
            autoComplete="off"
          />
          <button type="submit" className="btn-primary px-5">
            <ArrowRight size={18} weight="bold" />
          </button>
        </form>
        <p className="text-xs text-gas-muted mt-4">Your reference was shown on the order confirmation screen</p>
      </div>
    </div>
  )
}

// ── Main track page ───────────────────────────────────────────────────────────
export default function TrackOrder() {
  const [params] = useSearchParams()
  const ref = params.get('ref')?.toUpperCase() ?? ''

  const order = useOrderStore(s => s.orders.find(o => o.ref === ref))

  if (!ref) return <SearchForm />
  if (!order) return <NotFound ref={ref} />

  const currentIdx = STATUS_INDEX[order.status]
  const isCancelled = order.status === 'cancelled'

  const waText = `Hi Gas Boys! I'm checking on my order ${order.ref} for ${order.customer.name}. Current status shows ${order.status}.`

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="section-label mb-2">Live order status</div>
          <h1 className="font-display text-5xl md:text-6xl mb-3">
            TRACK ORDER
          </h1>
          <div className="inline-block bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-5 py-2.5">
            <span className="text-xs text-gas-muted uppercase tracking-widest block mb-0.5">Reference</span>
            <span className="font-display text-2xl text-yellow-500">{order.ref}</span>
          </div>
        </div>

        {/* Cancelled state */}
        {isCancelled && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 mb-8 text-center">
            <Warning size={32} className="text-red-400 mx-auto mb-3" weight="fill" />
            <div className="font-display text-2xl text-red-400 mb-1">ORDER CANCELLED</div>
            <p className="text-sm text-gas-muted">This order was cancelled. Contact us if you need help.</p>
          </div>
        )}

        {/* Status stepper */}
        {!isCancelled && (
          <div className="card p-6 mb-6">
            <div className="relative">
              {/* Progress line */}
              <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-gas-border" />
              <div
                className="absolute left-5 top-5 w-0.5 bg-yellow-500 transition-all duration-700"
                style={{ height: currentIdx > 0 ? `${(currentIdx / (STEPS.length - 1)) * 100}%` : '0%' }}
              />

              <div className="space-y-6">
                {STEPS.map((step, idx) => {
                  const done = idx < currentIdx
                  const active = idx === currentIdx
                  const future = idx > currentIdx
                  const { Icon } = step

                  return (
                    <div key={step.status} className="flex items-start gap-4 relative">
                      {/* Circle */}
                      <div className={`
                        relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all duration-500
                        ${done   ? 'bg-green-500/20 border-green-500' :
                          active ? 'bg-yellow-500/20 border-yellow-500' :
                                   'bg-gas-card2 border-gas-border'}
                      `}>
                        {active && (
                          <span className="absolute inset-0 rounded-full border-2 border-yellow-500 animate-ping opacity-40" />
                        )}
                        <Icon
                          size={18}
                          weight={done || active ? 'fill' : 'regular'}
                          className={done ? 'text-green-400' : active ? 'text-yellow-500' : 'text-gas-muted'}
                        />
                      </div>

                      {/* Content */}
                      <div className="pt-1.5">
                        <div className={`font-semibold text-sm ${done ? 'text-green-400' : active ? 'text-yellow-500' : 'text-gas-muted'}`}>
                          {step.label}
                          {active && <span className="ml-2 text-[10px] bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Current</span>}
                        </div>
                        <div className={`text-xs mt-0.5 ${future ? 'text-gas-muted2' : 'text-gas-muted'}`}>
                          {done || active ? step.sub : '—'}
                        </div>
                        {(done || active) && (
                          <div className="text-[10px] text-gas-muted2 mt-0.5">{fmt(order.createdAt)}</div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Order summary */}
        <div className="card p-6 mb-6">
          <div className="font-heading font-semibold mb-4">Order Details</div>
          <div className="space-y-3">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-gas-muted">{item.qty}× {item.name}</span>
                <span>R{(item.unitPrice * item.qty).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-gas-border pt-3 flex justify-between items-center">
              <span className="font-semibold">Total</span>
              <span className="font-display text-2xl text-yellow-500">R{order.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gas-muted">Payment</span>
              <span className={`font-medium ${order.paymentStatus === 'paid' ? 'text-green-400' : 'text-gas-muted'}`}>
                {order.paymentStatus === 'paid' ? `Paid · ${order.paymentMethod?.toUpperCase()}` :
                 order.paymentStatus === 'partial' ? `Partial · R${order.amountPaid.toFixed(2)} paid` :
                 'Pay on delivery'}
              </span>
            </div>
          </div>
        </div>

        {/* Delivery details */}
        <div className="card p-6 mb-6">
          <div className="font-heading font-semibold mb-3">Delivery Details</div>
          <div className="space-y-1.5 text-sm text-gas-muted">
            <div className="text-gas-text font-medium">{order.customer.name}</div>
            <div>{order.customer.phone}</div>
            <div>{order.customer.address}</div>
            {order.customer.notes && <div className="italic">{order.customer.notes}</div>}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={`https://wa.me/27640263510?text=${encodeURIComponent(waText)}`}
            target="_blank" rel="noopener noreferrer"
            className="btn-whatsapp flex-1 justify-center py-3.5"
          >
            <ChatsCircle size={18} weight="fill" /> Chat with Gas Boys
          </a>
          <Link to="/order" className="btn-ghost flex-1 justify-center py-3.5">
            Place New Order <ArrowRight size={15} weight="bold" />
          </Link>
        </div>

        <p className="text-center text-xs text-gas-muted2 mt-6">
          This page updates live. Refresh anytime to see the latest status.
        </p>
      </div>
    </div>
  )
}
