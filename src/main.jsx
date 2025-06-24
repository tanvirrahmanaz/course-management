// src/main.jsx (সঠিক ভার্সন)
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Router'
import AuthProvider from './context/AuthProvider' // AuthProvider ইম্পোর্ট করুন
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
      <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    
    
  </React.StrictMode>,
)