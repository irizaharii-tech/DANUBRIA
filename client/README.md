# HGV Client Portal — Secure Final (Competition)

This package is a competition-ready secure version of the HGV Client Portal.

## Security features
- Passwords are hashed using bcrypt during registration and admin user creation.
- JWT access tokens and refresh tokens implemented (refresh persisted in server/data/refresh_tokens.json).
- Token refresh endpoint: POST /api/auth/refresh
- Notification emails are sent to the address in environment variable NOTIFY_EMAIL, default: traffic.acbutescu@gmail.com.
  - Configure SMTP_HOST/SMTP_USER/SMTP_PASS in server/.env to enable real email sending via nodemailer.
  - If SMTP variables are not set, notifications are appended to server/email_log.txt.

## Run locally
1. Server: `cd server && npm install && npm start`
2. Client: `cd client && npm install && npm start`

Default files:
- server/.env.example — copy to .env and fill secrets for production
- server/data/users.json — initial admin user (password may be hashed or a placeholder). If the admin password is a placeholder, use admin registration via admin-users create endpoint after startup.

