import React, { useEffect, useRef, useState } from 'react';
import user from "../images/user.webp"
import { useContext } from 'react'
import { ContextStore } from '../store/ContextStore'
import banner from "../images/banner.jpeg"
import bg from "../images/bg.jpg"
import { useNavigate } from 'react-router-dom';
import UserRomCard from '../Components/UserRomCard';
import { fetchData } from '../actions/serverActions';
import Spinner from '../Components/Spinner';
import { toast } from 'react-toastify';
import { Download } from "lucide-react";


export default function Dashboard() {
  const { isLoggedIn, userData, token } = useContext(ContextStore)
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(false)
  const [receipts, setReceipts] = useState([])

  useEffect(() => {
    if (!isLoggedIn)
      navigate("/")

    fetchAllRooms();
    fetchRecipt();
  }, [])

  const fetchAllRooms = async () => {
    setLoading(true)
    const serverResponse = await fetchData(`${import.meta.env.VITE_APP_SERVER_URI}api/room`, token)
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

  const fetchRecipt = async () => {
    setLoading(true)
    const serverResponse = await fetchData(`${import.meta.env.VITE_APP_SERVER_URI}api/auth/receipt`, token)
    const response = await serverResponse.json()
    if (serverResponse.ok) {
      setReceipts(response)
    }
    else {
      console.log(response.message)
      toast.error(response.message)
    }
    setLoading(false)
  }

  const dawnloadRecipt = async (paymentId) => {
    setLoading(true)
    const response = await fetchData(`${import.meta.env.VITE_APP_SERVER_URI}api/payment/reciept/${paymentId}`, token)
    if (response.ok) {
      const blob = await response.blob();

      const pdfUrl = window.URL.createObjectURL(blob);
      window.open(pdfUrl, "_blank");

      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = `receipt_${paymentId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(pdfUrl);
    }
    else {
      console.log(response)
    }
    setLoading(false)
  }

  const veriryPayment = async (data) => {
    try {
      const serverResponse = await fetch(`${import.meta.env.VITE_APP_SERVER_URI}api/payment/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      })
      const response = await serverResponse.json();
      if (serverResponse.ok) {
        toast.success(response.message)
        console.log(response)
      }
      else {
        console.log(response)
        toast.error(response.message)

      }
    } catch (error) {
      console.log(error)
    }

  }

  const makePayment = async (roomId) => {
    try {
      const serverResponse = await fetch(`${import.meta.env.VITE_APP_SERVER_URI}api/payment/create/${roomId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
      const response = await serverResponse.json();
      if (serverResponse.ok) {
        const { id, amount, currency } = response;
        // Set up RazorPay options
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Replace with your RazorPay Key ID
          amount: amount,
          currency: currency,
          name: "Happy Living",
          description: "Hostel Room Token",
          order_id: id,
          handler: async (response) => {
            const data = {
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              amount: amount,
              name: "Happy Living",
            }
            await veriryPayment(data);
          },
          prefill: {
            name: userData.phone,
            email: userData.email,
            contact: userData.phone,
          },
          theme: {
            color: "#3399cc",
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      }
      else {
        console.log(response)
      }
    } catch (error) {
      console.log(error)
    }
  }




  return (
    <div className='min-h-[83vh]'>
      <div className="info">
        <div className="banner w-full h-52 md:h-[30rem] bg-white">
          <img className='h-full w-full' src={bg} alt="" />
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
      <div className={`${receipts.length <= 0 ? "hidden" : "block"} max-w-lg mx-auto mt-8`}>
        <h2 className="text-xl font-bold mb-4 text-center">Payment Receipts</h2>
        <ul className="space-y-3">

          {receipts.map((receipt) => (
            <li key={receipt._id} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm">
              <div>
                <p className="text-sm font-semibold text-gray-700">{receipt.name}</p>
                <p className="text-xs text-gray-500">Payment ID: {receipt.paymentId}</p>
                <p className="text-sm font-medium text-gray-800">₹{(receipt.amount).toLocaleString()}</p>
              </div>
              <button
                onClick={() => dawnloadRecipt(receipt.paymentId)}
                className="flex items-center px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
              >
                <Download size={16} className="mr-1" /> Download
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="rooms">
        <h1 className='text-xl  md:text-3xl font-semibold text-center'>Avalible Rooms And Prices</h1>
        <div className="conatainer md:max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-5 py-5 md:py-10">
          {loading ? <Spinner /> : <>
            {rooms.map((room) => {
              return <UserRomCard key={room._id} makePayment={makePayment} {...room} />
            })}
          </>}
        </div>
      </div>
    </div>
  )
}
