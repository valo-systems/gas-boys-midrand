import { useState } from 'react'
import { MapPin, Phone, Clock, Envelope, ChatsCircle, CheckCircle } from '@phosphor-icons/react'
import { contactInfo } from '../data/mock'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', contact: '', subject: 'Gas Delivery', message: '' })
  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
        <div className="section-label mb-2">218 Whisken Rd, Crowthorne</div>
        <h1 className="font-display text-6xl md:text-7xl mb-12">GET IN <span className="text-yellow-500">TOUCH</span></h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left — info + map */}
          <div>
            <div className="space-y-5 mb-8">
              {[
                { Icon: MapPin, label: 'Address', val: contactInfo.address },
                { Icon: Phone, label: 'Phone', val: `${contactInfo.phone1} · ${contactInfo.phone2}` },
                { Icon: Envelope, label: 'Email', val: contactInfo.email },
                { Icon: Clock, label: 'Hours', val: `${contactInfo.hours}  ·  ${contactInfo.saturday}` },
              ].map(({ Icon, label, val }) => (
                <div key={label} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-yellow-500" weight="duotone" />
                  </div>
                  <div><div className="text-xs font-semibold text-gas-muted uppercase tracking-wider mb-0.5">{label}</div><div className="text-sm text-gas-text2">{val}</div></div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="card h-56 flex items-center justify-center gap-3 text-gas-muted mb-5">
              <MapPin size={22} className="text-yellow-500" weight="duotone" />
              <a href={contactInfo.mapUrl} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-yellow-500 transition-colors">View on Google Maps →</a>
            </div>

            <a href={`https://wa.me/${contactInfo.whatsapp}?text=Hi%20Gas%20Boys!%20I%27d%20like%20to%20get%20in%20touch.`} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full justify-center text-base py-3.5">
              <ChatsCircle size={20} weight="fill" /> Chat on WhatsApp
            </a>
          </div>

          {/* Right — form */}
          <div>
            {submitted ? (
              <div className="card p-10 text-center">
                <CheckCircle size={48} className="text-green-400 mx-auto mb-4" weight="fill" />
                <div className="font-display text-4xl mb-2">MESSAGE <span className="text-yellow-500">SENT!</span></div>
                <p className="text-gas-muted text-sm mb-6">We'll get back to you within a few hours during business hours.</p>
                <button onClick={() => setSubmitted(false)} className="btn-ghost">Send another</button>
              </div>
            ) : (
              <div className="card p-8 space-y-4">
                <div className="font-heading font-semibold text-lg mb-1">Send a Message</div>
                <div><label className="label">Your Name</label><input className="input" value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your name" /></div>
                <div><label className="label">Phone or Email</label><input className="input" value={form.contact} onChange={e => update('contact', e.target.value)} placeholder="How should we reach you?" /></div>
                <div>
                  <label className="label">Subject</label>
                  <select className="input" value={form.subject} onChange={e => update('subject', e.target.value)}>
                    <option>Gas Delivery</option><option>Repair Booking</option><option>Installation Quote</option><option>CoC Certificate</option><option>Bulk / Commercial</option><option>General Enquiry</option>
                  </select>
                </div>
                <div><label className="label">Message</label><textarea className="input resize-none" rows={5} value={form.message} onChange={e => update('message', e.target.value)} placeholder="How can we help you?" /></div>
                <button onClick={() => form.name && form.contact && form.message && setSubmitted(true)} className="btn-primary w-full justify-center text-base py-3.5">
                  <Envelope size={18} weight="duotone" /> Send Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
