import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/LoginPage'
import Dashboard from './pages/DashboardPage'
export default function App(){ return (<div style={{maxWidth:1100, margin:'24px auto', padding:16}}><nav style={{marginBottom:12}}><Link to='/'>Home</Link> | <Link to='/dashboard'>Dashboard</Link> | <Link to='/login'>Login</Link></nav><Routes><Route path='/' element={<Landing/>}/><Route path='/login' element={<Login/>}/><Route path='/dashboard' element={<Dashboard/>}/></Routes></div>) }
