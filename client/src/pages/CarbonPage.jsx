import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function CarbonPage(){
  const [data, setData] = useState([])
  useEffect(()=>{ axios.get('/api/carbon/CLIENT1').then(r=>setData(r.data.monthly || [])) },[])
  return (
    <div>
      <h1>Carbon Report</h1>
      <div style={{height:300}}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}><XAxis dataKey="month" /><YAxis /><Tooltip /><Bar dataKey="co2" /></BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
