import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function BookingPage(){
  const [slots, setSlots] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(()=>{ axios.get('/api/bookings/slots').then(r=>setSlots(r.data)) },[])

  async function book(){
    if(!selected) return alert('Choose a slot')
    const res = await axios.post('/api/book-slot',{clientId:'CLIENT1', slot:selected})
    alert(res.data.message || 'Booked')
  }

  return (
    <div>
      <h1>Book a delivery slot</h1>
      <ul>
        {slots.map(s=> (
          <li key={s.id}><label><input type="radio" name="slot" value={s.id} onChange={()=>setSelected(s.id)} /> {s.label} ({s.available})</label></li>
        ))}
      </ul>
      <button onClick={book}>Book</button>
    </div>
  )
}
