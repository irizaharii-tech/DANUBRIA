import React, {useEffect, useState} from 'react'
import axios from 'axios'

export default function DocumentsPage(){
  const [docs, setDocs] = useState([])
  const [file, setFile] = useState(null)

  const fetchDocs = async ()=> {
    const r = await axios.get('/api/docs/CLIENT1')
    setDocs(r.data)
  }

  useEffect(()=>{ fetchDocs() },[])

  async function upload(e){
    e.preventDefault()
    if(!file) return alert('Choose a file')
    const fd = new FormData()
    fd.append('file', file)
    const r = await axios.post('/api/docs/CLIENT1/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
    alert(r.data.message)
    setFile(null)
    fetchDocs()
  }

  return (
    <div>
      <h1>Documents</h1>
      <form onSubmit={upload}>
        <input type="file" onChange={e=>setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
      <ul>
        {docs.map(d=> (<li key={d._id}><a href={d.url} target="_blank" rel="noreferrer">{d.name}</a></li>))}
      </ul>
    </div>
  )
}
