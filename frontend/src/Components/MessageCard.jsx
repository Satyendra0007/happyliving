import React from 'react'
import { MdDelete } from "react-icons/md";

export default function UserCard({ _id, name, email, phone, message, handleDelete }) {
  return (
    <div>
      <div className="w-64 h-52  flex flex-col bg-white border border-gray-300 border-t-4 border-t-blue-600 shadow-sm rounded-xl justify-between">
        <div className="p-4 md:p-5">
          <h3 className="text-lg font-bold text-gray-800 capitalize">
            {name}
          </h3>
          <p className="mt-2 text-xs font-bold text-gray-500">
            {email}
          </p>
          <p className="mt-2 text-xs font-bold text-gray-500">
            {phone}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            {message}
          </p>

        </div>
        <div className="button p-2">
          <button onClick={() => handleDelete(_id)} className='float-right bottom-0 bg-blue-600 p-1.5 text-white rounded-full text-lg md:hover:scale-105 transition-all duration-200 ease-linear'><MdDelete /></button>
        </div>
      </div>
    </div>
  )
}
