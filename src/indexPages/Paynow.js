import { Box, Button, Grid, Paper, TextField, Typography, styled } from '@mui/material';
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { confirmPay } from '../swrApi/helperApis';
import dayjs from 'dayjs';
import LoadingModal from '../Components/LoadingModal';
import { useSWRConfig } from 'swr';
import { useSnackbar } from 'notistack'
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: 'black'
}));
const Paynow = () => {
    const { mutate } = useSWRConfig()
    const navigate = useNavigate()
    const [loading, setIsloading] = useState(false)
    const data = useLocation().state
    const [BillNo, setBillNo] = useState('')
    const [details, setDetails] = useState({
        Name: '',
        Address: '',
        Region: '',
        NewFromDueDate1: '',
        NewFromDueDate2: '',
        BillNo: '',
        PaidMonthsRate1: "",
        PaidMonthsRate1: '',
        TotalMahallPayable: '',
        TotalMadrassaPayable: '',
        TotalAmountPayable: '',
        id: '',
    })
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    function formatDateString(dateString) {
        const parts = dateString?.split('/');
        let day = parts[0];
        let month = parts[1];
        const year = parts[2];
        if (day.length === 1) {
            day = '0' + day;
        }
        if (month.length === 1) {
            month = '0' + month;
        }
        return `${day}/${month}/${year}`;
    }
    useEffect(() => {
        if (data) {
            const date1 = formatDateString(data?.DueDate1[0]?.split(",")[0])
            const months1 = parseInt(data?.PaidMonthsRate1)
            const date1monthadded = dayjs(date1, 'DD/MM/YYYY').add(months1, 'month')
            const NewFromDueDate1 = date1monthadded.format('DD/MM/YYYY')
            const date2 = formatDateString(data?.DueDate2[0]?.split(",")[0])
            const months2 = parseInt(data?.PaidMonthsRate2)
            const date2monthadded = dayjs(date2, 'DD/MM/YYYY').add(months2, 'month')
            const NewFromDueDate2 = date2monthadded.format('DD/MM/YYYY')
            const TotalAmountPayable = data?.TotalMahallPayable[0] + data?.TotalMadrassaPayable[0]
            setDetails({
                Name: data?.Name[0],
                Address: data?.Address[0],
                Region: data?.Region[0],
                NewFromDueDate1,
                NewFromDueDate2,
                BillNo: '',
                PaidMonthsRate1: data?.PaidMonthsRate1,
                PaidMonthsRate2: data?.PaidMonthsRate2,
                TotalMahallPayable: data?.TotalMahallPayable[0],
                TotalMadrassaPayable: data?.TotalMadrassaPayable[0],
                TotalAmountPayable: TotalAmountPayable,
                id : data?.id[0],
                oldDueDate1:data?.DueDate1[0]?.split(",")[0],
                oldDueDate2:data?.DueDate2[0]?.split(",")[0],

            })
        }

    }, [data])
    useEffect(() => {
        setDetails((prev) => {
            return { ...prev, BillNo }
        })
    }, [BillNo])
    const handleConfirm = async () => {
        const res = Object.values(details).every((value) => value !== '');
        if (res) {
            setIsloading(true)
            const NewFromDueDate1 = dayjs(details.NewFromDueDate1, 'MM/DD/YYYY').format('DD/MM/YYYY')
            const NewFromDueDate2 = dayjs(details.NewFromDueDate2, 'MM/DD/YYYY').format('DD/MM/YYYY')

            try {
                const resp = await confirmPay({ ...details, NewFromDueDate1, NewFromDueDate2 })
                // console.log(resp)
                if (resp.status == 'success') {
                    const successAction = snackbarId => (
                        <>
                            <Button variant="contained" size="small" color="success" onClick={() => { alert(`Successfully paid ${details.TotalAmountPayable} Rs with Bill No. ${details.BillNo} of the ${details.Name}`); }}>
                                Show
                            </Button>
                            <Button variant="contained" size="small" color="success" onClick={() => { closeSnackbar(snackbarId) }}>
                                Dismiss
                            </Button>
                        </>
                    );
                    setIsloading(false);
                    enqueueSnackbar('Payement Successfull !', {
                        action: successAction,
                        variant: 'success'

                    })
                    mutate({ url: '/exec', args: { Name: details.Name, Region: details.Region, Address: details.Address } })
                    if (window.location.hash == '#/paynow') {
                        navigate(-1)
                    }

                } else {
                    const failAction = snackbarId => (
                        <>
                            <Button variant="contained" size="small" color="error" onClick={() => { alert(`Failed to pay ${details.TotalAmountPayable} Rs with Bill No. ${details.BillNo} of the ${details.Name}`); }}>
                                Show
                            </Button>
                            <Button variant="contained" size="small" color="error" onClick={() => { closeSnackbar(snackbarId) }}>
                                Dismiss
                            </Button>
                        </>
                    );
                    setIsloading(false)
                    enqueueSnackbar('Payment Failed !', {
                        failAction,
                        variant: 'error'
                    })
                    if (window.location.hash == '#/paynow') {
                        navigate(-1)
                    }
                }
            } catch (err) {
                console.log(err)
                enqueueSnackbar('Network Error', { variant: 'error' })
                setIsloading(false)
                if (window.location.hash == '#/paynow') {
                    navigate(-1)
                }
            }
       } else {
            enqueueSnackbar('Please fill in all Details ', { variant: 'warning' })
        }
    }
    return (
        <>  {loading ? <LoadingModal /> :

            <Box sx={{ flexGrow: 1, minWidth: '100vw', maxWidth: '100vw' }}>
                <Grid container spacing={2} justifyContent='center' alignItems='center'>
                    <Grid item xs={12}>
                        <Item>
                            <Typography><span style={{ color: 'darkblue'}} >From : </span>{(data?.DueDate1)[0]?.split(",")[0]} <span style={{ color: 'darkblue'}} > To : </span>{details.NewFromDueDate1}</Typography>
                            <Typography>Total Mahallu Fee<span style={{ color: 'red' }}> {details.TotalMahallPayable}</span> Rs</Typography>

                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                            <Typography><span style={{ color: 'darkblue'}} >From : </span>{(data?.DueDate2)[0]?.split(",")[0]}<span style={{ color: 'darkblue'}} > To : </span>{details.NewFromDueDate2}</Typography>
                            <Typography>Total Madrasa Fee<span style={{ color: 'red' }}> {details.TotalMadrassaPayable}</span> Rs</Typography>

                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                            <TextField id="standard-basic" label="Bill No" variant="standard"
                                sx={{ width: '100px' }}
                                value={BillNo}

                                onChange={(e) => setBillNo(e.target.value)}
                            />
                        </Item>
                    </Grid>
                 
                    <Grid item xs={12}>
                       
                            <Button onClick={handleConfirm} variant="contained">Confirm to Pay {details.TotalAmountPayable} Rs</Button>
                     
                    </Grid>
                </Grid>

            </Box>

        }

        </>
    )
}

export default Paynow