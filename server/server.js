require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

// Import routes
const authRoute = require('./routes/auth');
const bookingsRoute = require('./routes/bookings');
const invoicesRoute = require('./routes/invoices');
const supplierRoute = require('./routes/supplier-invoices');
const adminUsersRoute = require('./routes/admin-users');
const docsRoute = require('./routes/documents');
const adminRoute = require('./routes/admin');

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api/auth', authRoute);
app.use('/api/bookings', bookingsRoute);
app.use('/api/invoices', invoicesRoute);
app.use('/api/supplier-invoices', supplierRoute);
app.use('/api/admin-users', adminUsersRoute);
app.use('/api/docs', docsRoute);
app.use('/api/admin', adminRoute);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Socket.io setup
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

// Example live tracking data
let vehicles = [
  { id: 'veh1', reg: 'AB12CDE', lat: 52.5, lng: -1.9, status: 'idle' },
  { id: 'veh2', reg: 'CD34EFG', lat: 53.0, lng: -2.1, status: 'moving' }
];

io.on('connection', socket => {
  console.log('🟢 Client connected');
  socket.emit('vehicles', vehicles);
  socket.on('disconnect', () => console.log('🔴 Client disconnected'));
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
