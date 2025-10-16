const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const uploadDir = path.join(__dirname, '..', 'uploads'); if(!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir)
const storage = multer.diskStorage({ destination:(r,f,cb)=>cb(null,uploadDir), filename:(r,f,cb)=>cb(null, Date.now()+'-'+f.originalname) })
const upload = multer({ storage })

router.get('/:clientId', (req,res)=>{
  const files = fs.readdirSync(uploadDir).map(f=>({ name:f, url:'/uploads/'+f })); res.json(files)
})

router.post('/:clientId/upload', upload.single('file'), (req,res)=>{ if(!req.file) return res.status(400).json({ message:'No file' }); res.json({ message:'Uploaded', file:{ name:req.file.filename, url:'/uploads/'+req.file.filename } }) })

module.exports = router
