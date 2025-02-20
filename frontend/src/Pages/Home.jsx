import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaStaffSnake } from "react-icons/fa6";
import { ContextStore } from '../store/ContextStore';
import { useForm } from "react-hook-form"
import { sendPostRequest } from '../actions/serverActions';
import { toast } from 'react-toastify';
import { BsDoorOpen } from "react-icons/bs";
import { FaBed } from "react-icons/fa";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { TbAirConditioning } from "react-icons/tb";
import { MdFoodBank } from "react-icons/md";
import { FaWifi } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";
import { FaBus } from "react-icons/fa";
import { MdOutlineLocalLaundryService } from "react-icons/md";
import homeImage from "../images/home.jpg"

export default function Home() {
  const { register, handleSubmit, reset, formState: { errors, isSubmiting } } = useForm()
  const { isLoggedIn } = useContext(ContextStore)
  const navigate = useNavigate()

  const handleOnSubmit = async (data) => {
    console.log(data)
    const serverResponse = await sendPostRequest(`${import.meta.env.VITE_APP_SERVER_URI}api/form/contact`, data)
    const response = await serverResponse.json()
    if (serverResponse.ok) {
      toast.success(response.message)
      reset();
    }
    else {
      toast.error(response.message)
    }
  }

  useEffect(() => {
    if (isLoggedIn)
      navigate("/dashboard")
  }, [])

  return (

    <>
      <div className='py-5  w-full  md:h-[84v]  relative'  >
        <div className="image absolute h-full w-full top-0 left-0 -z-10  bottom-0 ">
          <img className='h-full w-full' src={homeImage} alt="" />
        </div>
        <div className="mx-auto md:p-6 md:flex container md:max-w-6xl md:gap-x-16 md:items-center bg-white/30 backdrop-blur-md rounded-2xl" >
          <div className="left px-3 ">
            <div className="head text-4xl">
              <h1>A Hostel <br /> <span className='font-semibold'>Which Fells Like Home</span></h1>
            </div>
            <div className="para mt-2 text-sm leading-6 tracking-wider text-justify ">
              <p>Sometimes, when we shift to a new city, it appears to be too new. With new people, streets and languages all around, these places can feel unfamiliar and uncomfortable. And in times like these, wouldn't it be nice to find a place that feels just like home?</p>
            </div>
            <div className="info mt-4 flex flex-wrap gap-5 justify-center ">
              <div className="card w-36 h-28 bg-gray-100  relative flex justify-center items-center flex-col shadow-full border border-slate-400 rounded-md">
                <div className="icon absolute top-3 left-3 text-xl text-gray-700"><FaStaffSnake /></div>
                <div className="count text-2xl font-bold">250+</div>
                <div className="member text-sm ">STAFF</div>
              </div>
              <div className="card w-36 h-28 bg-gray-100  relative flex justify-center items-center flex-col shadow-full border border-slate-400 rounded-md">
                <div className="icon absolute top-3 left-3 text-xl text-gray-700"><BsDoorOpen /></div>
                <div className="count text-2xl font-bold">1000+</div>
                <div className="member text-sm ">ROOMS</div>
              </div>
              <div className="card w-36 h-28 bg-gray-100  relative flex justify-center items-center flex-col shadow-full border border-slate-400 rounded-md">
                <div className="icon absolute top-3 left-3 text-xl text-gray-700"><FaBed /></div>
                <div className="count text-2xl font-bold">2500+</div>
                <div className="member text-sm ">BEDS</div>
              </div>
              <div className="card w-36 h-28 bg-gray-100  relative flex justify-center items-center flex-col shadow-full border border-slate-400 rounded-md">
                <div className="icon absolute top-3 left-3 text-xl text-gray-700"><MdOutlineMapsHomeWork /></div>
                <div className="count text-2xl font-bold">10+</div>
                <div className="member text-sm ">COMPUS</div>
              </div>
            </div>
          </div>
          <div className="right p-5">
            <div className="content">
              <div className="form container bg-slate-300 rounded-md shadow-full" >
                <form onSubmit={handleSubmit(handleOnSubmit)} className='w-[20rem] px-5 py-10 space-y-4 rounded-xl md:w-[35vw] mx-auto' >
                  <h1 className='text-xl font-bold text-center'>Contact Us</h1>
                  <div className="name">
                    <div className="input">
                      <label className='font-bold text-gray-900 text-sm' htmlFor="name">Name</label>
                      <input className=' rounded-md border-gray-400 bg-gray-100 w-full border placeholder:text-blue-300' type="text" id='name' placeholder='Enter your Name' {...register("name", { required: { value: true, message: "Name is required " } })} />
                    </div>
                    <div className="error ml-8">
                      {errors.name && <span className='text-red-600 text-xs font-bold'>{errors.name.message}</span>}
                    </div>
                  </div>
                  <div className="phone ">
                    <div className="input">
                      <label className='font-bold text-gray-900 text-sm' htmlFor="phone">Phone</label>
                      <input className=' rounded-md border-gray-400 bg-gray-100 w-full border placeholder:text-blue-300  ' type="number" id='phone' placeholder='Enter your Number' {...register("phone", { required: { value: true, message: "Phone is required " }, minLength: { value: 10, message: "Phone must have 10 digits" } })} />
                    </div>
                    <div className="error ml-8">
                      {errors.phone && <span className='text-red-600 text-xs font-bold'>{errors.phone.message}</span>}
                    </div>
                  </div>
                  <div className="email">
                    <div className="input">
                      <label className='font-bold text-gray-900 text-sm' htmlFor="email">Email</label>
                      <input className=' rounded-md border-gray-400 bg-gray-100 w-full border placeholder:text-blue-300 ' type="email" id='email' placeholder='Enter your Email' {...register("email", { required: { value: true, message: "Email is required " } })} />
                    </div>
                    <div className="error ml-8">
                      {errors.email && <span className='text-red-600 text-xs font-bold'>{errors.email.message}</span>}
                    </div>
                  </div>
                  <div className="meaage">
                    <div className="input">
                      <label className='font-bold text-gray-900 text-sm' htmlFor="message">Message</label>
                      {/* <input className=' rounded-md border-gray-400 bg-gray-100 w-full border placeholder:text-blue-300' type="text" id='name' placeholder='Enter your Name' {...register("message", { required: { value: true, message: "Message is required " } })} /> */}
                      <textarea name="message" id="message" className=' rounded-md border-gray-400 bg-gray-100 w-full border placeholder:text-blue-300' type="text" placeholder='Enter your Message' {...register("message", { required: { value: true, message: "Message is required " } })}></textarea>
                    </div>
                    <div className="error ml-8">
                      {errors.name && <span className='text-red-600 text-xs font-bold'>{errors.name.message}</span>}
                    </div>
                  </div>

                  <div className="button flex justify-center items-center flex-col gap-2 ">
                    <button disabled={isSubmiting} type="submit" className='outline-none w-44 py-3 bg-blue-600 text-white font-semibold rounded-md cursor-pointer shadow-lg hover:bg-blue-700 '>Send Message</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="features md:py-10 ">
        <h1 className='text-3xl text-center px-4'>Security and comfort you deserve</h1>
        <div className="cantainer flex flex-wrap gap-9 justify-center items-center mt-4">
          <div className="circle flex flex-col justify-center items-center gap-1">
            <div className="icon text-4xl text-white  w-16 h-16  bg-gradient-to-r from-rose-600 to-pink-600 flex justify-center items-center  rounded-full shadow-full "><TbAirConditioning /></div>
            <div className="text text-xs font-bold">Fully Ac Rooms</div>
          </div>
          <div className="circle flex flex-col justify-center items-center gap-1">
            <div className="icon text-4xl text-white  w-16 h-16  bg-gradient-to-r from-rose-600 to-pink-600 flex justify-center items-center  rounded-full shadow-full "><MdFoodBank /></div>
            <div className="text text-xs font-bold">Hygenic Food</div>
          </div>
          <div className="circle flex flex-col justify-center items-center gap-1">
            <div className="icon text-4xl text-white  w-16 h-16  bg-gradient-to-r from-rose-600 to-pink-600 flex justify-center items-center  rounded-full shadow-full"><FaWifi /></div>
            <div className="text text-xs font-bold">Campus Wifi</div>
          </div>
          <div className="circle flex flex-col justify-center items-center gap-1">
            <div className="icon text-4xl text-white  w-16 h-16  bg-gradient-to-r from-rose-600 to-pink-600 flex justify-center items-center  rounded-full shadow-full"><MdOutlineSecurity /></div>
            <div className="text text-xs font-bold">24 Hours Security</div>
          </div>
          <div className="circle flex flex-col justify-center items-center gap-1">
            <div className="icon text-4xl text-white  w-16 h-16  bg-gradient-to-r from-rose-600 to-pink-600 flex justify-center items-center  rounded-full shadow-full"><FaBus /></div>
            <div className="text text-xs font-bold">Transport</div>
          </div>
          <div className="circle flex flex-col justify-center items-center gap-1">
            <div className="icon text-4xl text-white  w-16 h-16  bg-gradient-to-r from-rose-600 to-pink-600 flex justify-center items-center  rounded-full shadow-full"><MdOutlineLocalLaundryService /></div>
            <div className="text text-xs font-bold">Laundry</div>
          </div>
        </div>

      </div>

      <div className="room py-10 container md:max-w-5xl mx-auto md:flex justify-between items-center">
        <div className="md:w-[40%]">
          <h1 className='text-4xl px-3 font-semibold'>Incredible Room Facilities </h1>
          <p className='text-gray-800 font-semibold tracking-wider p-4 text-justify'>Nalanda Living Hostels are committed to providing the best possible experience for our guests. We have a trained staff who are always ready to serve you and make sure your stay is comfortable..</p>
        </div>
        <div className="image md:w-[45%]">
          <img className='w-full' src="https://www.nalandaliving.com/assets/img/home/food.png" alt="" />
        </div>
      </div>

      <div className="gallery container mx-auto md:py-10 ">
        <h1 className='text-center font-semibold text-4xl  my-4 '>Gallery</h1>
        <div className="md:flex flex-wrap gap-9 justify-center items-center space-y-4">
          <img className='md:w-[28rem] shadow-full' src="https://www.nalandaliving.com/assets/img/infrastructure/2.jpg" alt="" />
          <img className='md:w-[28rem] shadow-full' src="https://www.nalandaliving.com/assets/img/infrastructure/3.jpg" alt="" />
          <img className='md:w-[28rem] shadow-full' src="https://www.nalandaliving.com/assets/img/infrastructure/4.jpg" alt="" />
          <img className='md:w-[28rem] shadow-full' src="https://www.nalandaliving.com/assets/img/infrastructure/5.jpg" alt="" />
          <img className='md:w-[28rem] shadow-full' src="https://www.nalandaliving.com/assets/img/infrastructure/6.jpg" alt="" />
          <img className='md:w-[28rem] shadow-full' src="https://www.nalandaliving.com/assets/img/infrastructure/7.jpg" alt="" />
          <img className='md:w-[28rem] shadow-full' src="https://www.nalandaliving.com/assets/img/infrastructure/8.jpg" alt="" />
          <img className='md:w-[28rem] shadow-full' src="https://www.nalandaliving.com/assets/img/infrastructure/9.jpg" alt="" />
          <img className='md:w-[28rem] shadow-full' src="https://www.nalandaliving.com/assets/img/infrastructure/10.jpg" alt="" />
        </div>
      </div>
    </>
  )
}
