import { Outlet } from 'react-router-dom'
import { auth } from '../Firebase/firebase'
import { Box, Typography } from '@mui/material'
const Public = () => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

  };
  return (
    <>
      {auth?.currentUser ? (
        <Outlet />
      ) : (
        <Box sx={style}>
          <Typography variant='h4'>Please Login</Typography>
        </Box>
      )}
    </>
  );
}


export default Public