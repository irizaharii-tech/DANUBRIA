import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function DashboardPage(){
  const [data, setData] = useState([])
  useEffect(()=>{ axios.get('/api/performance/CLIENT1').then(r=>setData(r.data.monthly || [])) },[])
  return (
    <div>
      <h1>Performance Dashboard</h1>
      <div style={{height:300}}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}><XAxis dataKey="month" /><YAxis /><Tooltip /><Line dataKey="onTime" /></LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
