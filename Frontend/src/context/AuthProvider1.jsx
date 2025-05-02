import React, { createContext, useContext, useState } from 'react'

export const AuthContext1=createContext();
export default function AuthProvider1({children}) {
  
    const initialAuthAdmin = localStorage.getItem("Admin");
    const [authAdmin, setAuthAdmin]=useState(
        initialAuthAdmin?JSON.parse(initialAuthAdmin):undefined
    )

    return (
        <AuthContext1.Provider value={[authAdmin, setAuthAdmin]}>
            {children}
        </AuthContext1.Provider>
    )
}

export const useAuth1 = () =>useContext(AuthContext1);