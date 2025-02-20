import React, { useContext, useEffect, useState } from 'react'
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"
import Spinner from '../Components/Spinner';
import user from '../images/user.webp'
import { ContextStore } from '../store/ContextStore';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { sendPostRequest } from '../actions/serverActions';

export default function Login() {
  const navigate = useNavigate()
  const { isLoggedIn, saveToLocalStorage } = useContext(ContextStore)
  const { register, handleSubmit, watch, formState: { errors, isSubmiting } } = useForm()
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isLoggedIn)
      navigate("/dashboard")
  }, [])

  const handleOnSubmit = async (data) => {
    setLoading(true)
    const serverResponse = await sendPostRequest(`${import.meta.env.VITE_APP_SERVER_URI}api/auth/login`, data)
    const response = await serverResponse.json()
    if (serverResponse.ok) {
      saveToLocalStorage(response.token)
      toast.success(response.message)
      navigate("/dashboard")
    }
    else {
      toast.error(response.message)
    }
    setLoading(false)
  }

  return (
    <section>
      <div className="container mx-auto p-2 h-[84vh] flex justify-center items-center relative w-full">
        {loading && <Spinner />}
        <div className="box bg-gradient-to-r from-blue-500 to-green-500 min-h-[31rem] w-[19rem] rotate-6 absolute md:w-[36vw] rounded-xl "></div>
        <div className="form"  >
          <form onSubmit={handleSubmit(handleOnSubmit)} className='bg-white/30 w-[20rem] px-3 py-10 backdrop-blur-xl space-y-8 rounded-xl md:w-[35vw]'>
            <h1 className='text-xl font-bold text-center'>LogIn To Your Account </h1>
            <div className="logo">
              <img className='w-32 h-32 rounded-full shadow-2xl mx-auto' src={user} alt="" />
            </div>
            <div className="email">
              <div className="input flex items-center gap-x-3">
                <label className='' htmlFor="email"><MdEmail className='text-green-600' /></label>
                <input className='outline-none rounded-md border-gray-400 bg-gray-100 w-full border-0 placeholder:text-blue-300 ' type="email" id='email' placeholder='Enter your Email' {...register("email", { required: { value: true, message: "Email is required " } })} />
              </div>
              <div className="error ml-8">
                {errors.email && <span className='text-red-600 text-xs font-bold'>{errors.email.message}</span>}
              </div>
            </div>
            <div className="password">
              <div className="input flex items-center gap-x-3 relative">
                <label className='' htmlFor="password"><RiLockPasswordFill className='text-green-600' /></label>
                <input className='outline-none rounded-md border-gray-400 bg-gray-100 w-full border-0 placeholder:text-blue-300 ' type={show ? "text" : "password"} id='password' placeholder='Enter  Password' {...register("password", { required: { value: true, message: "Password is required " }, minLength: { value: 8, message: "Password must have 8 characters" } })} />
                <span className='absolute top-3 right-4 cursor-pointer text-green-500' onClick={() => setShow(!show)}>
                  {show ? <FaEye /> : <FaEyeSlash />}</span>
              </div>
              <div className="error ml-8">
                {errors.password && <span className='text-red-600 text-xs font-bold'>{errors.password.message}</span>}
              </div>
            </div>

            <div className="button flex justify-center items-center flex-col gap-2 ">
              <button disabled={isSubmiting} type="submit" className='outline-none w-44 py-2 bg-blue-600 text-white font-semibold rounded-md cursor-pointer shadow-2xl hover:bg-blue-700 '>Login</button>
              <div className="info text-xs text-center "> Don't Have Account ? <Link to="/register" className="text-blue-700 font-bold hover:underline">
                Register</Link></div>
            </div>
          </form>
        </div>
      </div >
    </section >
  )
}
