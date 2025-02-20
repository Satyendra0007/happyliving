import React, { useEffect, useRef, useState } from 'react';
import user from "../images/user.webp"
import { useContext } from 'react'
import { ContextStore } from '../store/ContextStore'
import banner from "../images/banner.jpeg"
import { useNavigate } from 'react-router-dom';
import UserRomCard from '../Components/UserRomCard';
import { fetchData } from '../actions/serverActions';
import Spinner from '../Components/Spinner';


export default function Dashboard() {
  const { isLoggedIn, userData } = useContext(ContextStore)
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isLoggedIn)
      navigate("/")

    fetchAllRooms();
  }, [])

  const fetchAllRooms = async () => {
    setLoading(true)
    const serverResponse = await fetchData(`${import.meta.env.VITE_APP_SERVER_URI}api/room`, null)
    const response = await serverResponse.json()
    if (serverResponse.ok) {
      setRooms(response)
    }
    else {
      console.log(response.message)
      toast.error(response.message)
    }
    setLoading(false)
  }

  return (
    <div className='min-h-[83vh]'>
      <div className="info">
        <div className="banner w-full h-52 md:h-[30rem] bg-white">
          <img className='h-full w-full' src={banner} alt="" />
        </div>
        <div className="profile container mx-auto md:max-w-7xl flex flex-col relative px-4 md:flex-row md:px-10 md:gap-10">
          <div className="image h-14 md:w-60 md:h-60">
            <img className=' w-32 h-32 md:w-60 md:h-60 rounded-full absolute -top-[30%] md:-top-[50%]' src={userData.image ? userData.image : user} alt="" />
          </div>
          <div className="info py-4 space-y-2 font-semibold ">
            <div className="name text-lg md:text-4xl font-bold text-rose-600 capitalize">{userData.name}</div>
            <div className="email text-sm md:text-base "><span>Email - </span>{userData.email}</div>
            <div className="email text-sm md:text-base"><span>Phone - </span>{userData.phone}</div>
          </div>
        </div>
      </div>
      <div className="rooms">
        <h1 className='text-3xl font-semibold text-center'>Avalible Rooms And Prices</h1>
      </div>
      <div className="conatainer md:max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-5 md:py-10">
        {loading ? <Spinner /> : <>
          {rooms.map((room) => {
            return <UserRomCard key={room._id} {...room} />
          })}
        </>}
      </div>
    </div>
  )
}
