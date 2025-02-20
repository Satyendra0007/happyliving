import React from 'react'
import AdminMenu from './AdminMenu'
import { Outlet } from 'react-router-dom'

export default function Admin() {
  return (
    <div className=' admin-container mx-auto flex w-full  relative '>
      <div className="left " style={{ width: "20vw" }}>
        <AdminMenu />
      </div>
      <div className="right" style={{ width: "80vw" }}>
        <Outlet />
      </div>
    </div>
  )
}
