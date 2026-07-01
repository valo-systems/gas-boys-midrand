import { useState } from 'react'
import { CheckCircle, Gear } from '@phosphor-icons/react'
import { useSettingsStore } from '../../stores/useSettingsStore'

export default function Settings() {
  const { settings, updateSettings, updateHours } = useSettingsStore()
  const [saved, setSaved] = useState(false)

  // Local form mirrors the store so edits are staged before saving
  const [form, setForm] = useState({ ...settings })
  const [hoursForm, setHoursForm] = useState({ ...settings.hours })

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))
  const updateH = (k: string, v: string) => setHoursForm(f => ({ ...f, [k]: v }))

  function handleSave() {
    updateSettings(form)
    updateHours(hoursForm)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-4xl mb-1">SETTINGS</h1>
        <p className="text-sm text-gas-muted">Changes save to the live site immediately</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Business identity */}
        <div className="card p-6">
          <div className="flex items-center gap-2 font-heading font-semibold mb-5">
            <Gear size={18} weight="duotone" className="text-yellow-500" />
            Business Identity
          </div>
          <div className="space-y-4">
            <div>
              <label className="label">Business Name</label>
              <input className="input" value={form.businessName} onChange={e => update('businessName', e.target.value)} />
            </div>
            <div>
              <label className="label">Tagline</label>
              <input className="input" value={form.tagline} onChange={e => update('tagline', e.target.value)} />
            </div>
          </div>
        </div>

        {/* Contact info */}
        <div className="card p-6">
          <div className="font-heading font-semibold mb-5">Contact Information</div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Phone Number</label>
                <input className="input" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="010 023 0000" />
              </div>
              <div>
                <label className="label">WhatsApp Number (digits only)</label>
                <input className="input" value={form.whatsapp} onChange={e => update('whatsapp', e.target.value)} placeholder="27640263510" />
                <p className="text-[10px] text-gas-muted mt-1">Used in wa.me links — include country code, no spaces</p>
              </div>
            </div>
            <div>
              <label className="label">Email Address</label>
              <input className="input" type="email" value={form.email} onChange={e => update('email', e.target.value)} />
            </div>
            <div>
              <label className="label">Full Address</label>
              <input className="input" value={form.address} onChange={e => update('address', e.target.value)} />
            </div>
            <div>
              <label className="label">Short Address (footer/nav)</label>
              <input className="input" value={form.addressShort} onChange={e => update('addressShort', e.target.value)} placeholder="Crowthorne, Midrand" />
            </div>
            <div>
              <label className="label">Google Maps URL</label>
              <input className="input" value={form.mapUrl} onChange={e => update('mapUrl', e.target.value)} />
            </div>
          </div>
        </div>

        {/* Trading hours */}
        <div className="card p-6">
          <div className="font-heading font-semibold mb-5">Trading Hours</div>
          <div className="space-y-4">
            {[
              { key: 'weekdays', label: 'Monday – Friday' },
              { key: 'saturday', label: 'Saturday' },
              { key: 'sunday',   label: 'Sunday' },
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center gap-4">
                <div className="w-36 text-sm text-gas-muted flex-shrink-0">{label}</div>
                <input
                  className="input flex-1"
                  value={hoursForm[key as keyof typeof hoursForm]}
                  onChange={e => updateH(key, e.target.value)}
                  placeholder="07:00 – 18:00"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Admin credentials */}
        <div className="card p-6">
          <div className="font-heading font-semibold mb-3">Admin Access</div>
          <div className="space-y-3 text-sm text-gas-muted">
            <div className="flex justify-between">
              <span>Username</span><span className="text-gas-text font-mono">admin</span>
            </div>
            <div className="flex justify-between">
              <span>Password</span><span className="text-gas-text font-mono">••••••••</span>
            </div>
          </div>
          <p className="text-xs text-gas-muted mt-4">
            Role-based access and password management available in the production PHP/MySQL build.
          </p>
        </div>

        {/* Demo notice */}
        <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-5">
          <div className="font-heading font-semibold text-yellow-500 mb-2">Demo Mode</div>
          <p className="text-sm text-gas-muted">
            Settings save to in-memory state and reflect instantly across the site. In production, they'll persist to the MySQL database and sync across all admin users.
          </p>
        </div>

        <button onClick={handleSave} className="btn-primary w-full justify-center py-3.5">
          {saved
            ? <><CheckCircle size={16} weight="fill" /> Settings Saved!</>
            : 'Save Settings'
          }
        </button>
      </div>
    </div>
  )
}
