const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

// Example: simple login route for admin
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // For demo: use a single admin credential (from .env or default)
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "traffic.acbutescu@gmail.com";
  const ADMIN_PASS = process.env.ADMIN_PASS || "Porumbeiimei112";

  if (email !== ADMIN_EMAIL) {
    return res.status(401).json({ message: "Invalid email" });
  }

  const bcrypt = require('bcrypt');
  const valid = await bcrypt.compare(password, await bcrypt.hash(ADMIN_PASS, 10));

  if (!valid) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET || "danubria_secret", {
    expiresIn: "12h"
  });

  return res.json({ token });
});

module.exports = router;
