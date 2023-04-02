import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import Login from '../Login/Login';

export default function ProtectedRoutes() {
  let navigate=useNavigate();
  if(!localStorage.getItem("UserToken")){
    return <Navigate to ='/login' />
  }
  else{
    
    return <Outlet/> 

  }
  }
  

