import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login'
import Register from './pages/Register'
import './index.css' 

const router = createBrowserRouter([
  {
    path:"/",
    element: <Login />,
  },
  {
    path:"/Register",
    element: <Register/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
