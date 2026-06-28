import { useState } from 'react'
import { Truck, Clipboard, ChartBar, Storefront, CheckCircle, Clock, Warning } from '@phosphor-icons/react'
import { adminOrders, adminBookings, adminQuotes } from '../data/mock'

type Tab = 'orders' | 'bookings' | 'quotes'

const statusBadge = (s: string) => {
  if (s === 'delivered' || s === 'confirmed' || s === 'sent') return <span className="badge-green"><CheckCircle size={10} weight="fill" />{s.charAt(0).toUpperCase()+s.slice(1)}</span>
  if (s === 'en_route' || s === 'in_review') return <span className="badge-orange"><Clock size={10} />{s === 'en_route' ? 'En Route' : 'In Review'}</span>
  return <span className="badge-muted"><Warning size={10} />Pending</span>
}

export default function Admin() {
  const [tab, setTab] = useState<Tab>('orders')
  const todayRevenue = adminOrders.reduce((s, o) => s + o.total, 0)

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="section-label mb-1">Friday 27 June 2026</div>
            <h1 className="font-display text-5xl">ADMIN <span className="text-yellow-500">DASHBOARD</span></h1>
          </div>
          <div className="badge-muted px-3 py-1.5 text-xs">Mock Data — No Auth</div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Truck, label: 'Orders Today', value: adminOrders.length, color: 'text-yellow-500' },
            { icon: Clipboard, label: 'Pending Bookings', value: adminBookings.filter(b => b.status === 'pending').length, color: 'text-yellow-500' },
            { icon: ChartBar, label: 'Quote Requests', value: adminQuotes.length, color: 'text-yellow-500' },
            { icon: Storefront, label: 'Revenue Today', value: `R${todayRevenue.toFixed(0)}`, color: 'text-green-400' },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="card p-5">
              <div className="w-9 h-9 rounded-xl bg-yellow-500/10 flex items-center justify-center mb-4">
                <Icon size={18} className="text-yellow-500" weight="duotone" />
              </div>
              <div className={`font-display text-4xl ${color} leading-none mb-1`}>{value}</div>
              <div className="text-xs text-gas-muted">{label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {([['orders', Truck, 'Orders'], ['bookings', Clipboard, 'Bookings'], ['quotes', ChartBar, 'Quotes']] as const).map(([t, Icon, l]) => (
            <button key={t} onClick={() => setTab(t)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${tab === t ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500' : 'bg-gas-card2 border-gas-border text-gas-muted hover:border-gas-border2'}`}>
              <Icon size={15} weight="duotone" />{l}
            </button>
          ))}
        </div>

        {/* Orders table */}
        {tab === 'orders' && (
          <div className="card overflow-hidden">
            <div className="p-5 border-b border-gas-border flex justify-between items-center">
              <div className="font-heading font-semibold">Today's Orders</div>
              <button className="btn-ghost text-xs py-2 px-3 rounded-lg">Export CSV</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="bg-gas-card2 text-[10px] uppercase tracking-widest text-gas-muted">
                  <th className="px-5 py-3 text-left">#</th>
                  <th className="px-5 py-3 text-left">Customer</th>
                  <th className="px-5 py-3 text-left">Phone</th>
                  <th className="px-5 py-3 text-left">Cylinder</th>
                  <th className="px-5 py-3 text-left">Address</th>
                  <th className="px-5 py-3 text-left">Total</th>
                  <th className="px-5 py-3 text-left">Time</th>
                  <th className="px-5 py-3 text-left">Status</th>
                </tr></thead>
                <tbody>
                  {adminOrders.map(o => (
                    <tr key={o.id} className="border-t border-gas-border hover:bg-gas-card2/50 transition-colors">
                      <td className="px-5 py-4 text-gas-muted2 font-mono">#{o.id}</td>
                      <td className="px-5 py-4 font-medium">{o.customer}</td>
                      <td className="px-5 py-4 text-gas-muted">{o.phone}</td>
                      <td className="px-5 py-4">{o.cylinder} × {o.qty}</td>
                      <td className="px-5 py-4 text-gas-muted text-xs max-w-[180px] truncate">{o.address}</td>
                      <td className="px-5 py-4 font-display text-lg text-yellow-500">R{o.total}</td>
                      <td className="px-5 py-4 text-gas-muted">{o.time}</td>
                      <td className="px-5 py-4">{statusBadge(o.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bookings table */}
        {tab === 'bookings' && (
          <div className="card overflow-hidden">
            <div className="p-5 border-b border-gas-border font-heading font-semibold">Upcoming Bookings</div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="bg-gas-card2 text-[10px] uppercase tracking-widest text-gas-muted">
                  <th className="px-5 py-3 text-left">Ref</th><th className="px-5 py-3 text-left">Customer</th><th className="px-5 py-3 text-left">Service</th><th className="px-5 py-3 text-left">Date</th><th className="px-5 py-3 text-left">Time</th><th className="px-5 py-3 text-left">Status</th>
                </tr></thead>
                <tbody>
                  {adminBookings.map(b => (
                    <tr key={b.id} className="border-t border-gas-border hover:bg-gas-card2/50">
                      <td className="px-5 py-4 text-gas-muted2 font-mono">{b.id}</td>
                      <td className="px-5 py-4"><div className="font-medium">{b.customer}</div><div className="text-xs text-gas-muted">{b.phone}</div></td>
                      <td className="px-5 py-4">{b.service}</td>
                      <td className="px-5 py-4">{b.date}</td>
                      <td className="px-5 py-4 text-gas-muted">{b.time}</td>
                      <td className="px-5 py-4">{statusBadge(b.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Quotes table */}
        {tab === 'quotes' && (
          <div className="card overflow-hidden">
            <div className="p-5 border-b border-gas-border font-heading font-semibold">Quote Requests</div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="bg-gas-card2 text-[10px] uppercase tracking-widest text-gas-muted">
                  <th className="px-5 py-3 text-left">Ref</th><th className="px-5 py-3 text-left">Company</th><th className="px-5 py-3 text-left">Contact</th><th className="px-5 py-3 text-left">Volume</th><th className="px-5 py-3 text-left">Submitted</th><th className="px-5 py-3 text-left">Status</th>
                </tr></thead>
                <tbody>
                  {adminQuotes.map(q => (
                    <tr key={q.id} className="border-t border-gas-border hover:bg-gas-card2/50">
                      <td className="px-5 py-4 text-gas-muted2 font-mono">{q.id}</td>
                      <td className="px-5 py-4 font-medium">{q.company}</td>
                      <td className="px-5 py-4"><div>{q.contact}</div><div className="text-xs text-gas-muted">{q.phone}</div></td>
                      <td className="px-5 py-4">{q.volume}</td>
                      <td className="px-5 py-4 text-gas-muted">{q.submitted}</td>
                      <td className="px-5 py-4">{statusBadge(q.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
