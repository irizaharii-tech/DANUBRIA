import React, {useState} from 'react'
import axios from 'axios'
export default function Login(){
  const [user,setUser]=useState('admin'), [pass,setPass]=useState('admin')
  async function submit(e){ e.preventDefault(); const r=await axios.post('/api/auth/login',{ username:user, password:pass }); localStorage.setItem('accessToken', r.data.accessToken); localStorage.setItem('refreshToken', r.data.refreshToken); axios.defaults.headers.common['Authorization']='Bearer '+r.data.accessToken; alert('Logged in'); window.location.href='/' }
  return (<div><h1>Login</h1><form onSubmit={submit}><div><input value={user} onChange={e=>setUser(e.target.value)} /></div><div><input type="password" value={pass} onChange={e=>setPass(e.target.value)} /></div><button>Login</button></form><p>Use admin/admin (if initial hash created) or register via admin user creation.</p></div>)
