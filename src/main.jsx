// React main file:
import React from 'react'
import ReactDOM from 'react-dom/client'

// Tailwind CSS:
import './index.css'

// páginas:
import App from './App/App'
import Home from './App/pages/home'
import Login from './App/pages/login'
import Register from './App/pages/register'
import Inventory from './App/pages/inventory'
import AccessManager from './App/pages/accessmanager'

// Router:
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

// Usefull functions:
import { checktoken } from './api/userAuth'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div className='h-screen w-screen flex justify-center items-center'><h1 className='font-bold shadow-2xl'>Error 404! ¯\_(ツ)_/¯</h1></div>,
    children: [
      {
        path: '/inventory/:id',
        element: (checktoken() ? <Inventory /> : <Navigate to='/login' />),
      },
      {
        path: '/accessmanager/:id',
        element: <AccessManager />,
      },
      {
        path: '/Home',
        element: <Home />,
      },
      {
        path: '/',
        element: <Home />,
      }
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  }
]);

// Render:
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>,
)
