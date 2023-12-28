
import { Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from './AuthContexProvider'

const PrivateAdmin = () => {
    const userRoles = useContext(AuthContext).user.role
    const {privates} = useContext(AuthContext)

  return (
    <>

    {userRoles?.includes(privates[0])?
     <Outlet/> 
     :'Note Authorized' }
    
    
    </>
  )
}

export default PrivateAdmin