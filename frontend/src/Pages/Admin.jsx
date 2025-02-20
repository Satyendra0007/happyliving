import { useContext, useEffect, useState } from 'react'
import { ContextStore } from '../store/ContextStore'
import { toast } from 'react-toastify';
import { deleteRequest, fetchData } from '../actions/serverActions';
import Card from '../Components/Card'
import Spinner from '../Components/Spinner';
import { useNavigate } from 'react-router-dom';

export default function Admin() {

  const { token, isLoggedIn, userData } = useContext(ContextStore)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const fetchAllUserData = async () => {
    setLoading(true)
    const serverResponse = await fetchData(`${import.meta.env.VITE_APP_SERVER_URI}api/admin/users`, token)
    const response = await serverResponse.json()
    if (serverResponse.ok) {
      setUsers(response)
    }
    else {
      console.log(response)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (isLoggedIn) {
      if (!userData.isAdmin) {
        navigate("/dashboard")
      }
    }
    else {
      navigate("/login")
    }
  }, [])

  const handleDelete = async (id, email) => {
    let flag = confirm("Do you really want to delete this user " + email)
    if (flag) {
      setLoading(true)
      const serverResponse = await deleteRequest(`${import.meta.env.VITE_APP_SERVER_URI}api/admin/users/${id}`, token)
      const response = await serverResponse.json()
      if (serverResponse.ok) {
        fetchAllUserData();
        toast.success(response.message)
      }
      else {
        toast.error(response.message)
      }
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllUserData();
  }, [])

  return (
    <div className='relative'>
      <h1 className='text-2xl font-bold mt-5  text-center text-blue-700'>All Users</h1>
      <div className="flex flex-wrap gap-4 justify-center items-center min-h-[78vh] p-3">
        {loading ? <Spinner /> : <>
          {users.map((user) => {
            return <Card key={user._id} {...user} handleDelete={handleDelete} />
          })}
        </>}
      </div>
    </div>
  )
}
