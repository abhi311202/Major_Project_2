import React, { createContext, useContext, useState } from 'react'

export const AuthContext2=createContext();
export default function AuthProvider2({children}) {
  
    const initialAuthAdmin2 = localStorage.getItem("SuperAdmin");
    const [authAdmin2, setAuthAdmin2]=useState(
        initialAuthAdmin2?JSON.parse(initialAuthAdmin2):undefined
    )

    return (
        <AuthContext2.Provider value={[authAdmin2, setAuthAdmin2]}>
            {children}
        </AuthContext2.Provider>
    )
}

export const useAuth2= () =>useContext(AuthContext2);