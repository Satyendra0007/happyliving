import React from 'react'
import { FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold">HappyLiving</h2>
            <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} All rights reserved.</p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition">Contact</a>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </footer>
      <div className='py-4 flex justify-center items-center gap-2 font-bold bg-blue-50 text-sm ' >
        Created With<FaHeart className='text-red-700' />By MCA (Code Crew)
      </div>
    </>
  )
}
