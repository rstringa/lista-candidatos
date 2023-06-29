import React from 'react'
import ReactDOM from 'react-dom/client'
import { PrincipalProvider } from './PrincipalProvider';
import App from './App.jsx'
import './index.css'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PrincipalProvider>
      <App />
    </PrincipalProvider>
  </React.StrictMode>,
)
