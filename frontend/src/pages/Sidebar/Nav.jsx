import Sidebar from '@/Layout/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'


const Nav = () => {
  return (
    <div>
        <div className="flex h-screen overflow-hidden bg-[#121212]">
      <Sidebar />
      <main className="flex-1 overflow-auto p-1">
       <Outlet/>
      </main>
    </div>
    </div>
  )
}

export default Nav
