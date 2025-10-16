const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth')

const usersPath = path.join(__dirname, '..', 'data', 'users.json')
function readUsers(){ try{ return JSON.parse(fs.readFileSync(usersPath,'utf8')) }catch(e){ return [] } }
function writeUsers(u){ fs.writeFileSync(usersPath, JSON.stringify(u,null,2)) }

router.get('/list', auth('admin'), (req,res)=>{ const users = readUsers().map(u=>({ id:u.id, username:u.username, role:u.role, name:u.name })); res.json(users) })

router.post('/create', auth('admin'), async (req,res)=>{
  const { username, password, role, name } = req.body
  if(!username || !password) return res.status(400).json({ message:'username and password required' })
  const users = readUsers()
  if(users.find(u=>u.username===username)) return res.status(400).json({ message:'username exists' })
  const hash = await bcrypt.hash(password, 10)
  const id = 'u' + (users.length + 1)
  users.push({ id, username, password: hash, role: role||'client', name: name||'' })
  writeUsers(users)
  res.json({ success:true, user:{ id, username, role, name } })
})

router.delete('/delete/:id', auth('admin'), (req,res)=>{
  const id = req.params.id
  let users = readUsers(); users = users.filter(u=>u.id !== id); writeUsers(users); res.json({ success:true })
})

module.exports = router
