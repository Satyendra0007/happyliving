import './App.css'
import Register from './Pages/Register'
import Navbar from './Components/Navbar'
import Login from './Pages/Login'
import Home from './Pages/Home'
import Footer from './Components/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignOut from './Pages/SignOut'
import Dashboard from './Pages/Dashboard'
import Admin from './admin/Admin'
import Users from './admin/Users'
import Messages from './admin/Messages'
import Rooms from './admin/Rooms'



function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/admin' element={<Admin />} >
          <Route path='users' element={<Users />} />
          <Route path='messages' element={<Messages />} />
          <Route path='room' element={<Rooms />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;