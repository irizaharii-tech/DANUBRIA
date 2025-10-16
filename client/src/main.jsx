import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import axios from 'axios'
const token = localStorage.getItem('accessToken')
if(token) axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
createRoot(document.getElementById('root')).render(<BrowserRouter><App/></BrowserRouter>)
