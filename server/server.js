require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const http = require('http')
const { Server } = require('socket.io')
const path = require('path')
const fs = require('fs')

const authRoute = require('./routes/auth')
const bookingsRoute = require('./routes/bookings')
const invoicesRoute = require('./routes/invoices')
const supplierRoute = require('./routes/supplier-invoices')
const adminUsersRoute = require('./routes/admin-users')
const docsRoute = require('./routes/documents')
const adminRoute = require('./routes/admin')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api/auth', authRoute)
app.use('/api/bookings', bookingsRoute)
app.use('/api/invoices', invoicesRoute)
app.use('/api/supplier-invoices', supplierRoute)
app.use('/api/admin-users', adminUsersRoute)
app.use('/api/docs', docsRoute)
app.use('/api/admin', adminRoute)

const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*' } })

// simple socket for vehicle simulation (not GPS; used for demo)
let vehicles = [
  { id: 'veh1', reg: 'AB12CDE', lat:52.5, lng:-1.9, status:'idle' },
  { id: 'veh2', reg: 'XY98ZZZ', lat:53.4, lng:-2.2, status:'idle' }
]

io.on('connection', socket => {
  socket.emit('vehicles', vehicles)
})

setInterval(()=>{
  vehicles = vehicles.map(v=> ({ ...v, lat: v.lat + (Math.random()-0.5)*0.01, lng: v.lng + (Math.random()-0.5)*0.01 }))
  io.emit('vehicles', vehicles)
}, 4000)

const PORT = process.env.PORT || 5000
server.listen(PORT, ()=> console.log('Server running on', PORT))
