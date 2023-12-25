import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/tailwind.css'
import axios from 'axios'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './config/queryClient.ts'

// set axios base url 
axios.defaults.baseURL = "https://whiteboard-seven-gold.vercel.app/api/v1";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
