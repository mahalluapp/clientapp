import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useNavigate } from 'react-router-dom';
import {  useSnackbar } from 'notistack'
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const Edit = () => {
    const navigate = useNavigate()
    const [date1, setDate1] = React.useState('')
    const [date2, setDate2] = React.useState('')
    const [ledger, setLedger] = React.useState('')
    const { enqueueSnackbar} = useSnackbar()
   const handleGenerate = () => {
        if (ledger & date1 !== '',date2 !== '') {
            const details = {
                ledgerName: ledger,
                etBilFromDate: date1.format('MM/DD/YYYY'),
                etBilToDate: date2.format('MM/DD/YYYY'),

            }
            // console.log(details)
            const res = Object.values(details).every((value) => value !== '')
            if (res) {
                navigate('edit', {
                    state: { details }
                })
            } else {
                enqueueSnackbar('Please fill in all Fields !', {
                    variant: 'warning'
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
            <Box sx={{ width: { md: '50vw' }, p: 2 }}>
                <Grid container spacing={2} justifyContent='center' alignItems="center" direction='row'>
                    <Grid item xs={12}>

                        <Item>
                            <Typography variant='h5' color = 'rgb(35 120 205)'>Select Ledger</Typography>
                        </Item>
                    </Grid>


                    <Grid item xs={12} >
                        <Item>
                            <Typography sx={{ display: 'inline-block' }}>From </Typography>

                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en' >
                                <DemoContainer components={['DatePicker']} >
                                    <DatePicker value={date1} onChange={(newValue) => setDate1(newValue)}
                                        format="DD-MM-YYYY"
                                        sx={{ width:'100%' }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>

                        </Item>
                    </Grid>
                    <Grid item xs={12} >
                        <Item>
                            <Typography sx={{ display: 'inline-block' }}>To </Typography>

                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en' >
                                <DemoContainer components={['DatePicker']} >
                                    <DatePicker value={date2} onChange={(newValue) => setDate2(newValue)}
                                        format="DD-MM-YYYY"
                                        sx={{ width:'100%' }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>

                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                            <FormControl sx={{ width:'100%' }}>
                                <InputLabel id="ledgerid">Ledger Name </InputLabel>
                                <Select
                                    labelId="ledgerid"
                                    id="ledgerid"
                                    value={ledger}
                                    onChange={(e) => setLedger(e.target.value)}
                                    autoWidth
                                    label="ledger"
                                >

                                    <MenuItem value={'Masjid and Madrasa'}>Masjid and Madrasa</MenuItem>
                                    <MenuItem value={'Masjid'}>Masjid</MenuItem>
                                    <MenuItem value={'Madrasa'}>Madrasa</MenuItem>
                                    <MenuItem value={'Dars'}>Dars</MenuItem>
                                    <MenuItem value={'Complex'}>Complex</MenuItem>



                                </Select>
                            </FormControl>
                        </Item>
                    </Grid>
                    <Grid item xs={12}>                       
                            <Button onClick={handleGenerate} variant="contained">Start Edit</Button>
                   </Grid>

                </Grid>



            </Box>
        </>
    )
}

export default Edit