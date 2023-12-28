import React, { useState } from 'react'
import { createContext } from 'react'
export const AuthContext = createContext()
const AuthContexProvider = ({children}) => {
   const [user,setUser] = useState({
        username : '',
        email : '',
        userId :'',
        role : [],
        accessToken : ''

    })
    const [privates,setPrivates] = useState(['UEJKRklN','QUJDTUlO','VHJCaVM='])

  return (
    <AuthContext.Provider value={{user,setUser,privates}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContexProvider