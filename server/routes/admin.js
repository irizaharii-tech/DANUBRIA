const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const auth = require('../middleware/auth')
const logPath = path.join(__dirname, '..', 'email_log.txt')

router.get('/email-log', auth('admin'), (req,res)=>{ const txt = fs.existsSync(logPath) ? fs.readFileSync(logPath,'utf8') : ''; res.json({ log: txt }) })

module.exports = router
