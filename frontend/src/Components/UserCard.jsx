import React from 'react'
import { toast } from 'react-toastify';
import { Mail, Phone } from "lucide-react";

export default function UserCard({ _id, image, name, email, phone, handleDelete }) {
  return (
    <div>
      <div className="w-64 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 p-4 text-center">
        <img
          src={image}
          alt="User"
          className="w-24 h-24 mx-auto rounded-full border-4 border-blue-500"
        />
        <h3 className="text-lg font-semibold text-gray-800 mt-3 capitalize">{name}</h3>

        <div className="mt-3 text-gray-600 text-sm">
          <div className="flex items-center justify-center gap-2">
            <Mail size={16} /> <span>{email}</span>
          </div>
          <div className="flex items-center justify-center gap-2 mt-1">
            <Phone size={16} /> <span>{phone}</span>
          </div>
        </div>

        <button onClick={() => handleDelete(_id, email)} className=" mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
          Delete
        </button>
      </div>
    </div>
  )
}
