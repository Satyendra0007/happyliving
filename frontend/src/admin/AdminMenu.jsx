import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { SiGooglemessages } from "react-icons/si";
import { MdMeetingRoom } from "react-icons/md";
import { TbReceiptRupee } from "react-icons/tb";

export default function AdminMenu() {
  return (
    <>
      <nav className=' w-full h-[80vh] flex flex-col '>
        <NavLink
          className=" p-3 text-center font-bold text-gray-700 flex justify-center items-center gap-3 md:justify-start md:px-6"
          to="users"
          style={({ isActive }) => isActive ? { backgroundColor: "blue", color: "white" } : {}}
        >
          <FaUser />
          <span className='hidden md:block'>Users</span>
        </NavLink>
        <NavLink
          className=" p-3 text-center font-bold text-gray-700 flex justify-center items-center gap-3 md:justify-start md:px-6 "
          to="messages"
          style={({ isActive }) => isActive ? { backgroundColor: "blue", color: "white" } : {}}
        >
          <SiGooglemessages />
          <span className='hidden md:block'>Messages</span>
        </NavLink>
        <NavLink
          className=" p-3 text-center font-bold text-gray-700 flex justify-center items-center gap-3 md:justify-start md:px-6"
          to="room"
          style={({ isActive }) => isActive ? { backgroundColor: "blue", color: "white" } : {}}
        >
          <MdMeetingRoom />
          <span className='hidden md:block'>Rooms</span>
        </NavLink>
        <NavLink
          className=" p-3 text-center font-bold text-gray-700 flex justify-center items-center gap-3 md:justify-start md:px-6"
          to="reciepts"
          style={({ isActive }) => isActive ? { backgroundColor: "blue", color: "white" } : {}}
        >
          <TbReceiptRupee />
          <span className='hidden md:block'>Recipts</span>
        </NavLink>

      </nav >

    </>
  )
}
