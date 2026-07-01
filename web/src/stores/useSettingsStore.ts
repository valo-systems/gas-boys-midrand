import { create } from 'zustand'

export interface BusinessSettings {
  businessName: string
  tagline: string
  phone: string
  whatsapp: string        // digits only, no spaces — used in wa.me links
  email: string
  address: string
  addressShort: string    // one-liner for nav/footer
  mapUrl: string
  hours: {
    weekdays: string
    saturday: string
    sunday: string
  }
  tradingAreas: string[]
  pricePerKg: number
}

interface SettingsState {
  settings: BusinessSettings
  updateSettings: (patch: Partial<BusinessSettings>) => void
  updateHours: (patch: Partial<BusinessSettings['hours']>) => void
}

const DEFAULTS: BusinessSettings = {
  businessName: 'The Gas Boys Midrand',
  tagline:      'Your Local Gas Experts',
  phone:        '010 023 0000',
  whatsapp:     '27640263510',
  email:        'sales@thegasboysmidrand.com',
  address:      '218 Whisken Rd, Crowthorne, Midrand, 1685',
  addressShort: 'Crowthorne, Midrand',
  mapUrl:       'https://maps.google.com/?q=218+Whisken+Rd+Crowthorne+Midrand',
  hours: {
    weekdays: '07:00 – 18:00',
    saturday: '07:00 – 17:00',
    sunday:   '08:00 – 14:00',
  },
  tradingAreas: ['Midrand', 'Centurion', 'Fourways', 'Sandton', 'Randburg', 'Pretoria East'],
  pricePerKg:   41.50,
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: DEFAULTS,

  updateSettings: (patch) =>
    set(s => ({ settings: { ...s.settings, ...patch } })),

  updateHours: (patch) =>
    set(s => ({ settings: { ...s.settings, hours: { ...s.settings.hours, ...patch } } })),
}))
