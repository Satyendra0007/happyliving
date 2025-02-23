import React, { useState, useEffect } from 'react'
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { initFlowbite } from 'flowbite';
import { Bed, DollarSign } from "lucide-react";

export default function RoomCard({ bedType, thumbnail, _id, price, seatAvailable, handleEdit, handleDelete, uploading }) {

  const [show, setShow] = useState(false)
  const [room, setRoom] = useState({
    bedType: "",
    price: "",
    seatAvailable: ""
  })

  function handleChange(e) {
    setRoom({ ...room, [e.target.name]: e.target.value })
  }

  const handleOnClick = () => {
    setRoom({
      bedType: bedType,
      price: price,
      seatAvailable: seatAvailable

    })
    setShow(true)
  }

  const handleEditRoom = (id, data) => {
    handleEdit(id, data);
    if (!uploading)
      setShow(false)
  }

  useEffect(() => {
    initFlowbite();
  }, [])

  return (
    <>
      <div>
        <div className="w-64 flex flex-col bg-white border border-gray-300 border-t-4 border-t-blue-600 shadow-sm rounded-xl ">
          <div className="p-4 w-64 md:p-5">
            <div className="max-w-sm  overflow-hidden ">
              <img src={thumbnail} alt="Room" className="w-full h-48 object-cover" />

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 capitalize">{bedType} Bed</h3>

                <div className=" mt-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign size={18} />
                    <span className="font-medium text-gray-700">₹ {price}/Year</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Bed size={18} />
                    <span className="font-medium">{seatAvailable} Seats Left</span>
                  </div>
                </div>
              </div>
            </div>

            <button onClick={() => handleDelete(_id)} className='float-right bg-blue-600 p-1.5 text-white rounded-full text-lg md:hover:scale-105 transition-all duration-200 ease-linear mt-1'><MdDelete /></button>

            <button onClick={handleOnClick} className='float-right bg-blue-600 p-1.5 text-white rounded-full text-lg md:hover:scale-105 transition-all duration-200 ease-linear mt-1 mr-2' type='button'><CiEdit /></button>

          </div>

          {show && <><div tabIndex="-1" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-white/60">
            <div className="relative p-4 w-full max-w-md max-h-full">
              {/* <!-- Modal content --> */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* <!-- Modal header --> */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Edit Service
                  </h3>
                  <button onClick={() => setShow(false)} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* <!-- Modal body --> */}
                <div className="p-3 space-y-4">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Room Type</label>
                    <input type="text" onChange={handleChange} value={room.bedType} name="bedType" id="name" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-96 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="single,double,tripple" required />
                  </div>

                  <div>
                    <label htmlFor="url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                    <input type="text" onChange={handleChange} value={room.price} name="price" id="url" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-96 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter Google Form Link" required />
                  </div>

                  <div>
                    <label htmlFor="url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seat Available</label>
                    <input type="text" onChange={handleChange} value={room.seatAvailable} name="seatAvailable" id="url" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-96 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter Google Form Link" required />
                  </div>

                  <button onClick={() => handleEditRoom(_id, room)} disabled={uploading} className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-32 h-10 flex justify-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-gray-400" type="button" >
                    {uploading ? <>
                      <div className='flex space-x-2 justify-center items-center '>
                        <span className='sr-only'>Loading...</span>
                        <div className='h-2.5 w-2.5 bg-blue-700 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                        <div className='h-2.5 w-2.5 bg-blue-700 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                        <div className='h-2.5 w-2.5 bg-blue-700 rounded-full animate-bounce'></div>
                      </div>
                    </>
                      : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          </>}
        </div>
      </div>
    </>
  )
}
