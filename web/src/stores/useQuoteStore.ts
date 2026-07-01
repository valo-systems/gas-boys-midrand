import { create } from 'zustand'

export type QuoteStatus = 'new' | 'in_review' | 'responded' | 'won' | 'lost'

export interface Quote {
  id: string
  ref: string
  company: string
  contact: string
  phone: string
  email: string
  gasType: string
  volume: string
  address: string
  requirements: string
  status: QuoteStatus
  responseAmount?: number
  responseNotes?: string
  createdAt: Date
}

interface QuoteState {
  quotes: Quote[]
  addQuote: (q: Omit<Quote, 'id' | 'ref' | 'status' | 'createdAt'>) => string
  respond: (id: string, amount: number, notes: string) => void
  markWon: (id: string) => void
  markLost: (id: string) => void
  openCount: () => number
}

const SEED_QUOTES: Quote[] = [
  {
    id: 'q-seed-1', ref: 'Q-034', company: 'Bella Cucina Restaurant', contact: 'Maria S.',
    phone: '011 234 5678', email: 'maria@bellacucina.co.za', gasType: 'LPG (Propane)',
    volume: '100–500 kg/month', address: '12 Rivonia Rd, Sandton', requirements: 'Need daily delivery for commercial kitchen with 6 burners.',
    status: 'in_review', createdAt: new Date(Date.now() - 86400000 * 3),
  },
  {
    id: 'q-seed-2', ref: 'Q-033', company: 'Midrand Factory Park', contact: 'George T.',
    phone: '082 777 8899', email: 'george@midrandfactory.co.za', gasType: 'LPG (Propane)',
    volume: '1–5 tons/month', address: '4 Galaxy Ave, Linbro Park', requirements: 'Bulk industrial gas for manufacturing process. Need monthly supply contract.',
    status: 'new', createdAt: new Date(Date.now() - 86400000),
  },
  {
    id: 'q-seed-3', ref: 'Q-032', company: 'Sunridge B&B', contact: 'Lisa M.',
    phone: '073 445 6677', email: 'lisa@sunridge.co.za', gasType: 'LPG (Propane)',
    volume: '100–500 kg/month', address: '22 Sunridge Park, Midrand', requirements: 'Gas for 8 guest rooms and kitchen. Currently buying retail, looking for better pricing.',
    status: 'responded', responseAmount: 4200, responseNotes: 'Offered R4,200/month for 100kg/month supply with weekly delivery.',
    createdAt: new Date(Date.now() - 86400000 * 7),
  },
]

export const useQuoteStore = create<QuoteState>((set, get) => ({
  quotes: SEED_QUOTES,

  addQuote: (q) => {
    const num = Math.floor(100 + Math.random() * 900)
    const ref = `Q-${num}`
    const newQuote: Quote = {
      ...q,
      id: `quote-${Date.now()}`,
      ref,
      status: 'new',
      createdAt: new Date(),
    }
    set(s => ({ quotes: [newQuote, ...s.quotes] }))
    return ref
  },

  respond: (id, amount, notes) => {
    set(s => ({
      quotes: s.quotes.map(q =>
        q.id === id ? { ...q, status: 'responded', responseAmount: amount, responseNotes: notes } : q
      )
    }))
  },

  markWon: (id) => set(s => ({ quotes: s.quotes.map(q => q.id === id ? { ...q, status: 'won' } : q) })),
  markLost: (id) => set(s => ({ quotes: s.quotes.map(q => q.id === id ? { ...q, status: 'lost' } : q) })),

  openCount: () => get().quotes.filter(q => q.status === 'new' || q.status === 'in_review').length,
}))
