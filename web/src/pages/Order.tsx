import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Truck, CheckCircle, ChatsCircle, ArrowRight, ArrowLeft, Fire } from '@phosphor-icons/react'
import { cylinders } from '../data/mock'

type Step = 1 | 2 | 3 | 4

const mainCylinders = cylinders.filter(c => [9, 19, 48].includes(c.size))
const allCylinders = cylinders

export default function Order() {
  const [step, setStep] = useState<Step>(1)
  const [selectedSize, setSelectedSize] = useState<number | null>(19)
  const [qty, setQty] = useState(1)
  const [showAll, setShowAll] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', notes: '' })
  const [orderRef] = useState(() => 'GB-' + Math.floor(10000 + Math.random() * 90000))

  const selected = cylinders.find(c => c.size === selectedSize)
  const total = selected ? selected.price * qty : 0
  const displayCylinders = showAll ? allCylinders : mainCylinders

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="section-label mb-2">ORYX Gas · R20.90/kg · Pay on Delivery</div>
          <h1 className="font-display text-6xl md:text-7xl">ORDER <span className="text-yellow-500">YOUR GAS</span></h1>
        </div>

        {/* Step indicator */}
        <div className={`flex mb-10 rounded-xl overflow-hidden border border-gas-border ${step === 4 ? 'hidden' : ''}`}>
          {['Choose Size', 'Your Details', 'Confirm'].map((s, i) => (
            <div key={s} className={`flex-1 py-3 text-center text-sm font-semibold transition-colors ${step === i + 1 ? 'bg-yellow-500/10 text-yellow-500' : step > i + 1 ? 'bg-green-500/10 text-green-400' : 'bg-gas-card2 text-gas-muted'}`}>
              {step > i + 1 ? <><CheckCircle size={13} weight="fill" className="inline mr-1" />{s}</> : `${i + 1}. ${s}`}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div>
                <div className="font-heading font-semibold mb-4">Select cylinder size</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  {displayCylinders.map(c => (
                    <button
                      key={c.size}
                      onClick={() => setSelectedSize(c.size)}
                      className={`relative p-5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer ${selectedSize === c.size ? 'border-yellow-500 bg-yellow-500/10 shadow-yellow' : 'border-gas-border bg-gas-card hover:border-gas-border2'}`}
                    >
                      {c.popular && <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-[9px] font-bold px-2 py-0.5 rounded-full tracking-widest">POPULAR</div>}
                      <div className="font-display text-5xl text-yellow-500 leading-none">{c.size}</div>
                      <div className="text-sm text-gas-muted mb-3">{c.unit}</div>
                      <div className="font-display text-2xl">R{c.price.toFixed(2)}</div>
                      <div className="text-xs text-gas-muted mt-0.5">{c.type}</div>
                    </button>
                  ))}
                </div>
                <button onClick={() => setShowAll(!showAll)} className="text-sm text-yellow-500 underline underline-offset-2 mb-6">
                  {showAll ? 'Show main sizes only' : 'Show all sizes (3kg – 48kg)'}
                </button>

                {selected && (
                  <div className="card p-5 mb-6">
                    <div className="text-sm font-semibold mb-3">Quantity</div>
                    <div className="flex items-center gap-4">
                      <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 rounded-xl bg-gas-card2 border border-gas-border text-xl font-bold flex items-center justify-center hover:border-gas-border2">−</button>
                      <span className="font-display text-3xl text-yellow-500 w-8 text-center">{qty}</span>
                      <button onClick={() => setQty(qty + 1)} className="w-10 h-10 rounded-xl bg-gas-card2 border border-gas-border text-xl font-bold flex items-center justify-center hover:border-gas-border2">+</button>
                      <span className="text-sm text-gas-muted ml-2">{qty} × R{selected.price.toFixed(2)}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-2.5 bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4 mb-4 text-sm">
                  <CheckCircle size={16} weight="fill" className="text-yellow-500 mt-0.5 shrink-0" />
                  <span className="text-gas-muted"><span className="text-gas-text font-semibold">Weighed and sealed at our depot.</span> Every cylinder is filled to the kilogram you pay for at R20.90/kg — no exceptions.</span>
                </div>
                <button onClick={() => selected && setStep(2)} className={`btn-primary w-full justify-center text-base py-3.5 ${!selected ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  Continue <ArrowRight size={16} weight="bold" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                <div className="font-heading font-semibold mb-5">Delivery details</div>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className="label">Full Name *</label><input className="input" value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your full name" /></div>
                    <div><label className="label">Cell Number *</label><input className="input" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+27 ..." type="tel" /></div>
                  </div>
                  <div><label className="label">Email Address</label><input className="input" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@email.com" type="email" /></div>
                  <div><label className="label">Delivery Address *</label><input className="input" value={form.address} onChange={e => update('address', e.target.value)} placeholder="Full delivery address incl. suburb" /></div>
                  <div><label className="label">Special Instructions</label><textarea className="input resize-none" rows={3} value={form.notes} onChange={e => update('notes', e.target.value)} placeholder="Gate code, directions, etc." /></div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(1)} className="btn-ghost py-3.5"><ArrowLeft size={16} weight="bold" /> Back</button>
                  <button onClick={() => form.name && form.phone && form.address && setStep(3)} className="btn-primary flex-1 justify-center py-3.5">
                    Review Order <ArrowRight size={16} weight="bold" />
                  </button>
                </div>
                <div className="mt-4 text-center">
                  <a href={`https://wa.me/27640263510?text=Hi%20Gas%20Boys!%20I%27d%20like%20to%20order%20${qty}x%20${selected?.size}kg%20gas%20refill%20delivered%20to%20${encodeURIComponent(form.address || 'my address')}.`}
                    target="_blank" rel="noopener noreferrer" className="btn-whatsapp justify-center w-full py-3.5">
                    <ChatsCircle size={18} weight="fill" /> Or Order via WhatsApp
                  </a>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <div className="card p-6 mb-6">
                  <div className="font-heading font-semibold mb-4">Order Summary</div>
                  <div className="space-y-3 mb-4 pb-4 border-b border-gas-border">
                    <div className="flex justify-between text-sm"><span className="text-gas-muted">Item</span><span>{qty}× {selected?.size}kg Gas Refill (ORYX)</span></div>
                    <div className="flex justify-between text-sm"><span className="text-gas-muted">Unit price</span><span>R{selected?.price.toFixed(2)}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-gas-muted">Delivery</span><span className="text-green-400">FREE</span></div>
                  </div>
                  <div className="flex justify-between items-center"><span className="font-semibold">Total</span><span className="font-display text-3xl text-yellow-500">R{total.toFixed(2)}</span></div>
                </div>
                <div className="card p-6 mb-6">
                  <div className="font-heading font-semibold mb-3">Delivery Details</div>
                  <div className="space-y-1.5 text-sm text-gas-muted">
                    <div><span className="text-gas-text">{form.name}</span></div>
                    <div>{form.phone} {form.email && `· ${form.email}`}</div>
                    <div>{form.address}</div>
                    {form.notes && <div className="italic">{form.notes}</div>}
                  </div>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-6 flex items-start gap-3">
                  <CheckCircle size={18} className="text-green-400 mt-0.5 flex-shrink-0" weight="fill" />
                  <div className="text-sm text-green-300">Pay on delivery — cash or EFT. We'll call to confirm your delivery window.</div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="btn-ghost py-3.5"><ArrowLeft size={16} weight="bold" /> Back</button>
                  <button onClick={() => setStep(4)} className="btn-primary flex-1 justify-center py-3.5">
                    <Fire size={18} weight="fill" /> Place Order
                  </button>
                </div>
              </div>
            )}
          </div>

            {step === 4 && (
              <div className="text-center py-12">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle size={48} weight="fill" className="text-green-400" />
                  </div>
                </div>
                <h2 className="font-display text-4xl mb-3">ORDER <span className="text-yellow-500">PLACED!</span></h2>
                <div className="inline-block bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-5 py-2.5 mb-4">
                  <span className="text-xs text-gas-muted uppercase tracking-widest">Order Reference</span>
                  <div className="font-display text-2xl text-yellow-500">{orderRef}</div>
                </div>
                <p className="text-gas-muted mb-2">Thanks, <span className="text-gas-text font-semibold">{form.name}</span>. We've received your order.</p>
                <p className="text-gas-muted text-sm mb-8">We'll call <span className="text-gas-text">{form.phone}</span> shortly to confirm your delivery window.</p>
                <div className="card p-5 text-left mb-8 max-w-sm mx-auto">
                  <div className="text-sm font-semibold mb-3">Order Summary</div>
                  <div className="space-y-1.5 text-sm text-gas-muted">
                    <div className="flex justify-between"><span>Item</span><span className="text-gas-text">{qty}× {selected?.size}kg Gas Refill</span></div>
                    <div className="flex justify-between"><span>Delivery</span><span className="text-green-400">FREE</span></div>
                    <div className="flex justify-between border-t border-gas-border pt-2 mt-2"><span className="font-semibold text-gas-text">Total due on delivery</span><span className="font-display text-xl text-yellow-500">R{total.toFixed(2)}</span></div>
                  </div>
                </div>
                <Link to="/" className="btn-primary justify-center px-8 py-3.5 inline-flex">
                  Back to Home <ArrowRight size={16} weight="bold" />
                </Link>
              </div>
            )}

          {/* Sidebar */}
          <div className={`space-y-4 ${step === 4 ? 'hidden lg:hidden' : ''}`}>
            <div className="glass p-5">
              <div className="section-label mb-4">Order Summary</div>
              {selected ? (
                <>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-display text-4xl text-yellow-500">{selected.size}</span>
                    <span className="text-gas-muted">{selected.unit} × {qty}</span>
                  </div>
                  <div className="text-xs text-gas-muted mb-4">{selected.type}</div>
                  <div className="border-t border-gas-border pt-4 flex justify-between items-center">
                    <span className="text-sm text-gas-muted">Total</span>
                    <span className="font-display text-2xl text-yellow-500">R{total.toFixed(2)}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-green-400">
                    <CheckCircle size={13} weight="fill" /> Pay on delivery
                  </div>
                </>
              ) : (
                <div className="text-sm text-gas-muted">Select a cylinder size to continue.</div>
              )}
            </div>
            <div className="card p-5">
              <div className="text-sm font-semibold mb-3 flex items-center gap-2"><Truck size={15} className="text-yellow-500" weight="duotone" /> Delivery Info</div>
              <div className="space-y-2 text-xs text-gas-muted">
                <div>• Delivery within Midrand area</div>
                <div>• Same-day if ordered before 2pm</div>
                <div>• Drive-through available at our depot</div>
                <div>• 218 Whisken Rd, Crowthorne</div>
              </div>
            </div>
            <a href="tel:0114681130" className="btn-ghost w-full justify-center text-sm py-3">Call 011 468 1130</a>
          </div>
        </div>
      </div>
    </div>
  )
}
