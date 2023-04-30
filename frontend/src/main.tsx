
import ReactDOM from 'react-dom/client'
import { Router } from './Router'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { StrictMode } from 'react'
window.baseUrlAPI='http://localhost:3000'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
     <StrictMode>
          <RouterProvider router={Router} />
     </StrictMode>

)
