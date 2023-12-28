import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

const LoadingModal = () => {
    const [open,setOpen] = useState(false)

    useEffect(()=>{
        setOpen(true)

        
    },[])
    return (
        <Box >
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                 >
                <CircularProgress color="inherit" />
            </Backdrop>

        </Box>
    )
}

export default LoadingModal