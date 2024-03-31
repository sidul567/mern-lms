import React, { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { useSelector } from 'react-redux'

type Props = {
  children: ReactNode
}

const AdminProtected = ({children}: Props) => {
  const {user} = useSelector((state:any)=>state.auth);
  const isAuthenticated = user?.role === "admin";
  return isAuthenticated ? children : redirect("/");
}

export default AdminProtected;