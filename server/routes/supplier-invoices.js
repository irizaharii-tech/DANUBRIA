const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const auth = require('../middleware/auth')
const dataPath = path.join(__dirname, '..', 'data', 'supplier_invoices.json')
if(!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, JSON.stringify([], null,2))
function read(){ return JSON.parse(fs.readFileSync(dataPath,'utf8')) }
function write(v){ fs.writeFileSync(dataPath, JSON.stringify(v,null,2)) }

router.post('/', auth('subcontractor'), (req,res)=>{
  const { bookingId, amount, reference } = req.body
  if(!bookingId || !amount) return res.status(400).json({ message:'bookingId and amount required' })
  const all = read(); const id = 'sup' + (all.length + 1)
  const inv = { id, bookingId, supplierId: req.user.id, amount, reference: reference||'', status:'submitted', createdAt:new Date().toISOString() }
  all.push(inv); write(all); fs.appendFileSync(path.join(__dirname, '..', 'email_log.txt'), new Date().toISOString() + ' - Supplier invoice ' + id + ' submitted\n'); res.json({ success:true, invoice:inv })
})

router.get('/', auth(), (req,res)=>{
  const all = read()
  if(req.user.role === 'subcontractor') return res.json(all.filter(i=>i.supplierId === req.user.id))
  res.json(all)
})

router.post('/:id/approve', auth('dispatcher'), (req,res)=>{
  const id = req.params.id; const all = read(); const inv = all.find(i=>i.id===id)
  if(!inv) return res.status(404).json({ message:'Not found' })
  inv.status = 'approved'; write(all); fs.appendFileSync(path.join(__dirname, '..', 'email_log.txt'), new Date().toISOString() + ' - Supplier invoice ' + id + ' approved\n'); res.json({ success:true, invoice:inv })
})

module.exports = router
