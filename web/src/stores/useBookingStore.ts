import { create } from 'zustand'

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'

export interface Booking {
  id: string
  ref: string
  serviceType: string
  customer: {
    name: string
    phone: string
    email?: string
    address: string
  }
  date: string
  time: string
  status: BookingStatus
  technicianName?: string
  notes?: string
  createdAt: Date
}

interface BookingState {
  bookings: Booking[]
  addBooking: (b: Omit<Booking, 'id' | 'ref' | 'status' | 'createdAt'>) => string
  updateStatus: (id: string, status: BookingStatus) => void
  assignTech: (id: string, name: string) => void
  addNote: (id: string, note: string) => void
  todayCount: () => number
}

const SEED_BOOKINGS: Booking[] = [
  {
    id: 'b-seed-1', ref: 'B-089', serviceType: 'Gas Repair',
    customer: { name: 'Ryan Pretorius', phone: '072 334 4556', address: '45 Vorna Valley Rd, Midrand' },
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: 'Morning (8–12)', status: 'confirmed', technicianName: 'Robert',
    createdAt: new Date(Date.now() - 86400000 * 2),
  },
  {
    id: 'b-seed-2', ref: 'B-088', serviceType: 'CoC Certificate',
    customer: { name: 'Thandi Nkosi', phone: '060 112 3344', address: '8 Midrand Ext 5' },
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: 'Afternoon (12–5)', status: 'pending',
    createdAt: new Date(Date.now() - 86400000),
  },
  {
    id: 'b-seed-3', ref: 'B-087', serviceType: 'Installation',
    customer: { name: 'James Liu', phone: '084 998 7766', address: '19 Corporate Park, Midrand' },
    date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    time: 'Morning (8–12)', status: 'confirmed', technicianName: 'Tsaki',
    createdAt: new Date(Date.now() - 86400000 * 3),
  },
]

export const useBookingStore = create<BookingState>((set, get) => ({
  bookings: SEED_BOOKINGS,

  addBooking: (b) => {
    const num = Math.floor(100 + Math.random() * 900)
    const ref = `B-${num}`
    const newBooking: Booking = {
      ...b,
      id: `booking-${Date.now()}`,
      ref,
      status: 'pending',
      createdAt: new Date(),
    }
    set(s => ({ bookings: [newBooking, ...s.bookings] }))
    return ref
  },

  updateStatus: (id, status) => {
    set(s => ({ bookings: s.bookings.map(b => b.id === id ? { ...b, status } : b) }))
  },

  assignTech: (id, name) => {
    set(s => ({ bookings: s.bookings.map(b => b.id === id ? { ...b, technicianName: name } : b) }))
  },

  addNote: (id, note) => {
    set(s => ({ bookings: s.bookings.map(b => b.id === id ? { ...b, notes: note } : b) }))
  },

  todayCount: () => {
    const today = new Date().toDateString()
    return get().bookings.filter(b =>
      new Date(b.date).toDateString() === today && b.status !== 'cancelled'
    ).length
  },
}))
