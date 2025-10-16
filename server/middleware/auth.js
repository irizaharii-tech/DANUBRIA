const jwt = require('jsonwebtoken')
const SECRET = process.env.JWT_ACCESS_SECRET || 'dev-access'
function auth(requiredRole){
  return function(req,res,next){
    const authh = req.headers.authorization
    if(!authh) return res.status(401).json({ message:'No token' })
    const parts = authh.split(' ')
    if(parts.length!==2) return res.status(401).json({ message:'Malformed' })
    const token = parts[1]
    try{
      const payload = jwt.verify(token, SECRET)
      req.user = payload
      if(requiredRole && payload.role !== requiredRole && payload.role !== 'admin') return res.status(403).json({ message:'Forbidden' })
      next()
    }catch(err){
      return res.status(401).json({ message:'Invalid or expired token' })
    }
  }
}
module.exports = auth
