import { Users } from '@phosphor-icons/react'
import { useOrderStore } from '../../stores/useOrderStore'

export default function Customers() {
  const orders = useOrderStore(s => s.orders)

  // Derive unique customers from orders
  const customerMap = new Map<string, { name: string; phone: string; email?: string; orders: number; total: number; lastOrder: Date }>()
  for (const o of orders) {
    const key = o.customer.phone.replace(/\D/g, '')
    const existing = customerMap.get(key)
    if (existing) {
      existing.orders++
      existing.total += o.total
      if (new Date(o.createdAt) > existing.lastOrder) existing.lastOrder = new Date(o.createdAt)
    } else {
      customerMap.set(key, {
        name: o.customer.name,
        phone: o.customer.phone,
        email: o.customer.email,
        orders: 1,
        total: o.total,
        lastOrder: new Date(o.createdAt),
      })
    }
  }

  const customers = [...customerMap.values()].sort((a, b) => b.total - a.total)

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-4xl mb-1">CUSTOMERS</h1>
        <p className="text-sm text-gas-muted">{customers.length} unique customers from order history</p>
      </div>

      {customers.length === 0 ? (
        <div className="card p-16 text-center">
          <Users size={48} weight="duotone" className="text-gas-muted mx-auto mb-4" />
          <div className="text-gas-muted text-sm">No customers yet — they'll appear once orders are placed.</div>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="grid grid-cols-[1.5fr_1fr_1fr_90px_80px] gap-4 px-5 py-3 border-b border-gas-border text-[10px] font-bold uppercase tracking-widest text-gas-muted">
            <div>Customer</div>
            <div>Phone</div>
            <div>Last Order</div>
            <div className="text-right">Total Spend</div>
            <div className="text-right">Orders</div>
          </div>
          <div className="divide-y divide-gas-border">
            {customers.map((c, i) => (
              <div key={i} className="grid grid-cols-[1.5fr_1fr_1fr_90px_80px] gap-4 px-5 py-4 hover:bg-gas-card2 transition-colors items-center">
                <div>
                  <div className="font-medium text-sm">{c.name}</div>
                  {c.email && <div className="text-xs text-gas-muted truncate">{c.email}</div>}
                </div>
                <div>
                  <a href={`tel:${c.phone}`} className="text-sm text-yellow-500 hover:underline">{c.phone}</a>
                </div>
                <div className="text-xs text-gas-muted">
                  {c.lastOrder.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
                <div className="text-right font-display text-base text-yellow-500">R{c.total.toFixed(0)}</div>
                <div className="text-right text-sm text-gas-muted">{c.orders}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-xs text-gas-muted mt-6 text-center">
        Full CRM with customer profiles, purchase history, and loyalty tracking will be available in the production build.
      </p>
    </div>
  )
}
