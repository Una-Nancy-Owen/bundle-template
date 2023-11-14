import React from 'react'
import ReactDOM from 'react-dom/client'
import { DashboardGlobalStyle } from '../../../global_style.ts'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DashboardGlobalStyle />
    <App />
  </React.StrictMode>
)
