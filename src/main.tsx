import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "react-phone-input-2/lib/style.css";

// ✅ Register PWA service worker
// import { registerSW } from 'virtual:pwa-register'

// registerSW({
//   immediate: true
// })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
