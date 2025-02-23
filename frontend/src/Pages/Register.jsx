import React, { useEffect } from 'react'
import { FaUser } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"
import Spinner from '../Components/Spinner';
import { FaUpload } from "react-icons/fa6";
import user from '../images/user.webp'
import { ContextStore } from '../store/ContextStore'


export default function Register() {
  const navigate = useNavigate()
  const { isLoggedIn, saveToLocalStorage } = useContext(ContextStore)
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm()
  const [preview, setPreview] = useState(user)
  const [show, setShow] = useState({
    pass: false,
    con_pass: false
  })

  const handlefileOnChange = (e) => {
    const file = e.target.files[0];
    if (file)
      setPreview(URL.createObjectURL(file));
  }


  const handleOnSubmit = async (data) => {
    if (data.password === data.confirmPassword) {
      const formData = new FormData();
      formData.append("image", data.image[0])
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("password", data.password);
      const serverResponse = await fetch(`${import.meta.env.VITE_APP_SERVER_URI}api/auth/signup`, {
        method: "POST",
        body: formData
      })
      const response = await serverResponse.json()
      if (serverResponse.ok) {
        saveToLocalStorage(response.token)
        toast.success(response.message)
        navigate("/dashboard")
      }
      else {
        toast.warning(response.message)
      }
    }

  }

  useEffect(() => {
    if (isLoggedIn)
      navigate("/dashboard")
  }, [])

  return (
    <>
      <section>
        <div className="container mx-auto p-2 h-[91vh] flex justify-center items-center relative w-full">
          {isSubmitting && <Spinner />}
          <div className="box bg-gradient-to-r from-blue-500 to-green-500 min-h-[38rem] w-[19rem] rotate-6 absolute md:w-[36vw] rounded-xl "></div>
          <div className="form"  >
            <form onSubmit={handleSubmit(handleOnSubmit)} className='bg-white/30 w-[20rem] px-3 py-10 backdrop-blur-xl space-y-4 rounded-xl md:w-[35vw]'>
              <h1 className='text-xl font-bold text-center'>Create New Account</h1>
              <div className="name">
                <div className="input flex items-center gap-x-3">
                  <label className='' htmlFor="name"><FaUser className='text-green-600' /></label>
                  <input className='outline-none rounded-md border-gray-400 bg-gray-100 w-full border-0 placeholder:text-blue-300' type="text" id='name' placeholder='Enter your Name' {...register("name", { required: { value: true, message: "Name is required " } })} />
                </div>
                <div className="error ml-8">
                  {errors.name && <span className='text-red-600 text-xs font-bold'>{errors.name.message}</span>}
                </div>
              </div>
              <div className="phone ">
                <div className="input flex items-center gap-x-3">
                  <label className='' htmlFor="phone"><FaPhoneAlt className='text-green-600' /></label>
                  <input className='outline-none rounded-md border-gray-400 bg-gray-100 w-full border-0 placeholder:text-blue-300  ' type="number" id='phone' placeholder='Enter your Number' {...register("phone", { required: { value: true, message: "Phone is required " }, minLength: { value: 10, message: "Phone must have 10 digits" } })} />
                </div>
                <div className="error ml-8">
                  {errors.phone && <span className='text-red-600 text-xs font-bold'>{errors.phone.message}</span>}
                </div>
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
                  <input className='outline-none rounded-md border-gray-400 bg-gray-100 w-full border-0 placeholder:text-blue-300 ' type={show.pass ? "text" : "password"} id='password' placeholder='Enter  Password' {...register("password", { required: { value: true, message: "Password is required " }, minLength: { value: 8, message: "Password must have 8 characters" } })} />
                  <span className='absolute top-3 right-4 cursor-pointer text-green-500' onClick={() => setShow({ ...show, pass: !show.pass })}>
                    {show.pass ? <FaEye /> : <FaEyeSlash />}</span>
                </div>
                <div className="error ml-8">
                  {errors.password && <span className='text-red-600 text-xs font-bold'>{errors.password.message}</span>}
                </div>
              </div>
              <div className="confirm-password">
                <div className="input name flex items-center gap-x-3 relative">
                  <label className='' htmlFor="con-pass"><RiLockPasswordFill className='text-green-600' /></label>
                  <input className='outline-none rounded-md border-gray-400 bg-gray-100 w-full border-0 placeholder:text-blue-300 ' type={show.con_pass ? "text" : "password"} id='conf-pass' placeholder='Confirm Password' {...register("confirmPassword", { required: { value: true, message: "Password is required " }, minLength: { value: 8, message: "Password must have 8 characters" } })} />
                  <span className='absolute top-3 right-4 cursor-pointer text-green-500' onClick={() => setShow({ ...show, con_pass: !show.con_pass })}>
                    {show.con_pass ? <FaEye /> : <FaEyeSlash />}</span>
                </div>
                <div className="error ml-8">
                  {errors.confirmPassword && <span className='text-red-600 text-xs font-bold'>{errors.confirmPassword.message}</span>}
                  {(watch("password") !== watch("confirmPassword")) && <div className='text-red-600 text-xs font-bold'>Password Must be Same </div>}
                </div>
              </div>
              <div className="profile">
                <div className="input flex items-center justify-between">
                  <label className='flex justify-center items-center gap-2 py-2.5 px-4 bg-green-600 text-gray-200 rounded-full text-sm font-bold cursor-pointer hover:bg-green-700 ' htmlFor="image">
                    <div className="text">Upload Image</div>
                    <div className="icon"><FaUpload /></div>
                  </label>
                  <div className="preview">
                    <img src={preview} className='w-14 h-14 rounded-full' alt="" />
                  </div>
                  <input className='hidden' type="file" id='image' {...register("image", { required: { value: true, message: "Choose An Image" }, onChange: (e) => { handlefileOnChange(e) } })} />
                </div>
                <div className="error ml-8">
                  {errors.image && <span className='text-red-600 text-xs font-bold'>{errors.image.message}</span>}
                </div>
              </div>
              <div className="button flex justify-center items-center flex-col gap-2 ">
                <button disabled={isSubmitting} type="submit" className='outline-none w-44 py-2 bg-blue-600 text-white font-semibold rounded-md cursor-pointer shadow-lg hover:bg-blue-700 '>Register</button>
                <div className="info text-xs text-center "> Already have Account ? <Link to="/login" className="text-blue-700 font-bold hover:underline">
                  Login</Link></div>
              </div>
            </form>
          </div>
        </div >
      </section >
    </>

  )
}
