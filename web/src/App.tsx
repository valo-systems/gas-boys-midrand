import { BrowserRouter, Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Order from './pages/Order'
import Services from './pages/Services'
import Book from './pages/Book'
import Shop from './pages/Shop'
import Quote from './pages/Quote'
import About from './pages/About'
import Contact from './pages/Contact'
import Pitch from './pages/Pitch'
import TrackOrder from './pages/TrackOrder'
import Safety from './pages/Safety'

// Admin pages
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './components/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import OrdersList from './pages/admin/OrdersList'
import OrderDetail from './pages/admin/OrderDetail'
import InventoryGrid from './pages/admin/InventoryGrid'
import AddProduct from './pages/admin/AddProduct'
import BookingsList from './pages/admin/BookingsList'
import QuotesList from './pages/admin/QuotesList'
import Customers from './pages/admin/Customers'
import Reports from './pages/admin/Reports'
import Settings from './pages/admin/Settings'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function AdminGuard() {
  const session = localStorage.getItem('gb_admin_session')
  if (!session) return <Navigate to="/admin" replace />
  return <Outlet />
}

// Public layout wrapper (Navbar + Footer)
function PublicLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-gas-bg text-gas-text font-body">
        <Routes>
          {/* Public routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/order" element={<Order />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<Services />} />
            <Route path="/book" element={<Book />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/track" element={<TrackOrder />} />
            <Route path="/safety" element={<Safety />} />
            <Route path="/pitch" element={<Pitch />} />
          </Route>

          {/* Admin routes — no Navbar/Footer */}
          <Route path="/admin">
            <Route index element={<AdminLogin />} />
            <Route element={<AdminGuard />}>
              <Route element={<AdminLayout />}>
                <Route path="dashboard"     element={<Dashboard />} />
                <Route path="orders"        element={<OrdersList />} />
                <Route path="orders/:id"    element={<OrderDetail />} />
                <Route path="inventory"     element={<InventoryGrid />} />
                <Route path="inventory/add" element={<AddProduct />} />
                <Route path="bookings"      element={<BookingsList />} />
                <Route path="quotes"        element={<QuotesList />} />
                <Route path="customers"     element={<Customers />} />
                <Route path="reports"       element={<Reports />} />
                <Route path="settings"      element={<Settings />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}
