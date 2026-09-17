import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import CreatePage from './pages/CreatePage'
import EditPage from './pages/EditPage'

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  return (
    <>
      <nav className='navi'>
        <div className='conatiner'>
          <Link to='/' className='logo'><h2 >CRUD Operation</h2></Link>
        </div>
      </nav>

     <Routes>
      <Route index element={<Home/>}></Route>
      <Route path="/create" element={<CreatePage/>}></Route>
      <Route path="/edit/:id" element={<EditPage/>}></Route>
     </Routes>
    </>
  )
}

export default App
