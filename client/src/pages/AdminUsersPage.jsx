import React, {useEffect, useState} from 'react'
import axios from 'axios'

export default function AdminUsersPage(){
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('dispatcher')
  const [name, setName] = useState('')

  async function fetchUsers(){ const r = await axios.get('/api/admin-users/users'); setUsers(r.data) }
  useEffect(()=>{ fetchUsers() },[])

  async function createUser(e){
    e.preventDefault()
    await axios.post('/api/admin-users/users', { username, password, role, name })
    setUsername(''); setPassword(''); setName(''); fetchUsers()
  }
  async function del(id){ if(!confirm('Delete user?')) return; await axios.delete('/api/admin-users/users/' + id); fetchUsers() }

  return (
    <div>
      <h1>Admin — Users</h1>
      <div style={{display:'flex', gap:24}}>
        <div style={{flex:1}}>
          <h3>Create User</h3>
          <form onSubmit={createUser}>
            <div><input placeholder='Username' value={username} onChange={e=>setUsername(e.target.value)} /></div>
            <div><input placeholder='Password' value={password} onChange={e=>setPassword(e.target.value)} /></div>
            <div><input placeholder='Name' value={name} onChange={e=>setName(e.target.value)} /></div>
            <div><select value={role} onChange={e=>setRole(e.target.value)}><option value='dispatcher'>Dispatcher</option><option value='admin'>Admin</option><option value='client'>Client</option></select></div>
            <div style={{marginTop:8}}><button>Create</button></div>
          </form>
        </div>
        <div style={{flex:1}}>
          <h3>Existing Users</h3>
          <ul>{users.map(u=> (<li key={u.id}>{u.username} — {u.role} <button style={{marginLeft:8}} onClick={()=>del(u.id)}>Delete</button></li>))}</ul>
        </div>
      </div>
    </div>
  )
}
