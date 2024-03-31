import React, { ReactNode } from 'react'
import { useAuth } from './useAuth'
import { redirect } from 'next/navigation'

type Props = {
  children: ReactNode
}

const Protected = ({children}: Props) => {
  const isAuthenticated = useAuth();
  return isAuthenticated ? children : redirect("/");
}

export default Protected;