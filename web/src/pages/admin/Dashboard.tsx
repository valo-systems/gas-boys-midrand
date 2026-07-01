import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { Package, CurrencyDollar, Clock, Warning } from '@phosphor-icons/react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useOrderStore } from '../../stores/useOrderStore'
import { useInventoryStore } from '../../stores/useInventoryStore'
import { useBookingStore } from '../../stores/useBookingStore'

const STATUS_COLORS: Record<string, string> = {
  pending: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
  confirmed: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  dispatched: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  delivered: 'text-green-400 bg-green-500/10 border-green-500/20',
  cancelled: 'text-red-400 bg-red-500/10 border-red-500/20',
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${STATUS_COLORS[status] ?? 'text-gas-muted bg-gas-card border-gas-border'}`}>
      {status}
    </span>
  )
}

// Animated count-up number
function CountUp({ to, prefix = '', decimals = 0 }: { to: number; prefix?: string; decimals?: number }) {
  const motionVal = useMotionValue(0)
  const rounded   = useTransform(motionVal, v =>
    `${prefix}${v.toLocaleString('en-ZA', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`
  )
  const spanRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ctrl = animate(motionVal, to, { duration: 1.2, ease: 'easeOut' })
    return ctrl.stop
  }, [to]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return rounded.on('change', v => { if (spanRef.current) spanRef.current.textContent = v })
  }, [rounded])

  return <span ref={spanRef}>0</span>
}

function StatCard({ label, value, sub, color = 'yellow', Icon, numericValue, prefix }: {
  label: string; value: string | number; sub?: string; color?: string; Icon: React.ElementType
  numericValue?: number; prefix?: string
}) {
  const colors: Record<string, string> = {
    yellow: 'text-yellow-500 bg-yellow-500/10',
    green:  'text-green-400  bg-green-500/10',
    blue:   'text-blue-400   bg-blue-500/10',
    red:    'text-red-400    bg-red-500/10',
    orange: 'text-orange-400 bg-orange-500/10',
  }
  const textColor = colors[color].split(' ')[0]
  return (
    <motion.div
      className="card p-5"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors[color]}`}>
          <Icon size={20} weight="duotone" className={textColor} />
        </div>
        {sub && <span className="text-[10px] text-gas-muted">{sub}</span>}
      </div>
      <div className={`font-display text-4xl mb-0.5 ${textColor}`}>
        {numericValue !== undefined
          ? <CountUp to={numericValue} prefix={prefix ?? ''} decimals={prefix === 'R' ? 0 : 0} />
          : value
        }
      </div>
      <div className="text-xs text-gas-muted">{label}</div>
    </motion.div>
  )
}

