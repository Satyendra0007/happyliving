import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ContextStore } from '../store/ContextStore'
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import { Smile } from "lucide-react";

export default function Navbar() {
  const { isLoggedIn, userData } = useContext(ContextStore)
  return (
    <header className=" flex justify-around items-center py-3 bg-white/50 backdrop-blur-sm  sticky top-2 rounded-full left-0 z-50 border border-gray-300  w-[95%] mx-auto px-2">
      <Link to={isLoggedIn ? "/dashboard" : "/"}>
        <div className="logo text-gray-700 font-semibold text-xl font-mono ">
          <div className="flex items-center space-x-2 text-gray-800">
            <Smile className="w-6 h-6 text-blue-500" />
            <h1 className="text-lg font-bold font-serif">
              <span className="text-blue-500">Happy</span><span className="text-green-500 font-mono">Living</span>
            </h1>
          </div>
        </div>
      </Link>
      <div className="buttons  flex items-center justify-center gap-2">

        {(isLoggedIn && userData.isAdmin) &&
          <Link to="/admin/users">
            <button className='outline-none p-2  bg-blue-600 text-white font-semibold rounded-full cursor-pointer shadow-lg flex justify-center text-sm md:text-base items-center gap-2'>
              <MdOutlineAdminPanelSettings className='text-2xl' />
            </button>
          </Link>
        }

        {isLoggedIn ?
          <div className=''>
            <Link to="/signout">
              <button className='outline-none  p-2 bg-blue-600 text-white font-semibold rounded-full cursor-pointer shadow-lg flex justify-center text-sm md:text-base items-center gap-2'>
                {/* <span>SignOut</span> */}
                <img className='w-6 h-6 rounded-full shadow-xl' src={userData.image} alt="" />
                <PiSignOutBold className='text-2xl' />
              </button>
            </Link>
          </div>
          :
          <Link to="/login">
            <button className='outline-none px-6 py-2 bg-blue-600 text-white font-semibold rounded-xl cursor-pointer shadow-lg text-sm md:text-base '>Login</button>
          </Link>
        }

      </div>
    </header>
  )
}
