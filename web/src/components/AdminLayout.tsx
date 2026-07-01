import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  SquaresFour, Package, Stack, CalendarCheck, FileText,
  Users, ChartBar, Gear, ArrowSquareOut, SignOut, Warning,
} from '@phosphor-icons/react'
import { useOrderStore } from '../stores/useOrderStore'
import { useInventoryStore } from '../stores/useInventoryStore'
import { useQuoteStore } from '../stores/useQuoteStore'
import logo from '/logo/gas-boys-logo-transparent-256.png'

const NAV = [
  { to: '/admin/dashboard',  label: 'Dashboard',  Icon: SquaresFour },
  { to: '/admin/orders',     label: 'Orders',      Icon: Package,      badge: 'orders' },
  { to: '/admin/inventory',  label: 'Inventory',   Icon: Stack,        badge: 'stock' },
  { to: '/admin/bookings',   label: 'Bookings',    Icon: CalendarCheck },
  { to: '/admin/quotes',     label: 'Quotes',      Icon: FileText,     badge: 'quotes' },
]

const NAV2 = [
  { to: '/admin/customers',  label: 'Customers',  Icon: Users },
  { to: '/admin/reports',    label: 'Reports',    Icon: ChartBar },
  { to: '/admin/settings',   label: 'Settings',   Icon: Gear },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const pendingCount  = useOrderStore(s => s.pendingCount())
  const lowStockCount = useInventoryStore(s => s.lowStockItems().length)
  const openQuotes    = useQuoteStore(s => s.openCount())

  function logout() {
    localStorage.removeItem('gb_admin_session')
    navigate('/admin')
  }

  function badge(key?: string) {
    if (key === 'orders' && pendingCount  > 0) return pendingCount
    if (key === 'stock'  && lowStockCount > 0) return lowStockCount
    if (key === 'quotes' && openQuotes    > 0) return openQuotes
    return null
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
      isActive
        ? 'bg-yellow-500/15 text-yellow-500'
        : 'text-gas-muted hover:text-gas-text hover:bg-gas-card'
    }`

  return (
    <div className="flex min-h-screen bg-gas-bg">
      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside className="w-60 fixed left-0 top-0 h-screen bg-gas-surface border-r border-gas-border flex flex-col z-40 overflow-y-auto">
        {/* Logo */}
        <div className="px-4 py-5 border-b border-gas-border">
          <img src={logo} alt="Gas Boys" className="h-9 w-auto mb-1" />
          <span className="text-[9px] font-bold tracking-[3px] text-gas-muted uppercase pl-0.5">Admin Portal</span>
        </div>

        {/* Main nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map(({ to, label, Icon, badge: b }) => {
            const count = badge(b)
            return (
              <NavLink key={to} to={to} className={linkClass}>
                <Icon size={17} weight="duotone" className="flex-shrink-0" />
                <span className="flex-1">{label}</span>
                {count !== null && (
                  <span className="text-[10px] font-bold bg-yellow-500 text-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                    {count}
                  </span>
                )}
              </NavLink>
            )
          })}

          <div className="my-3 border-t border-gas-border" />

          {NAV2.map(({ to, label, Icon }) => (
            <NavLink key={to} to={to} className={linkClass}>
              <Icon size={17} weight="duotone" className="flex-shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="px-3 py-4 border-t border-gas-border space-y-1">
          {lowStockCount > 0 && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-xs text-orange-400 mb-2">
              <Warning size={14} weight="fill" />
              {lowStockCount} item{lowStockCount > 1 ? 's' : ''} low on stock
            </div>
          )}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gas-muted hover:text-gas-text hover:bg-gas-card transition-all"
          >
            <ArrowSquareOut size={17} weight="duotone" />
            View Site
          </a>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gas-muted hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <SignOut size={17} weight="duotone" />
            Logout
          </button>
        </div>
      </aside>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="ml-60 flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-14 bg-gas-surface border-b border-gas-border flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="text-xs text-gas-muted">
            {new Date().toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
          <div className="flex items-center gap-2 text-xs text-gas-muted">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            admin
          </div>
        </header>

        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
