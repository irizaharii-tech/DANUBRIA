import React, {useState} from 'react'
import axios from 'axios'
export default function LoginPage(){ 
  const [user,setUser] = useState('admin')
  const [pass,setPass] = useState('admin')
  async function submit(e){
    e.preventDefault()
    try{
      const r = await axios.post('/api/auth/login', { username: user, password: pass })
      localStorage.setItem('token', r.data.token)
      localStorage.setItem('user', JSON.stringify(r.data.user))
      alert('Logged in as ' + r.data.user.username)
      window.location.href = '/'
    }catch(err){ alert('Login failed') }
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={submit}>
        <div><label>Username: <input value={user} onChange={e=>setUser(e.target.value)} /></label></div>
        <div><label>Password: <input type="password" value={pass} onChange={e=>setPass(e.target.value)} /></label></div>
        <button>Login</button>
      </form>
      <p>Try admin/admin or dispatcher/dispatch or client/client</p>
    </div>
  )
}
