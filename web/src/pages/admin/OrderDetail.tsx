import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, ChatsCircle, MapPin, CheckCircle, Truck, SealCheck,
  ClockCountdown, CurrencyDollar, Note, Printer, Warning,
} from '@phosphor-icons/react'
import { useOrderStore, type OrderStatus } from '../../stores/useOrderStore'

const PIPELINE: { status: OrderStatus; label: string; Icon: React.ElementType }[] = [
  { status: 'pending',    label: 'Pending',          Icon: ClockCountdown },
  { status: 'confirmed',  label: 'Confirmed',        Icon: CheckCircle },
  { status: 'dispatched', label: 'Out for Delivery', Icon: Truck },
  { status: 'delivered',  label: 'Delivered',        Icon: SealCheck },
]

const STATUS_IDX: Partial<Record<OrderStatus, number>> = {
  pending: 0, confirmed: 1, dispatched: 2, delivered: 3,
}

const STATUS_COLORS: Record<string, string> = {
  pending:   'text-yellow-500 bg-yellow-500/10 border-yellow-500/25',
  confirmed: 'text-blue-400   bg-blue-500/10   border-blue-500/25',
  dispatched:'text-orange-400 bg-orange-500/10 border-orange-500/25',
  delivered: 'text-green-400  bg-green-500/10  border-green-500/25',
  cancelled: 'text-red-400    bg-red-500/10    border-red-500/25',
}

