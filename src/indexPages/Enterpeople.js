import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useSWRConfig } from 'swr';
import { addItem } from '../swrApi/helperApis';
import LoadingModal from '../Components/LoadingModal';
// import { useContext } from 'react';
// import { AuthContext } from '../Pages/AuthContexProvider';
import {  useSnackbar } from 'notistack'
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Enterpeople = () => {
  const { mutate } = useSWRConfig()
  const [isLoading, setIsLoading] = React.useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const detaildem = {
    Name: '',
    SlNo: '',
    HouseNo: '',
    Address: '',
    Region: '',
    Rate1: '',
    Rate2: '',
    etDueDateRate1: '',
    etDueDateRate2: '',
  }

  const [details, setDetails] = React.useState({
    Name: '',
    SlNo: '',
    HouseNo: '',
    Address: '',
    Region: '',
    Rate1: '',
    Rate2: '',
    WhatsApp :'',
    etDueDateRate1: '',
    etDueDateRate2: '',


  })
  const [date1, setDate1] = React.useState('')
  const [date2, setDate2] = React.useState('')
  const handleInput = (data, input) => {

    switch (input) {
      case 'Name': {
        setDetails({ ...details, Name: data })
        break;
      }
      case 'SlNo': {
        setDetails({ ...details, SlNo: data })
        break;
      }
      case 'HouseNo': {
        setDetails({ ...details, HouseNo: data })
        break;
      }
      case 'Address': {
        setDetails({ ...details, Address: data })
        break;
      }
      case 'Region': {
        setDetails({ ...details, Region: data })
        break;
      }
      case 'Rate1': {
        setDetails({ ...details, Rate1: data })
        break;
      }
      case 'Rate2': {
        setDetails({ ...details, Rate2: data })
        break;
      }
      case 'WhatsApp': {
        setDetails({ ...details, WhatsApp: data })
        break;
      }
      case 'etDueDateRate1': {
        setDetails({ ...details, etDueDateRate1: data }) //`${data.$D}/${data.$M}/${data.$y}`
        break;
      }
      case 'etDueDateRate2': {
        setDetails({ ...details, etDueDateRate2: data }) //`${data.$D}/${data.$M}/${data.$y}` 
        break;
      }

      default: {
        break;
      }
    }

  }
    React.useEffect(()=>{
      if(date1 & date2){
        
        setDetails((prev) => {
          return {
            ...prev, etDueDateRate1: date1.format('DD/MM/YYYY'),
            etDueDateRate2: date2.format('DD/MM/YYYY')
          }
        })
      }

    },[date1,date2])
  const handleAdd = async () => {

  


    const res = Object.values(details).every((value) => value !== '')
    if (res) {
      // console.log(details)
      setIsLoading(true)
      const data = await addItem(details)
      // console.log(data)
      if (data?.status == "success") {

        setIsLoading(false)
        enqueueSnackbar(`Added ${details.Name} Successfully`, {
          variant:'success'
         
        })

        mutate({ url: '/exec', args: details.Region })
        setDetails(detaildem)
      } else {
        setIsLoading(false)
        enqueueSnackbar(`Failed to Add ${details.Name} `, {
          variant:'error'
         
        })
        setDetails(detaildem)
      }

    } else {
      enqueueSnackbar(`Please fill all fields`, {
        variant:'warning'
       
      })
    }
  }
  return (
    <>
      {isLoading ? <LoadingModal /> :

        <Box sx={{ width: { md: '50vw' }, p: 2}} >
          <Grid container spacing={2} justifyContent='center' alignItems="center">
            <Grid item xs={12}>
              <Item><Typography variant='h5' color='rgb(35 120 205)'>Enter People Details</Typography></Item>
            </Grid>
            <Grid item xs={12}>
              <Item><TextField id="outlined-basic" label="Name" variant="outlined"
                value={details.Name}
                onChange={(e) => handleInput(e.target.value, 'Name')}
                sx={{ width: '100%' }}
                
              /></Item>
            </Grid>
            <Grid item container spacing={1}>
              <Grid item xs={6}>
                <Item><TextField id="outlined-basic" label="Sl No" variant="outlined"
                  value={details.SlNo}
                  onChange={(e) => handleInput(e.target.value, 'SlNo')}
                  type='number'
                  sx={{ width: '100%' }}
                /></Item>
              </Grid>
              <Grid item xs={6}>
                <Item><TextField id="outlined-basic" label="House No" variant="outlined"
                  value={details.HouseNo}
                  onChange={(e) => handleInput(e.target.value, 'HouseNo')}
                  type='number'
                  sx={{ width: '100%' }}
                /></Item>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Item><TextField id="outlined-basic" label="Address" variant="outlined"
                value={details.Address}
                onChange={(e) => handleInput(e.target.value, 'Address')}
                sx={{ width: '100%' }}
              /></Item>
            </Grid>
            <Grid item xs={12}>
              <Item>

                <FormControl sx={{ width: '100%' }}>
                  <InputLabel id="regionid">Region</InputLabel>
                  <Select
                    labelId="regionid"
                    id="regionid"
                    value={details.Region}
                    onChange={(e) => handleInput(e.target.value, 'Region')}
                    autoWidth
                    label="Region"
                    
                  >
                    <MenuItem value="">
                      <em>Region</em>
                    </MenuItem>
                    <MenuItem value={'Vettukalam'}>Vettukalam</MenuItem>
                    <MenuItem value={'Kanhiramkunnu'}>Kanhiramkunnu</MenuItem>
                    <MenuItem value={'Pallikkunnu'}>Pallikkunnu</MenuItem>
                    <MenuItem value={'Chembathakkad'}>Chembathakkad</MenuItem>
                    <MenuItem value={'Puliyakottukara'}>Puliyakottukara</MenuItem>
                    <MenuItem value={'Kacheriparamba'}>Kacheriparamba</MenuItem>
                    <MenuItem value={'Kunnasseri'}>Kunnasseri</MenuItem>
                    <MenuItem value={'Malampradesam'}>Malampradesam</MenuItem>

                  </Select>
                </FormControl>
              </Item>
            </Grid>
            <Grid item container spacing={1}>
              <Grid item xs={6}>
                <Item><TextField id="outlined-basic" label="Mahllu Rate" variant="outlined"
                  value={details.Rate1}
                  onChange={(e) => handleInput(e.target.value, 'Rate1')}
                  type='number'
                  sx={{ width: '100%' }}
                /></Item>
              </Grid>
              <Grid item xs={6}>
                <Item><TextField id="outlined-basic" label="Madrasa Rate" variant="outlined"
                  value={details.Rate2}
                  onChange={(e) => handleInput(e.target.value, 'Rate2')}
                  type='number'
                  sx={{ width: '100%' }}
                /></Item>
              </Grid>
            </Grid>
            <Grid item container spacing={1} justifyContent='center' alignItems="center" >
              <Grid item xs={6} justifyContent='center'>
                <Item>
                  <Typography variant='body1'>Mahallu Fee Due Date</Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en'>
                    <DemoContainer components={['DatePicker']} >
                      <DatePicker value={date1} onChange={(newValue) => setDate1(newValue)} format="DD/MM/YYYY" sx={{ width: '100%' }}

                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Item>
              </Grid>
              <Grid item xs={6} justifyContent='center'>
                <Item>
                  <Typography variant='body1'>Madrasa Fee Due Date</Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en'>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker value={date2} onChange={(newValue) => setDate2(newValue)} format="DD/MM/YYYY" sx={{ width: '100%' }}

                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Item>
              </Grid>



            </Grid>
            <Grid item xs={12}>
              <Item><TextField id="outlined-basic" label="Whatsapp No" variant="outlined"
                  value={details.WhatsApp}
                  onChange={(e) => handleInput(e.target.value, 'WhatsApp')}
                  type='number'
                  sx={{ width: '100%' }}
                /></Item>
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handleAdd} variant="contained">Add Person</Button>
            </Grid>
          
          </Grid>
        </Box>
      }

    </>
  )
}

export default Enterpeople