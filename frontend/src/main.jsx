import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
<<<<<<< HEAD
import UserContext from './context/UserContext.jsx'
=======
import UserContext from './context/userContext.jsx'
>>>>>>> 1e71031c1869f6dea2fd69732c629e3451a1d9e6
createRoot(document.getElementById('root')).render(
<BrowserRouter>
<UserContext>
    <App />
  </UserContext>
  </BrowserRouter>
 
)
