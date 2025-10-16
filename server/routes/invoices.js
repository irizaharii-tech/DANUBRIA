const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const auth = require('../middleware/auth')
const invoicesPath = path.join(__dirname, '..', 'data', 'invoices.json')
if(!fs.existsSync(invoicesPath)) fs.writeFileSync(invoicesPath, JSON.stringify([], null,2))
function read(){ try{ return JSON.parse(fs.readFileSync(invoicesPath,'utf8')) }catch(e){ return [] } }
function write(v){ fs.writeFileSync(invoicesPath, JSON.stringify(v,null,2)) }

router.get('/', auth(), (req,res)=>{
  const all = read()
  if(req.user.role === 'client') return res.json(all.filter(i=>i.clientId === req.user.username))
  res.json(all)
})

router.post('/', auth('dispatcher'), (req,res)=>{
  const { clientId, items, vatPercent, reference, date } = req.body
  if(!clientId || !items || !Array.isArray(items) || items.length===0) return res.status(400).json({ message:'clientId and items required' })
  const all = read()
  const id = 'inv' + (all.length + 1)
  const subtotal = items.reduce((s,it)=> s + (it.qty * it.unitPrice), 0)
  const vat = Math.round(subtotal * (vatPercent || 20) / 100 * 100) / 100
  const total = Math.round((subtotal + vat) * 100) / 100
  const invoice = { id, clientId, items, vatPercent: vatPercent || 20, subtotal, vat, total, reference: reference||'', date: date || new Date().toISOString().slice(0,10), status: 'draft', createdAt: new Date().toISOString() }
  all.push(invoice); write(all)
  fs.appendFileSync(path.join(__dirname, '..', 'email_log.txt'), new Date().toISOString() + ' - Invoice created ' + id + ' for client ' + clientId + '\n')
  res.json({ success:true, invoice })
})

router.post('/:id/mark', auth('dispatcher'), (req,res)=>{
  const { status } = req.body
  const all = read(); const inv = all.find(i=>i.id===req.params.id)
  if(!inv) return res.status(404).json({ message:'Not found' })
  inv.status = status || inv.status; write(all); res.json({ success:true, invoice:inv })
})

module.exports = router
