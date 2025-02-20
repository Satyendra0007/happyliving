import { ContextStore } from '../store/ContextStore';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignOut() {

  const navigate = useNavigate()
  const { isLoggedIn, deleteFromLocalStorage } = useContext(ContextStore)

  useEffect(() => {
    if (isLoggedIn) {
      deleteFromLocalStorage()
      navigate("/")
    } else {
      navigate("/login")
    }
  }, [])

  return (
    <div>
      Logged Out
    </div>
  )
}
