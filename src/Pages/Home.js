import React, { useEffect } from 'react'

import { Box, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react'
import { AuthContext } from './AuthContexProvider'
import Grow from '@mui/material/Grow';
const Home = () => {
  const { privates } = useContext(AuthContext)
  const userRoles = useContext(AuthContext).user.role
  const [checked, setChecked] = React.useState(false);
  const navigate = useNavigate()
  useEffect(()=>{
    setChecked(true)
  },[])
  const handleClick = (arg) => {
    switch (arg) {
      case 'payment': {
        // console.log('paymentclicked')
        navigate('/payment')
        break;
      }
      case 'income': {
        navigate('/income')
        break;
      }
      case 'expense': {
        navigate('/expense')
        break;
      }
      case 'bills': {
        navigate('/bills')
        break;
      }
      case 'misc': {
        navigate('/misc')
        break;
      }
      case 'peopleinfo': {
        navigate('/peopleinfo')
        break;
      }
      case 'certificate': {
        navigate('/certificate')
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
        <Grow
          in={checked}
          style={{ transformOrigin: '0 0 0' }}
          {...(checked ? { timeout: 1000 } : {})}>
          <Button variant="contained"
            sx={{ width: { xs: '70vw', sm: '40vw', md: '30vw', lg: '15vw' }, height: { xs: '6vh', sm: '8vh', md: '9vh', lg: '10vh' } }}
            onClick={() => handleClick('payment')}>Check Your Fee Due</Button>
            </Grow>
        </Grid>
        {userRoles?.includes(privates[1]) ? <>
          <Grid item xs={12} sm={6} md={4} lg={2} p={1}>
          <Grow
          in={checked}
          style={{ transformOrigin: '0 0 0' }}
          {...(checked ? { timeout: 1200} : {})}>
            <Button variant="contained"
              sx={{
                width: { xs: '70vw', sm: '40vw', md: '30vw', lg: '15vw' },
                height: { xs: '6vh', sm: '8vh', md: '9vh', lg: '10vh' }
              }} onClick={() => handleClick('income')}>Income Statements Entry</Button></Grow>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2} p={1}>
          <Grow
          in={checked}
          style={{ transformOrigin: '0 0 0' }}
          {...(checked ? { timeout: 1400 } : {})}>
            <Button variant="contained"
              sx={{
                width: { xs: '70vw', sm: '40vw', md: '30vw', lg: '15vw' },
                height: { xs: '6vh', sm: '8vh', md: '9vh', lg: '10vh' }
              }} onClick={() => handleClick('expense')}>Expense Statements Entry</Button></Grow>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2} p={1}>
          <Grow
          in={checked}
          style={{ transformOrigin: '0 0 0' }}
          {...(checked ? { timeout: 1600 } : {})}>
            <Button variant="contained"
              sx={{
                width: { xs: '70vw', sm: '40vw', md: '30vw', lg: '15vw' },
                height: { xs: '6vh', sm: '8vh', md: '9vh', lg: '10vh' }
              }} onClick={() => handleClick('bills')}>Generate Bills</Button></Grow>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2} p={1}>
          <Grow
          in={checked}
          style={{ transformOrigin: '0 0 0' }}
          {...(checked ? { timeout: 1800 } : {})}>
            <Button variant="contained"
              sx={{
                width: { xs: '70vw', sm: '40vw', md: '30vw', lg: '15vw' },
                height: { xs: '6vh', sm: '8vh', md: '9vh', lg: '10vh' }
              }} onClick={() => handleClick('misc')}>Miscellaneous Sheets</Button></Grow>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2} p={1}>
          <Grow
          in={checked}
          style={{ transformOrigin: '0 0 0' }}
          {...(checked ? { timeout: 2000 } : {})}>
            <Button variant="contained"
              sx={{
                width: { xs: '70vw', sm: '40vw', md: '30vw', lg: '15vw' },
                height: { xs: '6vh', sm: '8vh', md: '9vh', lg: '10vh' }
              }} onClick={() => handleClick('certificate')}>Marriage Certificate</Button></Grow>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2} p={1}>
          <Grow
          in={checked}
          style={{ transformOrigin: '0 0 0' }}
          {...(checked ? { timeout: 2200 } : {})}>
            <Button variant="contained"
              sx={{
                width: { xs: '70vw', sm: '40vw', md: '30vw', lg: '15vw' },
                height: { xs: '6vh', sm: '8vh', md: '9vh', lg: '10vh' }
              }} onClick={() => handleClick('peopleinfo')}>People Info Section</Button></Grow>
          </Grid>
        </> : ''}
      </Grid>
    </Box>
  )
}

export default Home