export default function OrderDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [note, setNote] = useState('')

  const order        = useOrderStore(s => s.orders.find(o => o.id === id))
  const updateStatus = useOrderStore(s => s.updateStatus)
  const markPaid     = useOrderStore(s => s.markPaid)
  const addNote      = useOrderStore(s => s.addNote)

  if (!order) {
    return (
      <div className="text-center py-20">
        <Warning size={40} className="text-gas-muted mx-auto mb-3" />
        <div className="font-display text-3xl mb-2">ORDER NOT FOUND</div>
        <button onClick={() => navigate('/admin/orders')} className="btn-ghost mt-4">← Back to Orders</button>
      </div>
    )
  }

  const currentIdx = STATUS_IDX[order.status] ?? -1
  const nextStatus = PIPELINE[currentIdx + 1]?.status
  const nextLabel  = PIPELINE[currentIdx + 1]?.label

  const waMsg = `Hi ${order.customer.name}! This is Gas Boys Midrand. Your order ${order.ref} (R${order.total.toFixed(2)}) is ${order.status === 'dispatched' ? 'on its way to ' + order.customer.address : 'confirmed and being prepared'}. Thank you!`

  function handlePrint() { window.print() }

  return (
    <div>
      {/* Print-only styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; color: black !important; }
          .print-slip { border: 1px solid #ccc; padding: 24px; border-radius: 8px; }
        }
      `}</style>

      {/* Back + actions */}
      <div className="flex items-center justify-between mb-6 no-print">
        <button onClick={() => navigate('/admin/orders')} className="btn-ghost py-2 px-4 text-sm">
          <ArrowLeft size={14} /> Back to Orders
        </button>
        <button onClick={handlePrint} className="btn-ghost py-2 px-4 text-sm flex items-center gap-2">
          <Printer size={15} weight="duotone" /> Print Slip
        </button>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="font-display text-4xl">{order.ref}</h1>
            <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${STATUS_COLORS[order.status] ?? ''}`}>
              {order.status}
            </span>
          </div>
          <div className="text-sm text-gas-muted">
            {new Date(order.createdAt).toLocaleString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
        {order.status !== 'delivered' && order.status !== 'cancelled' && nextStatus && (
          <button
            onClick={() => updateStatus(order.id, nextStatus)}
            className="btn-primary py-2.5 px-5 text-sm no-print"
          >
            Mark as {nextLabel} →
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="xl:col-span-2 space-y-6">

          {/* Status pipeline */}
          <div className="card p-6 no-print">
            <div className="font-heading font-semibold mb-5">Order Status</div>
            <div className="flex items-center">
              {PIPELINE.map((step, idx) => {
                const done   = idx < currentIdx
                const active = idx === currentIdx
                const { Icon } = step
                return (
                  <div key={step.status} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                        done   ? 'bg-green-500/20  border-green-500' :
                        active ? 'bg-yellow-500/20 border-yellow-500' :
                                 'bg-gas-card2     border-gas-border'
                      }`}>
                        {active && <span className="absolute w-10 h-10 rounded-full border-2 border-yellow-500 animate-ping opacity-30" />}
                        <Icon size={16} weight="fill" className={done ? 'text-green-400' : active ? 'text-yellow-500' : 'text-gas-muted'} />
                      </div>
                      <div className={`text-[10px] mt-1.5 font-medium text-center ${active ? 'text-yellow-500' : done ? 'text-green-400' : 'text-gas-muted'}`}>
                        {step.label}
                      </div>
                    </div>
                    {idx < PIPELINE.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-2 mb-4 ${done || active ? 'bg-yellow-500/40' : 'bg-gas-border'}`} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Order items */}
          <div className="card p-6 print-slip">
            <div className="font-heading font-semibold mb-4">Order Items</div>
            <div className="space-y-3">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-gas-border last:border-0">
                  <div>
                    <div className="text-sm font-medium">{item.name}</div>
                    <div className="text-xs text-gas-muted">Qty: {item.qty} × R{item.unitPrice.toFixed(2)}</div>
                  </div>
                  <div className="font-display text-lg text-yellow-500">R{(item.qty * item.unitPrice).toFixed(2)}</div>
                </div>
              ))}
              <div className="flex justify-between items-center pt-2">
                <div className="font-semibold">Total</div>
                <div className="font-display text-2xl text-yellow-500">R{order.total.toFixed(2)}</div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gas-muted">Payment</span>
                <span className={order.paymentStatus === 'paid' ? 'text-green-400 font-medium' : 'text-gas-muted'}>
                  {order.paymentStatus === 'paid'
                    ? `Paid · ${order.paymentMethod?.toUpperCase()}`
                    : order.paymentStatus === 'partial'
                    ? `Partial · R${order.amountPaid.toFixed(2)} paid`
                    : 'Pay on delivery'}
                </span>
              </div>
            </div>
          </div>

          {/* Payment */}
          {order.paymentStatus !== 'paid' && (
            <div className="card p-6 no-print">
              <div className="flex items-center gap-2 font-heading font-semibold mb-4">
                <CurrencyDollar size={18} className="text-yellow-500" weight="duotone" />
                Mark Payment
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => markPaid(order.id, order.total - order.amountPaid, 'cash')}
                  className="btn-primary flex-1 justify-center py-3"
                >
                  Cash — R{(order.total - order.amountPaid).toFixed(2)}
                </button>
                <button
                  onClick={() => markPaid(order.id, order.total - order.amountPaid, 'eft')}
                  className="btn-secondary flex-1 justify-center py-3"
                >
                  EFT — R{(order.total - order.amountPaid).toFixed(2)}
                </button>
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="card p-6 no-print">
            <div className="flex items-center gap-2 font-heading font-semibold mb-4">
              <Note size={18} className="text-yellow-500" weight="duotone" />
              Admin Notes
            </div>
            {order.adminNotes.length > 0 && (
              <div className="space-y-2 mb-4">
                {order.adminNotes.map((n, i) => (
                  <div key={i} className="text-sm bg-gas-card2 border border-gas-border rounded-xl px-4 py-2.5 text-gas-muted">
                    {n}
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-3">
              <input
                className="input flex-1"
                placeholder="Add a note…"
                value={note}
                onChange={e => setNote(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && note.trim()) { addNote(order.id, note.trim()); setNote('') } }}
              />
              <button
                onClick={() => { if (note.trim()) { addNote(order.id, note.trim()); setNote('') } }}
                className="btn-primary px-5 py-2.5 text-sm"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Customer info */}
          <div className="card p-6">
            <div className="font-heading font-semibold mb-4">Customer</div>
            <div className="space-y-3">
              <div>
                <div className="text-xs text-gas-muted mb-0.5">Name</div>
                <div className="font-medium">{order.customer.name}</div>
              </div>
              <div>
                <div className="text-xs text-gas-muted mb-0.5">Phone</div>
                <a href={`tel:${order.customer.phone}`} className="font-medium text-yellow-500 hover:underline">{order.customer.phone}</a>
              </div>
              {order.customer.email && (
                <div>
                  <div className="text-xs text-gas-muted mb-0.5">Email</div>
                  <div className="text-sm">{order.customer.email}</div>
                </div>
              )}
              <div>
                <div className="text-xs text-gas-muted mb-1 flex items-center gap-1"><MapPin size={11} /> Delivery Address</div>
                <div className="text-sm text-gas-text2">{order.customer.address}</div>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(order.customer.address)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="text-xs text-yellow-500 hover:underline mt-1 inline-block"
                >
                  Open in Maps →
                </a>
              </div>
              {order.customer.notes && (
                <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-3 text-xs text-gas-muted italic">
                  "{order.customer.notes}"
                </div>
              )}
            </div>
          </div>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/27${order.customer.phone.replace(/\D/g, '').replace(/^0/, '')}?text=${encodeURIComponent(waMsg)}`}
            target="_blank" rel="noopener noreferrer"
            className="btn-whatsapp w-full justify-center py-3 no-print"
          >
            <ChatsCircle size={17} weight="fill" /> WhatsApp Customer
          </a>

          {/* Track link */}
          <a
            href={`/track?ref=${order.ref}`}
            target="_blank" rel="noopener noreferrer"
            className="btn-ghost w-full justify-center py-3 text-sm no-print"
          >
            View Track Page ↗
          </a>
        </div>
      </div>
    </div>
  )
}
