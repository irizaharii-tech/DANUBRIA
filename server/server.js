// File: /server/server.js
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const http = require('http')
const { Server } = require('socket.io')
const path = require('path')

const safeRequire = (p) => { try { return require(p) } catch (e) { return null } }

// Route requires (will not crash if files are missing)
const authRoute = safeRequire('./routes/auth')
const bookingsRoute = safeRequire('./routes/bookings')
const invoicesRoute = safeRequire('./routes/invoices')
const supplierRoute = safeRequire('./routes/supplier-invoices')
const adminUsersRoute = safeRequire('./routes/admin-users')
const docsRoute = safeRequire('./routes/documents')
const adminRoute = safeRequire('./routes/admin')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Register routes only if present
if (authRoute) app.use('/api/auth', authRoute)
if (bookingsRoute) app.use('/api/bookings', bookingsRoute)
if (invoicesRoute) app.use('/api/invoices', invoicesRoute)
if (supplierRoute) app.use('/api/supplier-invoices', supplierRoute)
if (adminUsersRoute) app.use('/api/admin-users', adminUsersRoute)
if (docsRoute) app.use('/api/docs', docsRoute)
if (adminRoute) app.use('/api/admin', adminRoute)

// Debug: show what MONGO_URI looks like (masked)
const mask = s => {
  if (!s) return 'undefined'
  try {
    if (s.startsWith('mongodb')) {
      const withoutProto = s.replace(/^mongodb(\+srv)?:\/\//, '')
      const parts = withoutProto.split('@')
      if (parts.length === 2) {
        const userPart = parts[0]
        return 'mongodb+srv://' + (userPart.length > 6 ? userPart.slice(0,6) + '...' : userPart) + '@' + parts[1].slice(0,20) + '...'
      }
    }
  } catch (e) {}
  return 'masked'
}
console.log('MONGO_URI (masked):', mask(process.env.MONGO_URI))

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { dbName: 'danubriaDB' })
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err))

// Socket.io setup
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*' } })

let vehicles = [
  { id: 'veh1', reg: 'AB12CDE', lat: 52.5, lng: -1.9, status: 'idle' }
]

io.on('connection', socket => {
  console.log('🟢 Client connected')
  socket.emit('vehicles', vehicles)
  socket.on('disconnect', () => console.log('🔴 Client disconnected'))
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
