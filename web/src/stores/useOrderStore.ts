import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useInventoryStore } from './useInventoryStore'

export type OrderStatus = 'pending' | 'confirmed' | 'dispatched' | 'delivered' | 'cancelled'
export type PaymentMethod = 'cash' | 'eft'
export type PaymentStatus = 'unpaid' | 'partial' | 'paid'

export interface OrderItem {
  productId: string
  name: string
  size?: number
  qty: number
  unitPrice: number
}

export interface OrderCustomer {
  name: string
  phone: string
  email?: string
  address: string
  notes?: string
}

export interface Order {
  id: string
  ref: string
  items: OrderItem[]
  customer: OrderCustomer
  status: OrderStatus
  paymentStatus: PaymentStatus
  paymentMethod?: PaymentMethod
  amountPaid: number
  total: number
  adminNotes: string[]
  createdAt: Date
}

interface OrderState {
  orders: Order[]
  addOrder: (items: OrderItem[], customer: OrderCustomer) => string
  updateStatus: (id: string, status: OrderStatus) => void
  markPaid: (id: string, amount: number, method: PaymentMethod) => void
  addNote: (id: string, note: string) => void
  getByRef: (ref: string) => Order | undefined
  clearPersistedOrders: () => void
  // computed
  pendingCount: () => number
  todayRevenue: () => number
}

function generateRef() {
  const year = new Date().getFullYear()
  const num = Math.floor(1000 + Math.random() * 9000)
  return `GB-${year}-${num}`
}

// Seed with a few realistic demo orders so admin dashboard looks live from first load
const now = new Date()

const SEED_ORDERS: Order[] = [
  {
    id: 'seed-1',
    ref: 'GB-2026-1001',
    items: [{ productId: 'GAS-19KG', name: '19 kg Gas Cylinder', size: 19, qty: 1, unitPrice: 788.50 }],
    customer: { name: 'Sandra Mokoena', phone: '082 456 7890', address: '12 Crowthorne Ave, Midrand' },
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'cash',
    amountPaid: 788.50,
    total: 788.50,
    adminNotes: [],
    createdAt: new Date(now.getTime() - 3600000 * 3),
  },
  {
    id: 'seed-2',
    ref: 'GB-2026-1002',
    items: [{ productId: 'GAS-48KG', name: '48 kg Commercial Cylinder', size: 48, qty: 1, unitPrice: 1992.00 }],
    customer: { name: 'Sipho Khumalo', phone: '073 123 4567', address: '5 Kyalami Blvd, Kyalami' },
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'eft',
    amountPaid: 1992.00,
    total: 1992.00,
    adminNotes: [],
    createdAt: new Date(now.getTime() - 3600000 * 5),
  },
  {
    id: 'seed-3',
    ref: 'GB-2026-1003',
    items: [{ productId: 'GAS-9KG', name: '9 kg Gas Cylinder', size: 9, qty: 2, unitPrice: 373.50 }],
    customer: { name: 'Anele Dlamini', phone: '064 987 6543', address: '33 Whisken Rd, Crowthorne', notes: 'Leave at gate' },
    status: 'dispatched',
    paymentStatus: 'unpaid',
    amountPaid: 0,
    total: 747.00,
    adminNotes: [],
    createdAt: new Date(now.getTime() - 3600000 * 1),
  },
  {
    id: 'seed-4',
    ref: 'GB-2026-1004',
    items: [{ productId: 'GAS-19KG', name: '19 kg Gas Cylinder', size: 19, qty: 2, unitPrice: 788.50 }],
    customer: { name: 'Marco van Zyl', phone: '083 222 3344', address: '7 Carlswald Rd, Carlswald' },
    status: 'pending',
    paymentStatus: 'unpaid',
    amountPaid: 0,
    total: 1577.00,
    adminNotes: [],
    createdAt: new Date(now.getTime() - 1800000),
  },
  {
    id: 'seed-5',
    ref: 'GB-2026-1005',
    items: [{ productId: 'GAS-14KG', name: '14 kg Gas Cylinder', size: 14, qty: 1, unitPrice: 582.00 }],
    customer: { name: 'Fatima Ahmed', phone: '071 556 7788', address: '22 Halfway Gardens, Midrand' },
    status: 'pending',
    paymentStatus: 'unpaid',
    amountPaid: 0,
    total: 582.00,
    adminNotes: [],
    createdAt: new Date(now.getTime() - 900000),
  },
]

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: SEED_ORDERS,

      addOrder: (items, customer) => {
        const ref = generateRef()
        const total = items.reduce((sum, i) => sum + i.unitPrice * i.qty, 0)

        const newOrder: Order = {
          id: `order-${Date.now()}`,
          ref,
          items,
          customer,
          status: 'pending',
          paymentStatus: 'unpaid',
          amountPaid: 0,
          total,
          adminNotes: [],
          createdAt: new Date(),
        }

        const { deductStock } = useInventoryStore.getState()
        items.forEach(item => deductStock(item.productId, item.qty))

        set(s => ({ orders: [newOrder, ...s.orders] }))
        return ref
      },

      updateStatus: (id, status) => {
        set(s => ({ orders: s.orders.map(o => o.id === id ? { ...o, status } : o) }))
      },

      markPaid: (id, amount, method) => {
        set(s => ({
          orders: s.orders.map(o => {
            if (o.id !== id) return o
            const paid = o.amountPaid + amount
            return {
              ...o,
              amountPaid: paid,
              paymentMethod: method,
              paymentStatus: paid >= o.total ? 'paid' : 'partial',
            }
          })
        }))
      },

      addNote: (id, note) => {
        set(s => ({
          orders: s.orders.map(o =>
            o.id === id ? { ...o, adminNotes: [...o.adminNotes, note] } : o
          )
        }))
      },

      getByRef: (ref) => get().orders.find(o => o.ref === ref),

      clearPersistedOrders: () => {
        set({ orders: SEED_ORDERS })
      },

      pendingCount: () => get().orders.filter(o => o.status === 'pending').length,

      todayRevenue: () => {
        const today = new Date().toDateString()
        return get().orders
          .filter(o => new Date(o.createdAt).toDateString() === today && o.status !== 'cancelled')
          .reduce((sum, o) => sum + o.total, 0)
      },
    }),
    {
      name: 'gb-orders',
      // Only persist the orders array — functions are excluded automatically
      partialize: (state) => ({ orders: state.orders }),
      // Revive Date objects after hydration from localStorage (JSON turns them into strings)
      onRehydrateStorage: () => (state) => {
        if (state?.orders) {
          state.orders = state.orders.map(o => ({
            ...o,
            createdAt: new Date(o.createdAt),
          }))
        }
      },
    }
  )
)
