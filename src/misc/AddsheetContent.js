import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useLocation } from 'react-router-dom';
import LoadingModal from '../Components/LoadingModal';
import { useSnackbar } from 'notistack'
import { addSheetContent } from '../swrApi/miscApi';
import dayjs from 'dayjs';


const boxStyle = { backgroundColor: '#fff', p: 2, width: {sm:'100%',md : '500px',lg:'800px'}, textAlign: 'center', mx: 'auto', boxShadow: 2, borderRadius: 2 };

const AddsheetContent = () => {
    const { enqueueSnackbar } = useSnackbar()
    const location = useLocation()
    const [date, setDate] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false)
    const [statement, setStatement] = React.useState('')
    
    const [details, setDetails] = React.useState({
        slno: '',
        type: 'Debit',
        statement: '',
        amount: '',
        billNo: '',
        sheetName:location?.state,

    })
    const detaildemo = {
        slno: '',
        type: 'Debit',
        statement: '',
        amount: '',
        billNo: '',
        sheetName:location?.state,
    }
    React.useEffect(() => {
        setDetails((prev) => {
            return {
                ...prev, sheetName: location?.state
            }
        })
    }, [location])
    React.useEffect(()=>{
        setDate(dayjs(new Date()))
    },[details])
    const handleInput = (data, input) => {
        switch (input) {
            case 'slno': {
                setDetails({ ...details, slno: data })
                break;
            }
            case 'type': {
                setDetails({ ...details, type: data })
                break;
            }
            case 'statement': {
                setDetails({ ...details, statement: data })
                break;
            }
            case 'amount': {
                setDetails({ ...details, amount: data })
                break;
            }
            case 'billNo': {
                setDetails({ ...details, billNo: data })
                break;
            }
            default: {
                break;
            }
        }
    }
    const handleAdd = async () => {
        const res = Object.values(details).every((value) => value !== '')
        if (res && date) {
            // console.log(details)
            setIsLoading(true)

            try {
                await addSheetContent({...details, date: date.format('MM/DD/YYYY HH:mm:ss')})
                setIsLoading(false)
                enqueueSnackbar('Data Entered Successfully !', {
                    variant: 'success'
                })
                setDetails(detaildemo)
            } catch (err) {
                setIsLoading(false)
                enqueueSnackbar('Failed to Add Data !', {
                    variant: 'error'
                })
            }
        } else {
            enqueueSnackbar('Please fill in all Fields !', {
                variant: 'warning'
            })
        }
    }

    return (
        <>
            {isLoading ? <LoadingModal /> : <>  <Box sx={{ width: {sm:'100%', md: '80vw' }, p: 2}}>
                <Grid container spacing={2} justifyContent='center' alignItems="center">

                    <Grid item xs={12} >
                        <Box sx={boxStyle}>
                            <Typography variant='h5' color='rgb(35 120 205)'>{statement} Add Data to Sheet</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} >
                        <Box sx={boxStyle}>
                            <TextField id="outlined-basic" label="Enter SL NO" variant="outlined"
                                value={details.slno}
                                onChange={(e) => handleInput(e.target.value, 'slno')}
                                sx={{ width: '100%' }}
                                type='number'
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} >
                        <Box sx={boxStyle}>

                            <FormControl sx={{ width: '100%' }}>
                                <InputLabel id="ledgerid">Debit / Credit</InputLabel>
                                <Select
                                    labelId="ledgerid"
                                    id="ledgerid"
                                    value={details.type}
                                    onChange={(e) => handleInput(e.target.value, 'type')}
                                    autoWidth
                                    label="ledger"
                                >
                                    <MenuItem value="">
                                        <em>Type</em>
                                    </MenuItem>
                                    <MenuItem value={'Debit'}>Debit</MenuItem>
                                    <MenuItem value={'Credit'}>Credit</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={12} >
                        <Box sx={boxStyle}>
                            <TextField id="outlined-basic" label="Enter Statement" variant="outlined"
                                value={details.statement}
                                onChange={(e) => handleInput(e.target.value, 'statement')}
                                sx={{ width: '100%' }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} >
                        <Box sx={boxStyle}>
                            <TextField id="outlined-basic" label="Enter Amount of Transaction" variant="outlined"
                                value={details.amount}
                                onChange={(e) => handleInput(e.target.value, 'amount')}
                                sx={{ width: '100%' }}
                                type='number'
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12} >
                        <Box sx={boxStyle}>
                            <TextField id="outlined-basic" label="Invoice/Bill No" variant="outlined"
                                value={details.billNo}
                                onChange={(e) => handleInput(e.target.value, 'billNo')}
                                sx={{ width: '100%' }}

                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} >
                        <Box sx={boxStyle}>
                            <Typography variant='body1'>Enter Date of Transaction</Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en'>
                                <DemoContainer components={['DatePicker']} >
                                    <DateTimePicker
                                        label="Date"
                                        value={date}
                                        onChange={(newValue) => setDate(newValue)}
                                        format='DD/MM/YYYY hh:mm:ss'
                                        sx={{ width: '100%' }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Box>
                    </Grid>


                </Grid>
            </Box>
                <Button onClick={handleAdd} sx={{mb:2}} variant="contained">SUBMIT</Button>
            </>

            }
        </>
    )
}

export default AddsheetContent