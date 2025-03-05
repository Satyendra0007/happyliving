
import { useEffect, useContext, useState } from 'react'
import { ContextStore } from '../store/ContextStore'
import { fetchData } from '../actions/serverActions'
import { toast } from 'react-toastify'
import Spinner from '../Components/Spinner'
import ReceiptCard from '../Components/RecieptsCard'

export default function Reciepts() {

  const { token } = useContext(ContextStore)
  const [reciepts, setReceipts] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchAllReciepts = async () => {
    setLoading(true)
    const serverResponse = await fetchData(`${import.meta.env.VITE_APP_SERVER_URI}api/admin/reciepts`, token)
    const response = await serverResponse.json()
    if (serverResponse.ok) {
      setReceipts(response)
    }
    else {
      console.log(response)
    }
    setLoading(false)
  }



  useEffect(() => {
    fetchAllReciepts();
  }, [])

  return (
    <div>
      <h1 className='text-2xl font-bold my-5  text-center text-blue-700'>All Reciepts</h1>
      <div className="flex flex-wrap gap-4 justify-center items-center min-h-96">
        {loading ? <Spinner /> : <>
          {reciepts.map((receipt) => {
            return <ReceiptCard key={receipt._id} {...receipt} />
          })}
        </>}
      </div>
    </div>
  )
}
