import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './routes/route.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'
import BalanceProvider from './contexts/BalanceContext.jsx'  

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BalanceProvider>        
        <RouterProvider router={router}></RouterProvider>
      </BalanceProvider>
    </AuthProvider>
  </StrictMode>,
)

