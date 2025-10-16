import React, {useEffect, useState} from 'react'
import axios from 'axios'

function NewItemRow({item, onChange, onRemove}){
  return (
    <div style={{display:'flex', gap:8, marginBottom:6}}>
      <input placeholder='Description' value={item.description} onChange={e=>onChange({...item, description: e.target.value})} />
      <input style={{width:80}} type='number' placeholder='Qty' value={item.qty} onChange={e=>onChange({...item, qty: Number(e.target.value)})} />
      <input style={{width:120}} type='number' placeholder='Unit price' value={item.unitPrice} onChange={e=>onChange({...item, unitPrice: Number(e.target.value)})} />
      <button onClick={onRemove}>Remove</button>
    </div>
  )
}

export default function InvoicesPage(){
  const [invoices, setInvoices] = useState([])
  const [items, setItems] = useState([{ description:'Delivery fee', qty:1, unitPrice:100 }])
  const [clientId, setClientId] = useState('client')
  const [vat, setVat] = useState(20)
  const [selected, setSelected] = useState(null)

  async function fetchInvoices(){ const r = await axios.get('/api/invoices'); setInvoices(r.data) }
  useEffect(()=>{ fetchInvoices() },[])

  function updateItem(i, val){ const copy = [...items]; copy[i]=val; setItems(copy) }
  function removeItem(i){ const copy=[...items]; copy.splice(i,1); setItems(copy) }
  function addItem(){ setItems([...items, { description:'', qty:1, unitPrice:0 }]) }

  async function createInv(e){
    e.preventDefault()
    const r = await axios.post('/api/invoices', { clientId, items, vatPercent: vat })
    alert('Invoice created: ' + r.data.invoice.id)
    fetchInvoices()
  }

  return (
    <div>
      <h1>Invoices</h1>
      <div style={{display:'flex', gap:24}}>
        <div style={{flex:1}}>
          <h3>Create Invoice</h3>
          <form onSubmit={createInv}>
            <div><label>Client ID: <input value={clientId} onChange={e=>setClientId(e.target.value)} /></label></div>
            <div><label>VAT %: <input type='number' value={vat} onChange={e=>setVat(Number(e.target.value))} /></label></div>
            <div style={{marginTop:8}}>
              <h4>Items</h4>
              {items.map((it,i)=> <NewItemRow key={i} item={it} onChange={val=>updateItem(i,val)} onRemove={()=>removeItem(i)} />)}
              <div><button type='button' onClick={addItem}>Add item</button></div>
            </div>
            <div style={{marginTop:8}}><button>Create Invoice</button></div>
          </form>
        </div>
        <div style={{flex:1}}>
          <h3>Existing Invoices</h3>
          <ul>
            {invoices.map(inv=> (<li key={inv.id}><a href='#' onClick={()=>setSelected(inv)}>{inv.id} - {inv.clientId} - {inv.total} - {inv.status}</a></li>))}
          </ul>
        </div>
      </div>
      {selected && (<div style={{marginTop:16, background:'#fff', padding:12, borderRadius:6}}>
        <h3>Invoice {selected.id}</h3>
        <div>Date: {selected.date} | Status: {selected.status}</div>
        <table style={{width:'100%', marginTop:8, borderCollapse:'collapse'}}>
          <thead><tr><th>Description</th><th>Qty</th><th>Unit</th><th>Line</th></tr></thead>
          <tbody>{selected.items.map((it,idx)=> (<tr key={idx}><td>{it.description}</td><td>{it.qty}</td><td>{it.unitPrice}</td><td>{(it.qty*it.unitPrice).toFixed(2)}</td></tr>))}</tbody>
        </table>
        <div style={{marginTop:8}}>Subtotal: {selected.subtotal} | VAT {selected.vatPercent}%: {selected.vat} | Total: {selected.total}</div>
        <div style={{marginTop:8}}>
          <button onClick={async ()=>{ await axios.post('/api/invoices/' + selected.id + '/mark', { status:'issued' }); fetchInvoices(); }}>Mark Issued</button>
          <button style={{marginLeft:8}} onClick={async ()=>{ await axios.post('/api/invoices/' + selected.id + '/mark', { status:'paid' }); fetchInvoices(); }}>Mark Paid</button>
        </div>
      </div>)}
    </div>
  )
}
