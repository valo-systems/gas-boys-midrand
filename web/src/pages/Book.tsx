import { useState } from 'react'
import { Clipboard, CheckCircle, ChatsCircle, Phone } from '@phosphor-icons/react'
import { contactInfo } from '../data/mock'

const serviceTypes = ['Gas Repair', 'Gas Installation', 'CoC Certificate', 'Annual Inspection', 'Leak Test', 'Other']

export default function Book() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ service: 'Gas Repair', date: '', time: 'Morning (8–12)', name: '', phone: '', email: '', address: '', notes: '' })
  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  if (submitted) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-400" weight="fill" />
          </div>
          <h2 className="font-display text-5xl mb-3">BOOKING <span className="text-yellow-500">CONFIRMED!</span></h2>
          <p className="text-gas-muted mb-2">We'll confirm your booking via SMS within 2 hours.</p>
          <p className="text-sm text-gas-muted mb-8">Booking Ref: <span className="text-yellow-500 font-semibold">B-{Math.floor(Math.random()*900)+100}</span></p>
          <button onClick={() => setSubmitted(false)} className="btn-ghost">Make another booking</button>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="section-label mb-2">Repairs · Installations · CoC</div>
        <h1 className="font-display text-6xl md:text-7xl mb-10">BOOK A <span className="text-yellow-500">SERVICE</span></h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-5">
            {/* Service type */}
            <div className="card p-6">
              <div className="font-heading font-semibold mb-4 flex items-center gap-2"><Clipboard size={18} className="text-yellow-500" weight="duotone" /> Service Type</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {serviceTypes.map(s => (
                  <button key={s} onClick={() => update('service', s)} className={`py-2.5 px-4 rounded-xl text-sm font-medium border transition-all cursor-pointer ${form.service === s ? 'border-yellow-500 bg-yellow-500/10 text-yellow-500' : 'border-gas-border bg-gas-card2 text-gas-muted hover:border-gas-border2'}`}>{s}</button>
                ))}
              </div>
            </div>

            {/* Date & time */}
            <div className="card p-6">
              <div className="font-heading font-semibold mb-4">Preferred Date & Time</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="label">Preferred Date</label><input className="input" type="date" value={form.date} onChange={e => update('date', e.target.value)} min={new Date().toISOString().split('T')[0]} /></div>
                <div>
                  <label className="label">Preferred Time</label>
                  <select className="input" value={form.time} onChange={e => update('time', e.target.value)}>
                    <option>Morning (8–12)</option>
                    <option>Afternoon (12–5)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="card p-6">
              <div className="font-heading font-semibold mb-4">Your Details</div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="label">Full Name *</label><input className="input" value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your name" /></div>
                  <div><label className="label">Phone *</label><input className="input" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+27 ..." type="tel" /></div>
                </div>
                <div><label className="label">Email</label><input className="input" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@email.com" type="email" /></div>
                <div><label className="label">Site Address *</label><input className="input" value={form.address} onChange={e => update('address', e.target.value)} placeholder="Where must the technician come?" /></div>
                <div><label className="label">Describe the Issue / Job</label><textarea className="input resize-none" rows={4} value={form.notes} onChange={e => update('notes', e.target.value)} placeholder="Briefly describe what needs to be done..." /></div>
              </div>
            </div>

            <button onClick={() => form.name && form.phone && form.address && setSubmitted(true)} className="btn-primary w-full justify-center text-base py-3.5">
              <Clipboard size={18} weight="duotone" /> Confirm Booking
            </button>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="glass p-6">
              <div className="font-heading font-semibold text-yellow-500 mb-4">What to Expect</div>
              {[['SMS confirmation', 'Within 2 hours of booking'], ['Technician arrives', 'At your chosen date & time'], ['Job completed', 'CoC issued same day for most jobs']].map(([h, sub], i) => (
                <div key={h} className="flex gap-3 mb-4">
                  <div className="w-7 h-7 rounded-full bg-yellow-500 text-black text-xs font-bold flex items-center justify-center flex-shrink-0">{i+1}</div>
                  <div><div className="text-sm font-semibold">{h}</div><div className="text-xs text-gas-muted mt-0.5">{sub}</div></div>
                </div>
              ))}
            </div>
            <div className="card p-5 space-y-3">
              <a href={`tel:${contactInfo.phone1.replace(/\s/g,'')}`} className="btn-ghost w-full justify-center text-sm py-3">
                <Phone size={15} weight="fill" /> {contactInfo.phone1}
              </a>
              <a href={`https://wa.me/${contactInfo.whatsapp}?text=Hi%20Gas%20Boys!%20I%27d%20like%20to%20book%20a%20${encodeURIComponent(form.service)}.`} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full justify-center text-sm py-3">
                <ChatsCircle size={15} weight="fill" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
