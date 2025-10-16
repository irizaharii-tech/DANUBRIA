import React, {useEffect, useState} from 'react'
import axios from 'axios'

export default function AdminPage(){
  const [log, setLog] = useState('')
  useEffect(()=>{ fetchLog() },[])
  async function fetchLog(){
    try{
      const r = await axios.get('/api/admin/email-log')
      setLog(r.data.log || '')
    }catch(err){ setLog('Error fetching log') }
  }
  function download(){
    const blob = new Blob([log], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'email_log.txt'; a.click(); URL.revokeObjectURL(url)
  }
  return (
    <div>
      <h1>Admin — Email Log</h1>
      <div style={{marginBottom:12}}>
        <button onClick={fetchLog}>Refresh</button>
        <button style={{marginLeft:8}} onClick={download}>Download Log</button>
      </div>
      <pre style={{background:'#f3f4f6', padding:12, borderRadius:6, maxHeight:400, overflow:'auto'}}>{log}</pre>
    </div>
  )
}
