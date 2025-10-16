import { Routes, Route, Link } from 'react-router-dom'
import TrackingPage from './pages/TrackingPage'
import CarbonPage from './pages/CarbonPage'
import BookingPage from './pages/BookingPage'
import DashboardPage from './pages/DashboardPage'
import DocumentsPage from './pages/DocumentsPage'
import DispatchPage from './pages/DispatchPage'
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'
import InvoicesPage from './pages/InvoicesPage'
import AdminUsersPage from './pages/AdminUsersPage'

export default function App(){
  return (
    <div className="container">
      <nav className="mb-4">
        <Link to="/">Tracking</Link> | <Link to="/carbon">Carbon</Link> | <Link to="/booking">Booking</Link> | <Link to="/dashboard">Dashboard</Link> | <Link to="/documents">Documents</Link> | <Link to="/dispatch">Dispatch</Link> | <Link to="/login">Login</Link> | <Link to="/admin">Admin</Link> | <Link to="/admin/users">Users</Link> | <Link to="/invoices">Invoices</Link>
      </nav>
      <Routes>
        <Route path="/" element={<TrackingPage/>} />
        <Route path="/carbon" element={<CarbonPage/>} />
        <Route path="/booking" element={<BookingPage/>} />
        <Route path="/dashboard" element={<DashboardPage/>} />
        <Route path="/documents" element={<DocumentsPage/>} />
        <Route path="/dispatch" element={<DispatchPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/admin" element={<AdminPage/>} />
        <Route path="/admin/users" element={<AdminUsersPage/>} />
        <Route path="/invoices" element={<InvoicesPage/>} />
      </Routes>
    </div>
  )
}
