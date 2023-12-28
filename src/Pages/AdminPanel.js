import React from 'react'
import { Box, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
const AdminPanel = () => {
  const navigate = useNavigate()
  const handleClick = (arg) => {
    switch (arg) {
      case 'admins': {
        navigate('admins')
        break;
      }
      case 'users': {
        navigate('users')
        break;
      }
      case 'extras': {
        navigate('extras')
        break;
      }
      default: {
        break;
      }
    }
  }
  return (
    <Box sx={{ minWidth: '100vw', maxWidth: '100vw' }}  >
      <Grid container direction="row"
        justifyContent="center"
        alignItems="center">
        <Grid item xs={12} sm={6} md={4} lg={2} p={1}>

          <Button variant="contained"
            sx={{ width: { xs: '70vw', sm: '40vw', md: '30vw', lg: '15vw' }, height: { xs: '6vh', sm: '8vh', md: '9vh', lg: '10vh' } }}
            onClick={() => handleClick('admins')}>Admins</Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2} p={1}>
          <Button variant="contained"
            sx={{ width: { xs: '70vw', sm: '40vw', md: '30vw', lg: '15vw' }, height: { xs: '6vh', sm: '8vh', md: '9vh', lg: '10vh' } }}
            onClick={() => handleClick('users')}>Users
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2} p={1}>
          <Button variant="contained"
            sx={{ width: { xs: '70vw', sm: '40vw', md: '30vw', lg: '15vw' }, height: { xs: '6vh', sm: '8vh', md: '9vh', lg: '10vh' } }}
            onClick={() => handleClick('extras')}>Extras
          </Button>
        </Grid>
      </Grid>
    </Box>

  )
}

export default AdminPanel