import React, {useEffect, useState} from 'react'
import axios from 'axios'

export default function DispatchPage(){
  const [suggestions, setSuggestions] = useState([])

  const [bookings, setBookings] = useState([])
  const [vehicles, setVehicles] = useState([])

  const fetchData = async ()=> {
    const b = await axios.get('/api/bookings')
    setBookings(b.data)
    const v = await axios.get('/api/vehicles')
    setVehicles(v.data)
  }

  useEffect(()=>{ fetchData() },[])

  async function assign(id, vehicleId){
    await axios.post(`/api/bookings/${id}/assign`, { vehicleId })
    fetchData()
  }

  async function suggest(){
    const v = await axios.get('/api/vehicles')
    const r = await axios.post('/api/bookings/optimize', { vehicles: v.data })
    setSuggestions(r.data.suggestions)
  }

  return (
    <div>
      <h1>Dispatch Board</h1>
      <h2>Bookings</h2>
      <div style={{marginBottom:12}}><button onClick={suggest}>Suggest Assignments</button></div>
      {suggestions.length>0 && (<div style={{marginBottom:12}}><h3>Suggestions</h3><ul>{suggestions.map(s=> (<li key={s.bookingId}>{s.bookingId} → {s.suggestedVehicle || 'none'} (dist: {s.distance.toFixed(4)})</li>))}</ul><div style={{marginTop:8}}><button onClick={async ()=>{ const v = await axios.get('/api/vehicles'); const r = await axios.post('/api/bookings/auto-assign', { vehicles: v.data }); alert('Auto-assigned ' + r.data.assigned.length + ' bookings'); fetchData() }}>Auto-assign suggested</button></div></div>)}
      <ul>
        {bookings.map(b=> (
          <li key={b.id}>
            {b.id} - {b.pickup} → {b.delivery} - status: {b.status} - assigned: {b.assignedVehicle || 'none'}
            <div>
              Assign:
              <select onChange={(e)=> assign(b.id, e.target.value)} defaultValue="">
                <option value="">--choose vehicle--</option>
                {vehicles.map(v=> (<option key={v.id} value={v.id}>{v.reg}</option>))}
              </select>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
