import { useState } from 'react'
import { CheckCircle, ChatsCircle } from '@phosphor-icons/react'
import { contactInfo } from '../data/mock'
import { useQuoteStore } from '../stores/useQuoteStore'

export default function Quote() {
  const [submitted, setSubmitted] = useState(false)
  const [quoteRef, setQuoteRef] = useState('')
  const [form, setForm] = useState({ company: '', contact: '', phone: '', email: '', gasType: 'LPG (Propane)', volume: '100–500 kg/month', address: '', notes: '' })
  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const addQuote = useQuoteStore(s => s.addQuote)

  function handleSubmit() {
    if (!form.company || !form.contact || !form.phone || !form.email) return
    const ref = addQuote({
      company: form.company,
      contact: form.contact,
      phone: form.phone,
      email: form.email,
      gasType: form.gasType,
      volume: form.volume,
      address: form.address,
      requirements: form.notes,
    })
    setQuoteRef(ref)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-yellow-500" weight="fill" />
          </div>
          <h2 className="font-display text-5xl mb-3">QUOTE <span className="text-yellow-500">RECEIVED!</span></h2>
          <p className="text-gas-muted mb-2">We'll review your requirements and send a personalised quote within 24 hours.</p>
          <p className="text-sm text-gas-muted mb-8">Ref: <span className="text-yellow-500 font-semibold">{quoteRef}</span></p>
          <button onClick={() => { setSubmitted(false); setQuoteRef('') }} className="btn-ghost">Submit another</button>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="section-label mb-2">Restaurants · Factories · Commercial Buildings</div>
        <h1 className="font-display text-6xl md:text-7xl mb-3">BULK GAS <span className="text-yellow-500">QUOTE</span></h1>
        <p className="text-gas-muted max-w-lg mb-10">Tell us about your gas requirements and we'll send a customised quote with pricing and supply options within 24 hours.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 card p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="label">Company / Business Name *</label><input className="input" value={form.company} onChange={e => update('company', e.target.value)} placeholder="Your business name" /></div>
              <div><label className="label">Contact Person *</label><input className="input" value={form.contact} onChange={e => update('contact', e.target.value)} placeholder="Your name" /></div>
              <div><label className="label">Phone *</label><input className="input" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+27 ..." type="tel" /></div>
              <div><label className="label">Email *</label><input className="input" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@company.co.za" type="email" /></div>
              <div>
                <label className="label">Gas Type</label>
                <select className="input" value={form.gasType} onChange={e => update('gasType', e.target.value)}>
                  <option>LPG (Propane)</option><option>Butane</option><option>Mixed / Not Sure</option>
                </select>
              </div>
              <div>
                <label className="label">Estimated Monthly Volume</label>
                <select className="input" value={form.volume} onChange={e => update('volume', e.target.value)}>
                  <option>Under 100 kg/month</option><option>100–500 kg/month</option><option>500 kg – 1 ton/month</option><option>1–5 tons/month</option><option>Over 5 tons/month</option>
                </select>
              </div>
            </div>
            <div><label className="label">Delivery / Site Address *</label><input className="input" value={form.address} onChange={e => update('address', e.target.value)} placeholder="Full delivery address" /></div>
            <div><label className="label">Tell Us About Your Setup</label><textarea className="input resize-none" rows={4} value={form.notes} onChange={e => update('notes', e.target.value)} placeholder="Describe your current gas usage, number of appliances, storage setup, delivery frequency preferences, etc." /></div>
            <button onClick={handleSubmit} className="btn-primary w-full justify-center text-base py-3.5">
              Submit Quote Request
            </button>
          </div>

          <div className="space-y-4">
            <div className="glass p-6">
              <div className="font-heading font-semibold text-yellow-500 mb-4">Why Gas Boys?</div>
              {['Direct from ORYX refineries — best pricing', 'Flexible delivery schedules', 'Dedicated account manager', 'SANS-compliant installations included', 'Monthly invoicing available for businesses'].map(f => (
                <div key={f} className="flex items-start gap-2.5 mb-3 text-sm text-gas-text2">
                  <CheckCircle size={14} className="text-yellow-500 mt-0.5 flex-shrink-0" weight="fill" />
                  {f}
                </div>
              ))}
            </div>
            <div className="card p-5">
              <div className="text-sm text-gas-muted mb-3">Prefer to discuss over the phone?</div>
              <a href={`tel:${contactInfo.phone1.replace(/\s/g,'')}`} className="btn-ghost w-full justify-center text-sm py-3 mb-3">{contactInfo.phone1}</a>
              <a href={`https://wa.me/${contactInfo.whatsapp}?text=Hi!%20I%27d%20like%20a%20bulk%20gas%20quote%20for%20my%20business.`} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full justify-center text-sm py-3">
                <ChatsCircle size={15} weight="fill" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
