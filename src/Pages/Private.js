import React from 'react'
import { Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from './AuthContexProvider'
import { Box, Typography } from '@mui/material'
import AppBlockingIcon from '@mui/icons-material/AppBlocking';
const Private = () => {
  const userRoles = useContext(AuthContext).user.role
  const {privates} = useContext(AuthContext)
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    
    
  };
  return (
    <>
    {userRoles?.includes(privates[1]) ?
        <Outlet />
        : <Box sx={style}>
          <AppBlockingIcon fontSize='large'/>
        </Box>}
    </>

  )
}

export default Private