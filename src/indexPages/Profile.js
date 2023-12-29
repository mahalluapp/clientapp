import { Button, Typography } from '@mui/material'
import React, { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import { getPersonData } from '../swrApi/helperApis'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import LoadingModal from '../Components/LoadingModal'
import { AuthContext } from '../Pages/AuthContexProvider'
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const Profile = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const { data: pData, isLoading} = useSWR(location.state !== null ? { url: '/exec', args: location.state } : null, getPersonData, {
        revalidateOnFocus: false,
      })
    const [data, setData] = useState([])
    const [mahallu, setMahallu] = useState('');
    const [madrasa, setMadrasa] = useState('');
    const { privates } = React.useContext(AuthContext)
    const userRoles = React.useContext(AuthContext).user.role

    React.useEffect(() => {
        if (pData) {
            setData(pData)
        }
    }, [pData])
    const hanldePayNow = (obj) => {
        navigate('/paynow', {
            state: obj
        })
    }
    const formattedDatefn = useMemo(()=>{
        const currentDate = new Date();
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); 
        const year = currentDate.getFullYear();
        return`${day}/${month}/${year}`;
        
    },[])
    return (
        <>
            {
                isLoading ? <> <LoadingModal /></> : <>
                    <Box sx={{ flexGrow: 1, maxWidth: {xs:'98vw',md:'95vw'} }}>
                       <Grid container spacing={2} >
                            <Grid item xs={12} md={6}>
                                <Item>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <Typography variant='h5' sx={{ color: 'rgb(35 120 205)' }}>
                                                Resident Details
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body1' sx={{ color: 'darkblue'}}>
                                                Name of Resident
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body1' sx={{color:'black'}}>
                                                {data?.map((el) => el.Name)}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body1'sx={{ color: 'darkblue'}}>
                                                Address
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body1'sx={{color:'black'}}>
                                                {data?.map((el) => el.Address)}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body1'sx={{ color: 'darkblue'}}>
                                                Mahallu Region
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body1'sx={{color:'black'}}>
                                                {data?.map((el) => el.Region)}
                                            </Typography>
                                        </Grid>
                                        {userRoles?.includes(privates[1]) ? <>
                                            <Grid item xs={6}>
                                                <Typography variant='body1'sx={{ color: 'darkblue'}}>
                                                    Whatsapp No
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant='body1' sx={{color:'black'}}>
                                                    {data?.map((el) => el.WhatsApp)}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant='body1' sx={{ color: 'darkblue'}}>
                                                    Remarks
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant='body1' sx={{color:'black'}}>
                                                    {data?.map((el) => el.Remarks)}
                                                </Typography>
                                            </Grid>
                                        </> : ''}



                                    </Grid>
                                </Item>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Item>
                                    <Grid container spacing={2} >
                                        <Grid item xs={12}>
                                            <Typography variant='h5' sx={{ color: 'rgb(35 120 205)' }} >
                                                Payment Details
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography variant='body1' sx={{ color: 'darkblue'}}>
                                                Masjid Fee Due
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography variant='body1' sx={{color:'black'}}>
                                                {data?.map((el) => (el?.DueDate1).split(",")[0])} <span style={{ color: 'darkblue'}} >To</span> {formattedDatefn}

                                                {/* {data?.map((el) => (difference((el?.DueDate1).split(",")[0])))} */}
                                            </Typography>
                                            <Typography sx={{color:'black'}}>&#40; {data?.map((el) => (el?.MonthRate1))} &#41; Month &#40;s&#41; x {data?.map((el) => (el?.Rate1rate))} = Rs <span style={{ color: 'red' }}>{data?.map((el) => (el?.Rate1))}</span></Typography>

                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography variant='body1' sx={{ color: 'darkblue'}}>
                                                Madrasa Fee Due
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography variant='body1' sx={{color:'black'}}>
                                                {data?.map((el) => (el?.DueDate2).split(",")[0])} <span style={{ color: 'darkblue'}} >To</span>  {formattedDatefn}

                                                {/* {data?.map((el) => (difference((el?.DueDate1).split(",")[0])))} */}
                                            </Typography>
                                            <Typography sx={{color:'black'}}>&#40; {data?.map((el) => (el?.MonthRate2))} &#41; Month &#40;s&#41; x {data?.map((el) => (el?.Rate2rate))} = Rs <span style={{ color: 'red' }}>{data?.map((el) => (el?.Rate2))}</span></Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <Typography sx={{ color: 'darkblue'}}>Total Fee Due = <span style={{ color: 'red' }}>{data?.map((el) => (el?.Total))}</span></Typography>
                                        </Grid>
                                    </Grid>
                                </Item>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Item>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Typography variant='body1' sx={{ color: 'darkblue'}}>
                                                Bill No of Last Payment
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body1' sx={{color:'black'}}>
                                                {data?.map((el) => el.payinbill)}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body1' sx={{ color: 'darkblue'}}>
                                                Amount of Last Payment
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body1' sx={{color:'black'}}>
                                                {data?.map((el) => el.payinrate)}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body1' sx={{ color: 'darkblue'}}>
                                                Date of Last Payment
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body1' sx={{color:'black'}}>
                                                {data?.map((el) => el.payindate)}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Item>
                            </Grid>
                            {userRoles?.includes(privates[1]) ?
                                <Grid item xs={12} md={6}>

                                    <Item>

                                        <Grid container spacing={2} >
                                            <Grid item xs={12} >
                                                <Typography variant='h5' sx={{ color: 'rgb(35 120 205)' }}>
                                                    Payment Now
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid container item xs={12} justifyContent='center' sx={{ mb: '40px' }}>
                                                    <Typography sx={{ display: 'inline-block',color:'darkblue' }} >
                                                        Mahallu Fee </Typography>
                                                    <TextField id="standard-basic" label="Months(s)" variant="standard"
                                                        sx={{ width: '100px' }}
                                                        value={mahallu}
                                                        type='number'
                                                        onChange={(e) => setMahallu(e.target.value)}
                                                    /> <Typography sx={{ display: 'inline-block',color:'black' }}>=
                                                        <span style={{ color: 'red' }}> {data?.map((el) => parseInt(el.Rate1rate) * mahallu)}</span> Rs. 
                                                    </Typography> <span style={{ color: 'red' }}><Typography sx={{ display: 'inline-block' }} > Amount to Pay</Typography></span>
                                                </Grid>
                                                <Grid container item xs={12} justifyContent='center' rowGap={2}>
                                                    <Typography sx={{ color: 'darkblue'}}>
                                                        Madrasa Free </Typography><TextField id="standard-basic" label="Months(s)" variant="standard"
                                                            value={madrasa}
                                                            sx={{ width: '100px' }}
                                                            type='number'
                                                            onChange={(e) => setMadrasa(e.target.value)}
                                                    /><Typography sx={{ display: 'inline-block',color:'black' }}> = <span style={{ color: 'red' }}> {data?.map((el) => parseInt(el.Rate2rate) * madrasa)}</span> Rs. </Typography><span style={{ color: 'red' }}><Typography sx={{ display: 'inline-block' }}> Amount to Pay</Typography></span>

                                                </Grid>



                                            </Grid>

                                            <Grid item xs={12} sx={{ m: '40px' }}>
                                                <Typography sx={{color:'darkblue'}}>
                                                    Total Amount to Pay </Typography>
                                                <Typography>
                                                    <span style={{ color: 'red' }}> {(data?.map((el) => parseInt(el.Rate1rate) * mahallu + (parseInt(el.Rate2rate) * madrasa)))}</span> Rs.

                                                </Typography>
                                                <Button variant="contained" onClick={() => {
                                                    const DueDate1 = data?.map((el) => el.DueDate1);
                                                    const DueDate2 = data?.map((el) => el.DueDate2);
                                                    const Name = data?.map((el) => el.Name);
                                                    const Address = data?.map((el) => el.Address);
                                                    const Region = data?.map((el) => el.Region);
                                                    const TotalAmountPayable = (data?.map((el) => parseInt(el.Rate1rate) * mahallu + (parseInt(el.Rate2rate) * madrasa)))
                                                    const TotalMahallPayable = data?.map((el) => parseInt(el.Rate1rate) * mahallu)
                                                    const TotalMadrassaPayable = data?.map((el) => parseInt(el.Rate2rate) * madrasa)
                                                    const PaidMonthsRate1 = mahallu;
                                                    const PaidMonthsRate2 = madrasa;
                                                    const id = data?.map((el) => parseInt(el.id));
                                                    hanldePayNow({ DueDate1, DueDate2, Name, Address, Region, TotalAmountPayable, TotalMahallPayable, TotalMahallPayable, TotalMadrassaPayable, PaidMonthsRate1, PaidMonthsRate2 , id })
                                                }}>Pay Now</Button>
                                            </Grid>

                                        </Grid>

                                    </Item>
                                </Grid>
                                : ''}

                        </Grid>
                    </Box>
                </>
            }
        </>



    )
}

export default Profile