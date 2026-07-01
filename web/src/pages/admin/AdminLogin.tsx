import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeSlash, Warning } from '@phosphor-icons/react'
import logo from '/logo/gas-boys-logo-transparent-512.png'

const CREDS = { username: 'info@gasboys.co.za', password: 'Pass@123' }

export default function AdminLogin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Already logged in
  if (localStorage.getItem('gb_admin_session')) {
    navigate('/admin/dashboard', { replace: true })
    return null
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setTimeout(() => {
      if (form.username === CREDS.username && form.password === CREDS.password) {
        localStorage.setItem('gb_admin_session', 'true')
        navigate('/admin/dashboard', { replace: true })
      } else {
        setError('Incorrect username or password.')
        setLoading(false)
      }
    }, 600)
  }

  return (
    <div className="min-h-screen bg-gas-bg flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src={logo} alt="Gas Boys" className="h-16 w-auto mx-auto mb-4" />
          <div className="text-xs font-bold tracking-[4px] text-gas-muted uppercase">Admin Portal</div>
        </div>

        {/* Card */}
        <div className="card p-8">
          <h1 className="font-display text-3xl mb-1">SIGN <span className="text-yellow-500">IN</span></h1>
          <p className="text-sm text-gas-muted mb-6">Gas Boys Midrand internal portal</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Email Address</label>
              <input
                className="input"
                type="email"
                value={form.username}
                onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                placeholder="info@gasboys.co.za"
                autoComplete="email"
                autoFocus
              />
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input
                  className="input pr-11"
                  type={showPw ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gas-muted hover:text-gas-text transition-colors"
                >
                  {showPw ? <EyeSlash size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2.5">
                <Warning size={14} weight="fill" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !form.username || !form.password}
              className="btn-primary w-full justify-center py-3.5 text-base mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gas-muted2 mt-6">
          Gas Boys Midrand · Authorised Access Only
        </p>
      </div>
    </div>
  )
}
