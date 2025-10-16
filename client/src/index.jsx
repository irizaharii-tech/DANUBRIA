import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import axios from 'axios'

// set auth header if token available
const token = localStorage.getItem('token')
if(token){ axios.defaults.headers.common['Authorization'] = 'Bearer ' + token }

import './styles.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
