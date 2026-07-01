import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts'
import { useOrderStore } from '../../stores/useOrderStore'
import { useInventoryStore } from '../../stores/useInventoryStore'

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-gas-card border border-gas-border rounded-xl px-4 py-2.5 text-sm shadow-xl">
      <div className="text-gas-muted text-xs mb-1">{label}</div>
      <div className="font-display text-yellow-500 text-lg">R{payload[0].value.toLocaleString('en-ZA', { minimumFractionDigits: 0 })}</div>
    </div>
  )
}

const COLORS = ['#FFD600', '#FF6B00', '#4ADE80', '#60A5FA', '#A78BFA']

export default function Reports() {
  const orders   = useOrderStore(s => s.orders)
  const products = useInventoryStore(s => s.products)

  const completed = orders.filter(o => o.status !== 'cancelled')
  const totalRevenue = completed.reduce((s, o) => s + o.total, 0)
  const avgOrder = completed.length ? totalRevenue / completed.length : 0

  // Last 30 days by week
  const weekData = Array.from({ length: 4 }, (_, w) => {
    const end = new Date(); end.setDate(end.getDate() - w * 7)
    const start = new Date(end); start.setDate(start.getDate() - 7)
    const label = `Wk ${4 - w}`
    const revenue = completed
      .filter(o => { const d = new Date(o.createdAt); return d >= start && d < end })
      .reduce((s, o) => s + o.total, 0)
    return { label, revenue }
  }).reverse()

  // Revenue by category
  const catRevenue: Record<string, number> = {}
  for (const o of completed) {
    for (const item of o.items) {
      const prod = products.find(p => p.id === item.productId)
      const cat = prod?.category ?? 'other'
      catRevenue[cat] = (catRevenue[cat] ?? 0) + item.qty * item.unitPrice
    }
  }
  const pieData = Object.entries(catRevenue).map(([name, value]) => ({ name, value }))

  // Top 5 products by qty sold
  const prodQty: Record<string, { name: string; qty: number }> = {}
  for (const o of completed) {
    for (const item of o.items) {
      if (!prodQty[item.productId]) prodQty[item.productId] = { name: item.name, qty: 0 }
      prodQty[item.productId].qty += item.qty
    }
  }
  const topProducts = Object.values(prodQty).sort((a, b) => b.qty - a.qty).slice(0, 5)

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-4xl mb-1">REPORTS</h1>
        <p className="text-sm text-gas-muted">Sales and performance summary</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Revenue', value: `R${totalRevenue.toLocaleString('en-ZA', { minimumFractionDigits: 0 })}`, color: 'text-yellow-500' },
          { label: 'Total Orders',  value: completed.length, color: 'text-blue-400' },
          { label: 'Avg Order Value', value: `R${avgOrder.toFixed(0)}`, color: 'text-green-400' },
          { label: 'Products Listed', value: products.length, color: 'text-purple-400' },
        ].map(kpi => (
          <div key={kpi.label} className="card p-5">
            <div className={`font-display text-4xl mb-1 ${kpi.color}`}>{kpi.value}</div>
            <div className="text-xs text-gas-muted">{kpi.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        {/* Weekly revenue */}
        <div className="card p-6">
          <div className="font-heading font-semibold mb-1">Weekly Revenue (Last 4 Weeks)</div>
          <div className="text-xs text-gas-muted mb-5">Non-cancelled orders only</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weekData} barCategoryGap="35%">
              <CartesianGrid strokeDasharray="3 3" stroke="#2E2E2E" vertical={false} />
              <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 10 }} tickFormatter={v => `R${v.toLocaleString()}`} width={70} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,214,0,0.05)' }} />
              <Bar dataKey="revenue" fill="#FFD600" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue by category pie */}
        <div className="card p-6">
          <div className="font-heading font-semibold mb-1">Revenue by Category</div>
          <div className="text-xs text-gas-muted mb-5">Based on order items</div>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name }) => name}>
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Legend wrapperStyle={{ fontSize: '11px', color: '#888' }} />
                <Tooltip formatter={(v) => `R${Number(v).toFixed(0)}`} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-48 flex items-center justify-center text-gas-muted text-sm">No order data yet</div>
          )}
        </div>
      </div>

      {/* Top products */}
      {topProducts.length > 0 && (
        <div className="card p-6">
          <div className="font-heading font-semibold mb-4">Top Products by Units Sold</div>
          <div className="space-y-3">
            {topProducts.map((p, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="font-display text-2xl text-gas-muted w-6 text-right">{i + 1}</span>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{p.name}</span>
                    <span className="text-yellow-500 font-bold">{p.qty} sold</span>
                  </div>
                  <div className="h-1.5 bg-gas-card2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-500 rounded-full"
                      style={{ width: `${(p.qty / topProducts[0].qty) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-xs text-gas-muted mt-6 text-center">
        Advanced reports with date range filters, export to Excel, and trend analysis available in the production build.
      </p>
    </div>
  )
}