// Custom recharts tooltip
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-gas-card border border-gas-border rounded-xl px-4 py-2.5 text-sm shadow-xl">
      <div className="text-gas-muted text-xs mb-1">{label}</div>
      <div className="font-display text-yellow-500 text-lg">R{payload[0].value.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</div>
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const orders   = useOrderStore(s => s.orders)
  const products = useInventoryStore(s => s.products)
  const bookings = useBookingStore(s => s.bookings)

  const today = new Date().toDateString()
  const todayOrders  = orders.filter(o => new Date(o.createdAt).toDateString() === today)
  const todayRevenue = todayOrders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + o.total, 0)
  const pending      = orders.filter(o => o.status === 'pending').length
  const lowStock     = products.filter(p => p.stockQty <= p.lowStockAt)

  // Last 7 days revenue chart
  const chartData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    const label = d.toLocaleDateString('en-ZA', { weekday: 'short' })
    const revenue = orders
      .filter(o => new Date(o.createdAt).toDateString() === d.toDateString() && o.status !== 'cancelled')
      .reduce((s, o) => s + o.total, 0)
    return { day: label, revenue }
  })

  // Recent 5 orders
  const recent = [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5)

  // Upcoming bookings (future dates, not cancelled)
  const upcoming = [...bookings]
    .filter(b => new Date(b.date) >= new Date() && b.status !== 'cancelled')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3)

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-4xl mb-1">DASHBOARD</h1>
        <p className="text-sm text-gas-muted">Welcome back. Here's what's happening today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatCard label="Today's Orders"  value={todayOrders.length} numericValue={todayOrders.length}  sub="today"        color="yellow" Icon={Package} />
        <StatCard label="Today's Revenue" value={todayRevenue}       numericValue={todayRevenue}         prefix="R"         color="green"  Icon={CurrencyDollar} />
        <StatCard label="Pending Pickup"  value={pending}            numericValue={pending}              sub="need action"  color="orange" Icon={Clock} />
        <StatCard label="Low Stock Items" value={lowStock.length}    numericValue={lowStock.length}      sub={lowStock.length > 0 ? 'restock needed' : 'all good'} color={lowStock.length > 0 ? 'red' : 'green'} Icon={Warning} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Revenue Chart */}
        <div className="xl:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="font-heading font-semibold">Revenue — Last 7 Days</div>
              <div className="text-xs text-gas-muted mt-0.5">All non-cancelled orders</div>
            </div>
            <div className="font-display text-2xl text-yellow-500">
              R{chartData.reduce((s, d) => s + d.revenue, 0).toLocaleString('en-ZA', { minimumFractionDigits: 0 })}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} barCategoryGap="35%">
              <CartesianGrid strokeDasharray="3 3" stroke="#2E2E2E" vertical={false} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 10 }} tickFormatter={v => `R${v.toLocaleString()}`} width={70} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,214,0,0.05)' }} />
              <Bar dataKey="revenue" fill="#FFD600" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Upcoming Bookings */}
        <div className="card p-6">
          <div className="font-heading font-semibold mb-4">Upcoming Bookings</div>
          {upcoming.length === 0 ? (
            <div className="text-sm text-gas-muted text-center py-6">No upcoming bookings</div>
          ) : (
            <div className="space-y-3">
              {upcoming.map(b => (
                <div key={b.id} className="p-3 bg-gas-card2 rounded-xl border border-gas-border">
                  <div className="flex items-start justify-between mb-1">
                    <div className="text-sm font-medium">{b.customer.name}</div>
                    <StatusBadge status={b.status} />
                  </div>
                  <div className="text-xs text-gas-muted">{b.serviceType}</div>
                  <div className="text-xs text-yellow-500 mt-1">
                    {new Date(b.date).toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short' })} · {b.time}
                  </div>
                  {b.technicianName && <div className="text-[10px] text-gas-muted mt-0.5">Tech: {b.technicianName}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="xl:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="font-heading font-semibold">Recent Orders</div>
            <button onClick={() => navigate('/admin/orders')} className="text-xs text-yellow-500 hover:underline">View all →</button>
          </div>
          <div className="space-y-2">
            {recent.map(o => (
              <div
                key={o.id}
                onClick={() => navigate(`/admin/orders/${o.id}`)}
                className="flex items-center gap-4 p-3 rounded-xl border border-gas-border hover:border-gas-border2 hover:bg-gas-card2 transition-all cursor-pointer group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-yellow-500">{o.ref}</span>
                    {o.status === 'pending' && <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />}
                  </div>
                  <div className="text-sm font-medium truncate">{o.customer.name}</div>
                  <div className="text-xs text-gas-muted">{o.items.map(i => `${i.qty}× ${i.name}`).join(', ')}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-display text-base text-yellow-500">R{o.total.toFixed(0)}</div>
                  <StatusBadge status={o.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="font-heading font-semibold">Low Stock</div>
            <button onClick={() => navigate('/admin/inventory')} className="text-xs text-yellow-500 hover:underline">Manage →</button>
          </div>
          {lowStock.length === 0 ? (
            <div className="text-sm text-gas-muted text-center py-6">All products fully stocked</div>
          ) : (
            <div className="space-y-3">
              {lowStock.map(p => (
                <div key={p.id} className="flex items-center gap-3 p-3 bg-orange-500/5 border border-orange-500/20 rounded-xl">
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gas-card2">
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium truncate">{p.name}</div>
                    <div className={`text-xs font-bold mt-0.5 ${p.stockQty === 0 ? 'text-red-400' : 'text-orange-400'}`}>
                      {p.stockQty === 0 ? 'OUT OF STOCK' : `${p.stockQty} left`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
