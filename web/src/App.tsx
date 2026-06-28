import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
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
import Admin from './pages/Admin'
import Pitch from './pages/Pitch'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-gas-bg text-gas-text font-body">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/order" element={<Order />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<Services />} />
            <Route path="/book" element={<Book />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/pitch" element={<Pitch />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
