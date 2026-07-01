import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Truck, CheckCircle, ChatsCircle, ArrowRight, ArrowLeft,
  Warning, Package, CalendarCheck, MapPin, Clock,
} from '@phosphor-icons/react'
import { useInventoryStore } from '../stores/useInventoryStore'
import { useOrderStore, type OrderItem, type OrderCustomer } from '../stores/useOrderStore'
import { useBookingStore } from '../stores/useBookingStore'

// ── Delivery order state ──────────────────────────────────────────────────────
type DeliveryStep = 1 | 2 | 3 | 4

// ── Refill booking state ──────────────────────────────────────────────────────
type RefillType = 'drive-through' | 'collection'
type RefillStep = 1 | 2 | 3

const REFILL_SIZES = [3, 5, 7, 9, 14, 19, 48]
const TIMES = ['Morning (8am – 12pm)', 'Afternoon (12pm – 5pm)']

export default function Order() {
  // ── Mode ──────────────────────────────────────────────────────────────────
  const [mode, setMode] = useState<'delivery' | 'refill'>('delivery')

  // ── Delivery state ────────────────────────────────────────────────────────
  const [step,       setStep]       = useState<DeliveryStep>(1)
  const [selectedId, setSelectedId] = useState<string>('GAS-19KG')
  const [qty,        setQty]        = useState(1)
  const [showAll,    setShowAll]    = useState(false)
  const [form,       setForm]       = useState<OrderCustomer>({ name: '', phone: '', email: '', address: '', notes: '' })
  const [orderRef,   setOrderRef]   = useState('')

  // ── Refill state ──────────────────────────────────────────────────────────
  const [refillType,     setRefillType]     = useState<RefillType>('collection')
  const [refillStep,     setRefillStep]     = useState<RefillStep>(1)
  const [refillSize,     setRefillSize]     = useState(9)
  const [refillDate,     setRefillDate]     = useState('')
  const [refillTime,     setRefillTime]     = useState(TIMES[0])
  const [refillForm,     setRefillForm]     = useState({ name: '', phone: '', address: '' })
  const [refillRef,      setRefillRef]      = useState('')

  // ── Stores ────────────────────────────────────────────────────────────────
  const products   = useInventoryStore(s => s.products)
  const addOrder   = useOrderStore(s => s.addOrder)
  const addBooking = useBookingStore(s => s.addBooking)

  // ── Delivery helpers ──────────────────────────────────────────────────────
  const cylinders = products.filter(p => p.category === 'cylinders')
  const mainCylinders = cylinders.filter(p => [9, 19, 48].includes(p.size!))
  const displayCylinders = showAll ? cylinders : mainCylinders
  const selected = cylinders.find(p => p.id === selectedId)
  const total    = selected ? selected.price * qty : 0
  const outOfStock = selected ? selected.stockQty === 0 : false

  const updateForm = (k: keyof OrderCustomer, v: string) => setForm(f => ({ ...f, [k]: v }))
  const updateRefill = (k: string, v: string) => setRefillForm(f => ({ ...f, [k]: v }))

  // ── Place delivery order ──────────────────────────────────────────────────
  function placeOrder() {
    if (!selected) return
    const items: OrderItem[] = [{
      productId: selected.id,
      name: selected.name,
      size: selected.size,
      qty,
      unitPrice: selected.price,
    }]
    const ref = addOrder(items, form)
    setOrderRef(ref)
    setStep(4)
  }

  // ── Place refill booking ──────────────────────────────────────────────────
  function placeRefillBooking() {
    const ref = addBooking({
      serviceType: `Gas Refill — ${refillSize}kg`,
      customer: {
        name: refillForm.name,
        phone: refillForm.phone,
        address: refillType === 'collection' ? refillForm.address : '218 Whisken Rd, Crowthorne, Midrand',
      },
      date: refillDate,
      time: refillTime,
    })
    setRefillRef(ref)
    setRefillStep(3)
  }

  // ── Min date for refill (tomorrow) ───────────────────────────────────────
  const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">

        {/* ── Page header ──────────────────────────────────────────────── */}
        <div className="mb-10">
          <div className="section-label mb-2">Gas Boys Midrand · Midrand &amp; Surrounds</div>
          <h1 className="font-display text-6xl md:text-7xl">ORDER <span className="text-yellow-500">YOUR GAS</span></h1>
        </div>

        {/* ── Mode toggle ──────────────────────────────────────────────── */}
        <div className="flex gap-3 mb-10">
          <button
            onClick={() => { setMode('delivery'); setStep(1) }}
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl border-2 font-semibold text-sm transition-all ${
              mode === 'delivery'
                ? 'border-yellow-500 bg-yellow-500/10 text-yellow-500'
                : 'border-gas-border bg-gas-card text-gas-muted hover:border-gas-border2'
            }`}
          >
            <Truck size={20} weight={mode === 'delivery' ? 'fill' : 'duotone'} />
            <div className="text-left">
              <div>Order a Cylinder</div>
              <div className="font-normal text-xs opacity-70">Delivered to your door</div>
            </div>
          </button>
          <button
            onClick={() => { setMode('refill'); setRefillStep(1) }}
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl border-2 font-semibold text-sm transition-all ${
              mode === 'refill'
                ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                : 'border-gas-border bg-gas-card text-gas-muted hover:border-gas-border2'
            }`}
          >
            <Package size={20} weight={mode === 'refill' ? 'fill' : 'duotone'} />
            <div className="text-left">
              <div>Refill My Cylinder</div>
              <div className="font-normal text-xs opacity-70">You own a cylinder already</div>
            </div>
          </button>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            DELIVERY MODE
        ══════════════════════════════════════════════════════════════════ */}
        {mode === 'delivery' && (
          <>
            {/* Step indicator */}
            <div className={`flex mb-10 rounded-xl overflow-hidden border border-gas-border ${step === 4 ? 'hidden' : ''}`}>
              {['Choose Size', 'Your Details', 'Confirm'].map((s, i) => (
                <div key={s} className={`flex-1 py-3 text-center text-sm font-semibold transition-colors ${
                  step === i + 1 ? 'bg-yellow-500/10 text-yellow-500' :
                  step > i + 1   ? 'bg-green-500/10 text-green-400' :
                                   'bg-gas-card2 text-gas-muted'}`}>
                  {step > i + 1
                    ? <><CheckCircle size={13} weight="fill" className="inline mr-1" />{s}</>
                    : `${i + 1}. ${s}`}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">

                {/* ── Step 1: Size selector ─────────────────────────── */}
                {step === 1 && (
                  <div>
                    <div className="font-heading font-semibold mb-4">Select cylinder size</div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                      {displayCylinders.map(c => (
                        <button
                          key={c.id}
                          onClick={() => { if (c.stockQty > 0) setSelectedId(c.id) }}
                          disabled={c.stockQty === 0}
                          className={`relative rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer overflow-hidden flex flex-col
                            ${c.stockQty === 0
                              ? 'opacity-40 cursor-not-allowed border-gas-border bg-gas-card'
                              : selectedId === c.id
                              ? 'border-yellow-500 bg-yellow-500/5 shadow-yellow'
                              : 'border-gas-border bg-gas-card hover:border-gas-border2'}`}
                        >
                          {/* Badge */}
                          {c.popular && c.stockQty > 0 && (
                            <div className="absolute top-2 right-2 bg-yellow-500 text-black text-[9px] font-bold px-2 py-0.5 rounded-full tracking-widest z-10">POPULAR</div>
                          )}
                          {c.stockQty === 0 && (
                            <div className="absolute top-2 right-2 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full tracking-widest z-10">OUT OF STOCK</div>
                          )}
                          {c.stockQty > 0 && c.stockQty <= c.lowStockAt && (
                            <div className="absolute top-2 right-2 bg-orange-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full tracking-widest z-10">LOW STOCK</div>
                          )}

                          {/* Cylinder image */}
                          <div className="bg-white/5 flex items-center justify-center h-36 w-full overflow-hidden">
                            <img
                              src={c.images[0]}
                              alt={c.name}
                              className="h-full w-full object-contain p-3 drop-shadow-lg"
                              onError={e => { (e.target as HTMLImageElement).src = '/gallery/Full-Cylinder.jpg' }}
                            />
                          </div>

                          {/* Info */}
                          <div className="p-4 flex-1 flex flex-col">
                            <div className="flex items-baseline gap-1 mb-1">
                              <span className="font-display text-4xl text-yellow-500 leading-none">{c.size}</span>
                              <span className="text-sm text-gas-muted">kg</span>
                            </div>
                            <div className="font-display text-2xl mb-1">R{c.price.toFixed(0)}</div>
                            {c.stockQty > 0 && <div className="text-xs text-gas-muted">{c.stockQty} in stock</div>}
                          </div>
                        </button>
                      ))}
                    </div>

                    <button onClick={() => setShowAll(!showAll)} className="text-sm text-yellow-500 underline underline-offset-2 mb-6">
                      {showAll ? 'Show main sizes only' : 'Show all sizes (1 kg – 48 kg)'}
                    </button>

                    {selected && selected.stockQty > 0 && (
                      <div className="card p-5 mb-6">
                        <div className="text-sm font-semibold mb-3">Quantity</div>
                        <div className="flex items-center gap-4">
                          <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 rounded-xl bg-gas-card2 border border-gas-border text-xl font-bold flex items-center justify-center hover:border-gas-border2">−</button>
                          <span className="font-display text-3xl text-yellow-500 w-8 text-center">{qty}</span>
                          <button onClick={() => setQty(Math.min(selected.stockQty, qty + 1))} className="w-10 h-10 rounded-xl bg-gas-card2 border border-gas-border text-xl font-bold flex items-center justify-center hover:border-gas-border2">+</button>
                          <span className="text-sm text-gas-muted ml-2">{qty} × R{selected.price.toFixed(2)}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-2.5 bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4 mb-4 text-sm">
                      <CheckCircle size={16} weight="fill" className="text-yellow-500 mt-0.5 shrink-0" />
                      <span className="text-gas-muted"><span className="text-gas-text font-semibold">New cylinder, delivered full.</span> Swap your empty when we arrive — or get a new cylinder if this is your first order.</span>
                    </div>

                    {outOfStock ? (
                      <a
                        href={`https://wa.me/27640263510?text=Hi%20Gas%20Boys!%20I%27m%20looking%20for%20a%20${selected?.size}kg%20cylinder%20but%20it%20shows%20out%20of%20stock%20online.%20Can%20you%20help?`}
                        target="_blank" rel="noopener noreferrer"
                        className="btn-whatsapp w-full justify-center text-base py-3.5"
                      >
                        <ChatsCircle size={18} weight="fill" /> Ask on WhatsApp
                      </a>
                    ) : (
                      <button
                        onClick={() => selected && setStep(2)}
                        className={`btn-primary w-full justify-center text-base py-3.5 ${!selected ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        Continue <ArrowRight size={16} weight="bold" />
                      </button>
                    )}
                  </div>
                )}

                {/* ── Step 2: Delivery details ──────────────────────── */}
                {step === 2 && (
                  <div>
                    <div className="font-heading font-semibold mb-5">Delivery details</div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div><label className="label">Full Name *</label><input className="input" value={form.name} onChange={e => updateForm('name', e.target.value)} placeholder="Your full name" /></div>
                        <div><label className="label">Cell Number *</label><input className="input" value={form.phone} onChange={e => updateForm('phone', e.target.value)} placeholder="+27 ..." type="tel" /></div>
                      </div>
                      <div><label className="label">Email Address</label><input className="input" value={form.email} onChange={e => updateForm('email', e.target.value)} placeholder="you@email.com" type="email" /></div>
                      <div><label className="label">Delivery Address *</label><input className="input" value={form.address} onChange={e => updateForm('address', e.target.value)} placeholder="Full delivery address incl. suburb" /></div>
                      <div><label className="label">Special Instructions</label><textarea className="input resize-none" rows={3} value={form.notes} onChange={e => updateForm('notes', e.target.value)} placeholder="Gate code, directions, etc." /></div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button onClick={() => setStep(1)} className="btn-ghost py-3.5"><ArrowLeft size={16} weight="bold" /> Back</button>
                      <button
                        onClick={() => form.name && form.phone && form.address && setStep(3)}
                        className="btn-primary flex-1 justify-center py-3.5"
                      >
                        Review Order <ArrowRight size={16} weight="bold" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ── Step 3: Review & confirm ──────────────────────── */}
                {step === 3 && (
                  <div>
                    <div className="card p-6 mb-6">
                      <div className="font-heading font-semibold mb-4">Order Summary</div>
                      <div className="space-y-3 mb-4 pb-4 border-b border-gas-border">
                        <div className="flex justify-between text-sm"><span className="text-gas-muted">Item</span><span>{qty}× {selected?.size}kg Gas Cylinder</span></div>
                        <div className="flex justify-between text-sm"><span className="text-gas-muted">Unit price</span><span>R{selected?.price.toFixed(2)}</span></div>
                        <div className="flex justify-between text-sm"><span className="text-gas-muted">Delivery</span><span className="text-green-400">FREE</span></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Total</span>
                        <span className="font-display text-3xl text-yellow-500">R{total.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="card p-6 mb-6">
                      <div className="font-heading font-semibold mb-3">Delivery Details</div>
                      <div className="space-y-1.5 text-sm text-gas-muted">
                        <div><span className="text-gas-text">{form.name}</span></div>
                        <div>{form.phone}{form.email && ` · ${form.email}`}</div>
                        <div>{form.address}</div>
                        {form.notes && <div className="italic">{form.notes}</div>}
                      </div>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-6 flex items-start gap-3">
                      <CheckCircle size={18} className="text-green-400 mt-0.5 flex-shrink-0" weight="fill" />
                      <div className="text-sm text-green-300">Pay on delivery — cash or EFT. We'll call to confirm your delivery window. Hand over your empty cylinder on arrival for the exchange.</div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setStep(2)} className="btn-ghost py-3.5"><ArrowLeft size={16} weight="bold" /> Back</button>
                      <button onClick={placeOrder} className="btn-primary flex-1 justify-center py-3.5">
                        Place Order <ArrowRight size={16} weight="bold" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ── Step 4: Confirmation ──────────────────────────── */}
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
                    <p className="text-gas-muted text-sm mb-6">We'll call <span className="text-gas-text">{form.phone}</span> to confirm your delivery window.</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
                      <Link to={`/track?ref=${orderRef}`} className="btn-primary px-8 py-3.5 inline-flex justify-center">
                        Track Your Order <ArrowRight size={16} weight="bold" />
                      </Link>
                      <a
                        href={`https://wa.me/27640263510?text=Hi%20Gas%20Boys!%20I%20just%20placed%20order%20${orderRef}.%20My%20name%20is%20${encodeURIComponent(form.name)}%20delivering%20to%20${encodeURIComponent(form.address)}.`}
                        target="_blank" rel="noopener noreferrer"
                        className="btn-whatsapp px-8 py-3.5 inline-flex justify-center"
                      >
                        <ChatsCircle size={18} weight="fill" /> WhatsApp Us
                      </a>
                    </div>
                    <Link to="/" className="btn-ghost inline-flex justify-center px-6 py-3">Back to Home</Link>
                  </div>
                )}
              </div>

              {/* Delivery sidebar */}
              {step !== 4 && (
                <div className="space-y-4">
                  <div className="glass p-5">
                    <div className="section-label mb-4">Order Summary</div>
                    {selected && selected.stockQty > 0 ? (
                      <>
                        <div className="flex items-center gap-4 mb-3">
                          <img src={selected.images[0]} alt={selected.name} className="w-16 h-16 object-contain drop-shadow" onError={e => { (e.target as HTMLImageElement).src = '/gallery/Full-Cylinder.jpg' }} />
                          <div>
                            <div className="font-display text-3xl text-yellow-500 leading-none">{selected.size}kg</div>
                            <div className="text-xs text-gas-muted mt-0.5">Gas Cylinder × {qty}</div>
                          </div>
                        </div>
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
                    <div className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <Truck size={15} className="text-yellow-500" weight="duotone" /> Delivery Info
                    </div>
                    <div className="space-y-2 text-xs text-gas-muted">
                      <div>• Delivery within Midrand area</div>
                      <div>• Same-day if ordered before 2pm</div>
                      <div>• Drive-through at 218 Whisken Rd</div>
                      <div>• Cash or EFT on delivery</div>
                      <div>• Swap your empty cylinder on arrival</div>
                    </div>
                  </div>
                  <a href="tel:0114681130" className="btn-ghost w-full justify-center text-sm py-3">Call 011 468 1130</a>
                </div>
              )}
            </div>
          </>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            REFILL MODE
        ══════════════════════════════════════════════════════════════════ */}
        {mode === 'refill' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">

              {/* ── Confirmation (step 3) ─────────────────────────── */}
              {refillStep === 3 ? (
                <div className="text-center py-12">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <CalendarCheck size={48} weight="fill" className="text-orange-400" />
                    </div>
                  </div>
                  <h2 className="font-display text-4xl mb-3">REFILL <span className="text-orange-400">BOOKED!</span></h2>
                  <div className="inline-block bg-orange-500/10 border border-orange-500/20 rounded-xl px-5 py-2.5 mb-4">
                    <span className="text-xs text-gas-muted uppercase tracking-widest">Booking Reference</span>
                    <div className="font-display text-2xl text-orange-400">{refillRef}</div>
                  </div>
                  <p className="text-gas-muted mb-2">Thanks, <span className="text-gas-text font-semibold">{refillForm.name}</span>.</p>
                  <p className="text-gas-muted text-sm mb-6">
                    {refillType === 'collection'
                      ? `We'll collect your empty ${refillSize}kg cylinder from ${refillForm.address} and return it full.`
                      : `Your ${refillSize}kg cylinder will be ready for you at 218 Whisken Rd, Crowthorne.`
                    }
                  </p>
                  <a
                    href={`https://wa.me/27640263510?text=Hi%20Gas%20Boys!%20I%27ve%20booked%20a%20${refillType === 'collection' ? 'collection' : 'drive-through'}%20refill%20for%20my%20${refillSize}kg%20cylinder.%20Booking%20ref%3A%20${refillRef}.%20Name%3A%20${encodeURIComponent(refillForm.name)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="btn-whatsapp px-8 py-3.5 inline-flex justify-center mb-4"
                  >
                    <ChatsCircle size={18} weight="fill" /> Confirm on WhatsApp
                  </a>
                  <br />
                  <Link to="/" className="btn-ghost inline-flex justify-center px-6 py-3 mt-2">Back to Home</Link>
                </div>

              ) : (
                <>
                  {/* ── Refill type picker ─────────────────────────── */}
                  <div className="mb-6">
                    <div className="font-heading font-semibold mb-3">How do you want your refill?</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button
                        onClick={() => setRefillType('collection')}
                        className={`p-5 rounded-2xl border-2 text-left transition-all ${
                          refillType === 'collection' ? 'border-orange-500 bg-orange-500/10' : 'border-gas-border bg-gas-card hover:border-gas-border2'
                        }`}
                      >
                        <Truck size={22} weight="duotone" className={refillType === 'collection' ? 'text-orange-400 mb-2' : 'text-gas-muted mb-2'} />
                        <div className="font-semibold mb-1">Collect &amp; Return</div>
                        <div className="text-xs text-gas-muted">We pick up your empty cylinder from your address, fill it, and bring it back.</div>
                      </button>
                      <button
                        onClick={() => setRefillType('drive-through')}
                        className={`p-5 rounded-2xl border-2 text-left transition-all ${
                          refillType === 'drive-through' ? 'border-orange-500 bg-orange-500/10' : 'border-gas-border bg-gas-card hover:border-gas-border2'
                        }`}
                      >
                        <MapPin size={22} weight="duotone" className={refillType === 'drive-through' ? 'text-orange-400 mb-2' : 'text-gas-muted mb-2'} />
                        <div className="font-semibold mb-1">Drive-Through</div>
                        <div className="text-xs text-gas-muted">Bring your empty cylinder to our depot. Fill it while you wait — no appointment needed.</div>
                      </button>
                    </div>
                  </div>

                  {/* ── Drive-through info ───────────────────────────── */}
                  {refillType === 'drive-through' && (
                    <div className="space-y-4">
                      <div className="card p-6">
                        <div className="font-heading font-semibold mb-4 flex items-center gap-2">
                          <MapPin size={18} weight="duotone" className="text-orange-400" /> Depot Location
                        </div>
                        <div className="text-sm text-gas-muted mb-3">218 Whisken Rd, Crowthorne, Midrand</div>
                        <div className="flex items-start gap-2 mb-4 text-sm text-gas-muted">
                          <Clock size={15} className="text-orange-400 mt-0.5 shrink-0" />
                          <div>Mon–Sat: 7am–6pm · Sun: 8am–2pm</div>
                        </div>
                        <a
                          href="https://maps.google.com/?q=218+Whisken+Rd+Crowthorne+Midrand"
                          target="_blank" rel="noopener noreferrer"
                          className="btn-ghost py-2.5 text-sm w-full justify-center"
                        >
                          Open in Google Maps →
                        </a>
                      </div>

                      <div className="card p-5">
                        <div className="font-heading font-semibold mb-3">Refill Price List</div>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { size: 3,  price: 124.50 }, { size: 5,  price: 207.50 },
                            { size: 7,  price: 290.50 }, { size: 9,  price: 373.50 },
                            { size: 14, price: 582.00 }, { size: 19, price: 788.50 },
                            { size: 48, price: 1992.00 },
                          ].map(r => (
                            <div key={r.size} className="flex justify-between items-center py-2 px-3 rounded-xl bg-gas-card2 border border-gas-border">
                              <span className="text-sm font-semibold">{r.size}kg</span>
                              <span className="font-display text-base text-yellow-500">R{r.price.toFixed(0)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <a
                        href="https://wa.me/27640263510?text=Hi%20Gas%20Boys!%20I%27m%20on%20my%20way%20for%20a%20drive-through%20refill."
                        target="_blank" rel="noopener noreferrer"
                        className="btn-whatsapp w-full justify-center py-3.5"
                      >
                        <ChatsCircle size={18} weight="fill" /> WhatsApp "I'm on my way"
                      </a>
                    </div>
                  )}

                  {/* ── Collection booking form ──────────────────────── */}
                  {refillType === 'collection' && (
                    <div className="space-y-6">

                      {/* Step 1: Size + schedule */}
                      {refillStep === 1 && (
                        <div>
                          <div className="font-heading font-semibold mb-4">Select your cylinder size</div>
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-6">
                            {REFILL_SIZES.map(s => (
                              <button
                                key={s}
                                onClick={() => setRefillSize(s)}
                                className={`py-3 rounded-xl border-2 text-center transition-all cursor-pointer ${
                                  refillSize === s
                                    ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                                    : 'border-gas-border bg-gas-card text-gas-muted hover:border-gas-border2'
                                }`}
                              >
                                <div className="font-display text-2xl leading-none">{s}</div>
                                <div className="text-xs mt-0.5">kg</div>
                              </button>
                            ))}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <div>
                              <label className="label">Preferred Date *</label>
                              <input
                                className="input"
                                type="date"
                                min={minDate}
                                value={refillDate}
                                onChange={e => setRefillDate(e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="label">Time Slot *</label>
                              <select className="input" value={refillTime} onChange={e => setRefillTime(e.target.value)}>
                                {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
                              </select>
                            </div>
                          </div>

                          <div className="flex items-start gap-2.5 bg-orange-500/5 border border-orange-500/20 rounded-xl p-4 mb-4 text-sm">
                            <Warning size={16} weight="fill" className="text-orange-400 mt-0.5 shrink-0" />
                            <span className="text-gas-muted">Please have your cylinder empty and ready for collection. We'll return it filled to the exact weight.</span>
                          </div>

                          <button
                            onClick={() => refillDate && setRefillStep(2)}
                            disabled={!refillDate}
                            className="btn-primary w-full justify-center py-3.5 disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            Continue <ArrowRight size={16} weight="bold" />
                          </button>
                        </div>
                      )}

                      {/* Step 2: Your details */}
                      {refillStep === 2 && (
                        <div>
                          <div className="font-heading font-semibold mb-4">Collection details</div>
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div><label className="label">Full Name *</label><input className="input" value={refillForm.name} onChange={e => updateRefill('name', e.target.value)} placeholder="Your full name" /></div>
                              <div><label className="label">Cell Number *</label><input className="input" value={refillForm.phone} onChange={e => updateRefill('phone', e.target.value)} placeholder="+27 ..." type="tel" /></div>
                            </div>
                            <div><label className="label">Collection Address *</label><input className="input" value={refillForm.address} onChange={e => updateRefill('address', e.target.value)} placeholder="Where to collect and return the cylinder" /></div>
                          </div>

                          <div className="mt-4 card p-4 text-sm text-gas-muted">
                            <div className="flex justify-between mb-2"><span>Cylinder</span><span className="text-gas-text">{refillSize}kg</span></div>
                            <div className="flex justify-between mb-2"><span>Date</span><span className="text-gas-text">{new Date(refillDate).toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long' })}</span></div>
                            <div className="flex justify-between mb-2"><span>Slot</span><span className="text-gas-text">{refillTime}</span></div>
                            <div className="flex justify-between border-t border-gas-border pt-2 mt-2">
                              <span className="font-semibold text-gas-text">Refill Price</span>
                              <span className="font-display text-lg text-orange-400">R{cylinders.find(c => c.size === refillSize)?.price.toFixed(2) ?? '—'}</span>
                            </div>
                          </div>

                          <div className="flex gap-3 mt-5">
                            <button onClick={() => setRefillStep(1)} className="btn-ghost py-3.5"><ArrowLeft size={16} weight="bold" /> Back</button>
                            <button
                              onClick={() => refillForm.name && refillForm.phone && refillForm.address && placeRefillBooking()}
                              disabled={!refillForm.name || !refillForm.phone || !refillForm.address}
                              className="btn-primary flex-1 justify-center py-3.5 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                              Book Refill <CalendarCheck size={16} weight="bold" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Refill sidebar */}
            {refillStep !== 3 && (
              <div className="space-y-4">
                <div className="glass p-5">
                  <div className="section-label mb-3">Refill Info</div>
                  <p className="text-sm text-gas-muted mb-4">You already own the cylinder. You're only paying for the gas inside.</p>
                  <div className="space-y-2 text-xs text-gas-muted">
                    <div className="flex items-center gap-2"><CheckCircle size={12} weight="fill" className="text-green-400" /> Weighed to the exact kg</div>
                    <div className="flex items-center gap-2"><CheckCircle size={12} weight="fill" className="text-green-400" /> Any brand cylinder accepted</div>
                    <div className="flex items-center gap-2"><CheckCircle size={12} weight="fill" className="text-green-400" /> Pay on collection / delivery</div>
                    <div className="flex items-center gap-2"><CheckCircle size={12} weight="fill" className="text-green-400" /> ORYX gas, filled at our depot</div>
                  </div>
                </div>
                <div className="card p-5 text-sm text-gas-muted">
                  <div className="font-semibold text-gas-text mb-2">Need a new cylinder?</div>
                  <p className="text-xs mb-3">If you don't own a cylinder yet, order one delivered to your door.</p>
                  <button onClick={() => setMode('delivery')} className="btn-primary w-full justify-center text-sm py-2.5">
                    <Truck size={14} weight="fill" /> Order a Cylinder
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
