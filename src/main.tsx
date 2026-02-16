import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/main.css'
import App from './App.tsx'

// Using Leaflet Lib
import "leaflet/dist/leaflet.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
