'use client'

import { useSelector } from "react-redux";

export function useAuth() {
  const { user } = useSelector((state: any) => state.auth);
  
  if (user) {
    return true;
  }
  return false;
}
