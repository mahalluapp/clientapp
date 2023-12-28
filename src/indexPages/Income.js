import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { expense, income } from '../swrApi/helperApis';
import { useLocation } from 'react-router-dom';
import LoadingModal from '../Components/LoadingModal';
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const IncomeExpense = () => {
    const { enqueueSnackbar } = useSnackbar()

    const location = useLocation()
    const [date, setDate] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false)
    const [statement, setStatement] = React.useState('')
    const [details, setDetails] = React.useState({
        etCreditPart: '',
        etCreditAmount: '',
        etCreditBill: '',
        ledgerName: ''
    })
    React.useEffect(() => {
        if (location.pathname == '/income') {
            setStatement('Income')
        } else if (location.pathname == '/expense') {
            setStatement('Expense')
        }
    }, [])
 
    const detaildem = {
        etCreditPart: '',
        etCreditAmount: '',
        etCreditBill: '',
        ledgerName: ''
    }

    React.useEffect(()=>{
        setDate(dayjs(new Date()))
    },[details])
    const handleInput = (data, input) => {
        switch (input) {
            case 'etCreditPart': {
                setDetails({ ...details, etCreditPart: data })
                break;
            }
            case 'etCreditAmount': {
                setDetails({ ...details, etCreditAmount: data })
                break;
            }
            case 'etCreditBill': {
                setDetails({ ...details, etCreditBill: data })
                break;
            }
            case 'etCreditDate': {
                setDetails({ ...details, etCreditDate: data })
                break;
            }
            case 'ledgerName': {
                setDetails({ ...details, ledgerName: data })
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
            if (statement == 'Income') {
                setIsLoading(true)
                const data = await income({...details,etCreditDate: date.format('DD/MM/YYYY HH:mm:ss')})
                if (data?.status == "success") {

                    setIsLoading(false)
                    enqueueSnackbar('Data Entered Successfully !', {
                        variant: 'success'
                    })
                    setDetails(detaildem)
                } else {
                    setIsLoading(false)
                    enqueueSnackbar('Failed to Add Data !', {
                        variant: 'error'
                    })
                    setDetails(detaildem)
                }

            } else if (statement == 'Expense') {
                setIsLoading(true)
                const data = await expense({...details,etCreditDate: date.format('DD/MM/YYYY HH:mm:ss')})
                // console.log(data)
                if (data?.status == "success") {

                    setIsLoading(false)
                    enqueueSnackbar('Data Entered Successfully !', {
                        variant: 'success'
                    })

                    setDetails(detaildem)
                } else {
                    setIsLoading(false)
                    enqueueSnackbar('Failed to Add Data !', {
                        variant: 'error'
                    })
                    setDetails(detaildem)
                }
            } else return

        } else {
            enqueueSnackbar('Please fill in all Fields !', {
                variant: 'warning'
            })
        }
    }
    return (
        <>
            {isLoading ? <LoadingModal /> : <>  
            <Box sx={{ width: { md: '60vw' }, p: 2}}>
                <Grid container spacing={2} justifyContent='center' alignItems="center">

                    <Grid item xs={12} >
                        <Item>
                            <Typography variant='h5' color ='rgb(35 120 205)'>{statement} Statements</Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={12} >
                        <Item>
                            <TextField id="outlined-basic" label="Enter Particular" variant="outlined"
                                value={details.etCreditPart}
                                onChange={(e) => handleInput(e.target.value, 'etCreditPart')}
                                sx={{ width:'100%' }}

                            />
                        </Item>
                    </Grid>
                    <Grid item xs={12} >
                        <Item>
                            <TextField id="outlined-basic" label="Enter Amount of Transaction" variant="outlined"
                                value={details.etCreditAmount}
                                onChange={(e) => handleInput(e.target.value, 'etCreditAmount')}
                                sx={{ width:'100%' }}
                                type='number'
                            />
                        </Item>
                    </Grid>
                    <Grid item xs={12} >
                        <Item>

                            <FormControl sx={{ width:'100%' }}>
                                <InputLabel id="ledgerid">Ledger Name </InputLabel>
                                <Select
                                    labelId="ledgerid"
                                    id="ledgerid"
                                    value={details.ledgerName}
                                    onChange={(e) => handleInput(e.target.value, 'ledgerName')}
                                    autoWidth
                                    label="ledger"
                                >
                                    <MenuItem value="">
                                        <em>ledger</em>
                                    </MenuItem>
                                    <MenuItem value={'Masjid'}>Masjid</MenuItem>
                                    <MenuItem value={'Madrasa'}>Madrasa</MenuItem>
                                    <MenuItem value={'Dars'}>Dars</MenuItem>
                                    <MenuItem value={'Complex'}>Complex</MenuItem>



                                </Select>
                            </FormControl>
                        </Item>
                    </Grid>
                    <Grid item xs={12} >
                        <Item>
                            <TextField id="outlined-basic" label="Invoice/Bill No" variant="outlined"
                                value={details.etCreditBill}
                                onChange={(e) => handleInput(e.target.value, 'etCreditBill')}
                                sx={{ width:'100%' }}

                            />
                        </Item>
                    </Grid>
                    <Grid item xs={12} >
                        <Item>
                            <Typography variant='body1'>Enter Date of Transaction</Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en' >
                                <DemoContainer components={['DatePicker']} >
                                    <DateTimePicker value={date} onChange={(newValue) => setDate(newValue)}
                                        format='DD/MM/YYYY hh:mm:ss'
                                        sx={{ width:'100%' }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
                <Button onClick={handleAdd} variant="contained">SUBMIT</Button>
            </>
            }
        </>
    )
}
export default IncomeExpense




