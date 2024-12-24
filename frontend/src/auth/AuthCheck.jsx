/* eslint-disable react/prop-types */

import { useUserStore } from "@/Stores/useUserStore"
import { useNavigate } from "react-router-dom";

const AuthCheck = ({children}) => {
    const navigate = useNavigate();
    const { user } = useUserStore();
    if (!user) {
        navigate('/login');
        return null;
    }
    const token = localStorage.getItem('token');
    if (!token) {
        navigate('/login');
        return null;
    }

  return (
    <>
      {children}
    </>
  )
}

export default AuthCheck
