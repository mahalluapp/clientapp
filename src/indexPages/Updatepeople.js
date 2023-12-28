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
import dayjs from 'dayjs';
import useSWR from 'swr';
import { getPersonData, updateItem } from '../swrApi/helperApis';
import { useLocation } from 'react-router-dom';
import LoadingModal from '../Components/LoadingModal';
import {  useSnackbar } from 'notistack'
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const Updatepeople = () => {

  const location = useLocation()

  const { data, isLoading: isDataLoading,mutate:mutateUser,isValidating} = useSWR(location.state !== null ? { url: '/exec', args: location.state } : null, getPersonData,{
    revalidateOnFocus:false
  })
  const [pdata,setPdata] = React.useState([])
  React.useEffect(()=>{
    setPdata(data)
  },[data])
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()


  const [isLoading, setIsLoading] = React.useState(false)




  const [details, setDetails] = React.useState({
    Name: '',
    SlNo: '',
    HouseNo: '',
    Address: '',
    Region: '',
    Rate1: '',
    Rate2: '',
    WhatsApp: '',
    etURemarks: '',
    etDueDateRate1: '',
    etDueDateRate2: '',
    id:'',


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
      case 'etURemarks': {
        setDetails({ ...details, etURemarks: data })
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

function formatDateTimeString(dateTimeString) {
    const [datePart, timePart] = dateTimeString.split(', ');
    const [date, time] = [datePart.split('/'), timePart.split(':')];

    let day, month, year, hour, minute, second, ampm;

    if (date.length === 3 && time.length === 3) {
        // Date Part
        day = date[0].length === 1 ? '0' + date[0] : date[0];
        month = date[1].length === 1 ? '0' + date[1] : date[1];
        year = date[2];

        // Time Part
        [hour, minute, second] = time.map((item) => parseInt(item));

        // Handling AM/PM
        if (timePart.includes('AM') || timePart.includes('PM')) {
            const [timeStr, ampmStr] = time[2].split(' ');
            second = timeStr;
            ampm = ampmStr;
        }

        const formattedDateTime = dayjs(`${day}/${month}/${year}, ${hour}:${minute}:${second} ${ampm}`, 'DD/MM/YYYY, hh:mm:ss A');
        return formattedDateTime;
    } else {
        return 'Invalid date-time format';
    }
}
  React.useEffect(() => {
    if (data) {
     
      const DueDate1 = data[0].DueDate1? data[0].DueDate1 :''
      const DueDate2 = data[0].DueDate2? data[0].DueDate1 :''
      if(DueDate1 !== '' & DueDate2 !== ''){
        const date1format = formatDateTimeString(DueDate1)
        const date2format = formatDateTimeString(DueDate2)
        // console.log(date1format)
        setDate1(date1format)
        setDate2(date2format)
   

      }
     

      const detaildem = {
        Name: data[0].Name?data[0].Name:'',
        SlNo: data[0].SlNo?data[0].SlNo:'',
        HouseNo: data[0].HouseNo?data[0].HouseNo:'',
        Address: data[0].Address?data[0].Address:'',
        Region: data[0].Region?data[0].Region:'',
        Rate1: data[0].Rate1rate?data[0].Rate1rate:'',
        Rate2: data[0].Rate2rate?data[0].Rate2rate:'',
        WhatsApp: data[0].WhatsApp?data[0].WhatsApp: '',
        etURemarks: data[0].Remarks?data[0].Remarks :'',
        etDueDateRate1: '',
        etDueDateRate2: '',
        id:data[0].id?data[0].id:'',
      }
      setDetails(detaildem)
     
     
    }

  }, [data,isValidating])
  const handleClick = () => {
     console.log(data)
  //  console.log(location.state)
  }
  const handleTest = () =>{
    console.log(details)
    // console.log(date1)
  }
  React.useEffect(()=>{
    if(date1 & date2){
      setDetails((prev) => {
        return {
          ...prev, etDueDateRate1: date1.format('MM/DD/YYYY'),
          etDueDateRate2: date2.format('MM/DD/YYYY')
        }
      })
    }
  

  },[date1,date2])

  const handleUpdate = async () => {

 
    const res = Object.values(details).every((value) => value !== '')
    if (res) {
     
      setIsLoading(true)
      const update= await updateItem(details)
      // console.log(update)
      if (update?.status == "success") {

        setIsLoading(false);
        enqueueSnackbar(`Updated Data of ${details.Name} !`, {
          variant:'success'
         
        })

        mutateUser()
      
      } else {
        setIsLoading(false)
        enqueueSnackbar(`Failed to Update Data of ${details.Name} !`, {
          variant:'error'
         
        })
        
      }

    } else {
      enqueueSnackbar(`Please fill all Fields !`, {
        variant:'warning'
       
      })
    }
  }
  return (
    <>
      {isLoading || isDataLoading ? <LoadingModal />  :
        <> 
        <Box sx={{ width: { md: '50vw' }, p: 2}} >
          <Grid container spacing={2} justifyContent='center' alignItems="center">
            <Grid item xs={12}>
              <Item><Typography variant='h5' color='rgb(35 120 205)'>Update Details</Typography></Item>
            </Grid>
            <Grid item xs={12}>
              <Item><TextField id="outlined-basic" label="Name" variant="outlined"
                value={details.Name}
                // onChange={(e) => handleInput(e.target.value, 'Name')}
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
                    // onChange={(e) => handleInput(e.target.value, 'Region')}
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
            <Grid item container spacing={1}  justifyContent='center' alignItems="center" >
              <Grid item xs={6} justifyContent='center'>
                <Item>
                  <Typography variant='body1'>Mahallu Fee Due Date</Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en'
                  >
                    <DemoContainer components={['DatePicker']} >
                      <DatePicker value={date1} onChange={(newValue) => setDate1(newValue)} 
                      
                      format="DD-MM-YYYY"
                      sx={{ width: '100%' }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Item>
              </Grid>
              <Grid item xs={6} >
                <Item>
                  <Typography variant='body1'>Madrasa Fee Due Date</Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en'>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker value={date2} onChange={(newValue) => setDate2(newValue)} 
                      format="DD-MM-YYYY" sx={{ width: '100%' }}
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
              <Item><TextField id="outlined-basic" label="Remarks" variant="outlined"
                  value={details.etURemarks}
                  onChange={(e) => handleInput(e.target.value, 'etURemarks')}
                  sx={{ width: '100%' }}
                /></Item>
            </Grid>
            <Grid item xs={12}>
             <Button onClick={handleUpdate} variant="contained">Update Person</Button>
            </Grid>
          </Grid>
        </Box>
        </>
      }

    </>
  )
}

export default Updatepeople