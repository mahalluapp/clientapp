import React from 'react'
import { Box, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Worker } from '@react-pdf-viewer/core';

const Certificate = () => {
  const navigate = useNavigate()
  const handleClick = (arg) => {
    switch (arg) {
      case 'generate': {
        navigate('generate')
        break;
      }
      case 'list': {
        navigate('list')
        break;
      }
      default: {
        break;
      }
    }
  }
  return (
    <Box sx={{ minWidth: '100vw', maxWidth: '100vw' }}  >
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Grid container direction="row"
          justifyContent="center"
          alignItems="center">
          <Grid item xs={12} sm={6} md={4} lg={2} p={1}>

            <Button variant="contained"
              sx={{ width: { xs: '70vw', sm: '40vw', md: '30vw', lg: '15vw' }, height: { xs: '6vh', sm: '8vh', md: '9vh', lg: '10vh' } }}
              onClick={() => handleClick('generate')}>Generate Certificate</Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2} p={1}>

            <Button variant="contained"
              sx={{ width: { xs: '70vw', sm: '40vw', md: '30vw', lg: '15vw' }, height: { xs: '6vh', sm: '8vh', md: '9vh', lg: '10vh' } }}
              onClick={() => handleClick('list')}>List Certificates</Button>
          </Grid>
        </Grid>
      </Worker>
    </Box>
  )
}

export default Certificate