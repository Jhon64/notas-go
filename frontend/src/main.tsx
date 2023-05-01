
import ReactDOM from 'react-dom/client'
import { Router } from './Router'
import './index.css'
import { StrictMode } from 'react'
import { functions } from './functions/addOnLogout'
window.baseUrlAPI = 'http://localhost:3000'
import "@fortawesome/fontawesome-free/css/all.css"
if (localStorage.theme === 'dark') {
     document.documentElement.classList.add('dark')
} else {
     document.documentElement.classList.remove('dark')
}

functions.addOnLogout()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).
     render(
          <StrictMode>
               <Router />
          </StrictMode>

     )
