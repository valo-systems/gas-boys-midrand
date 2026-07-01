import { Navigate, Outlet } from 'react-router-dom'

export default function AdminGuard() {
  const session = localStorage.getItem('gb_admin_session')
  if (!session) return <Navigate to="/admin" replace />
  return <Outlet />
}
