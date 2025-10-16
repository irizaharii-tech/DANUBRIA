const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const usersPath = path.join(__dirname, '..', 'data', 'users.json')
const refreshPath = path.join(__dirname, '..', 'data', 'refresh_tokens.json')
if(!fs.existsSync(usersPath)) fs.writeFileSync(usersPath, JSON.stringify([ { id:'u1', username:'admin', password:'admin', role:'admin', name:'Administrator' } ], null,2))
if(!fs.existsSync(refreshPath)) fs.writeFileSync(refreshPath, JSON.stringify([], null,2))

function readUsers(){ try{ return JSON.parse(fs.readFileSync(usersPath,'utf8')) }catch(e){ return [] } }
function writeUsers(u){ fs.writeFileSync(usersPath, JSON.stringify(u,null,2)) }
function readRefresh(){ try{ return JSON.parse(fs.readFileSync(refreshPath,'utf8')) }catch(e){ return [] } }
function writeRefresh(r){ fs.writeFileSync(refreshPath, JSON.stringify(r,null,2)) }

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'dev-access'
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'dev-refresh'
const ACCESS_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES || '15m'
const REFRESH_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES || '7d'

// helper to send notification (nodemailer if configured, else write to file)
function notify(subject, text){
  const nodemailer = require('nodemailer')
  const logPath = path.join(__dirname, '..', 'email_log.txt')
  const to = process.env.NOTIFY_EMAIL || 'traffic.acbutescu@gmail.com'
  if(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS){
    const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT)||587, secure: false, auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } })
    transporter.sendMail({ from: process.env.SMTP_USER, to, subject, text }).catch(err => fs.appendFileSync(logPath, new Date().toISOString() + ' - Mail error: ' + err.message + '\n') )
  } else {
    fs.appendFileSync(logPath, new Date().toISOString() + ' - ' + subject + ' - ' + text + '\n')
  }
}

// register (admin can create users via admin-users route; this is optional)
router.post('/register', async (req,res)=>{
  const { username, password, role, name } = req.body
  if(!username || !password) return res.status(400).json({ message:'username and password required' })
  const users = readUsers()
  if(users.find(u=>u.username===username)) return res.status(400).json({ message:'username exists' })
  const hash = await bcrypt.hash(password, 10)
  const id = 'u' + (users.length + 1)
  users.push({ id, username, password: hash, role: role||'client', name: name||'' })
  writeUsers(users)
  notify('New user registered', 'User ' + username + ' registered with role ' + (role||'client'))
  res.json({ success:true })
})

// login -> returns access + refresh tokens
router.post('/login', async (req,res)=>{
  const { username, password } = req.body
  const users = readUsers()
  const user = users.find(u=>u.username===username)
  if(!user) return res.status(401).json({ message:'Invalid credentials' })
  const ok = await bcrypt.compare(password, user.password)
  if(!ok) return res.status(401).json({ message:'Invalid credentials' })
  const payload = { id: user.id, username: user.username, role: user.role, name: user.name }
  const access = jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES })
  const refresh = jwt.sign({ id: user.id }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES })
  const refreshList = readRefresh(); refreshList.push({ token: refresh, userId: user.id, createdAt: new Date().toISOString() }); writeRefresh(refreshList)
  res.json({ accessToken: access, refreshToken: refresh, user: payload })
})

// refresh endpoint
router.post('/refresh', (req,res)=>{
  const { token } = req.body
  if(!token) return res.status(400).json({ message:'No token' })
  const refreshList = readRefresh()
  if(!refreshList.find(r=>r.token===token)) return res.status(401).json({ message:'Invalid refresh token' })
  try{
    const data = jwt.verify(token, REFRESH_SECRET)
    const users = readUsers()
    const u = users.find(x=>x.id===data.id)
    if(!u) return res.status(401).json({ message:'Invalid token user' })
    const payload = { id: u.id, username: u.username, role: u.role, name: u.name }
    const access = jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES })
    res.json({ accessToken: access })
  }catch(err){
    return res.status(401).json({ message:'Invalid or expired token' })
  }
})

// logout (revoke refresh token)
router.post('/logout', (req,res)=>{
  const { token } = req.body
  if(!token) return res.json({ success:true })
  let list = readRefresh(); list = list.filter(r=>r.token !== token); writeRefresh(list)
  res.json({ success:true })
})

module.exports = router
