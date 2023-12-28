import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import LoadingModal from '../Components/LoadingModal';
import { useSnackbar } from 'notistack'
import { createPdf } from '../swrApi/certApi';
import { DatePicker } from '@mui/x-date-pickers';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { storage } from '../Firebase/firebase';
import { ref, uploadBytes } from "firebase/storage"

const boxStyle = { backgroundColor: '#fff', p: 2, textAlign: 'center', mx: 'auto', boxShadow: 2, borderRadius: 2, };

const Generate = () => {
    const { enqueueSnackbar } = useSnackbar()
    const [date, setDate] = React.useState(null)
    const [weddate, setWeddate] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false);
    const [details, setDetails] = React.useState({
        brideName: '',
        brideFather: '',
        brideHouse: '',
        groomName: '',
        groomFather: '',
        groomHouse: '',
        place: '',
        district: '',
        pin: '',
        wedresidence: '',
        slno: '',
        post: ''
    })
    const [bloburl, setBloburl] = React.useState(null);
    const [blobData, setBlobdata] = React.useState(null);
    const [wedres, setWedres] = React.useState({
        input: details.wedresidence,
        output: '',
    });;
    const handleInput = React.useCallback((data, input) => {
        switch (input) {
            case 'brideName': {
                setDetails({ ...details, brideName: data })
                break;
            }
            case 'brideFather': {
                setDetails({ ...details, brideFather: data })
                break;
            }
            case 'brideHouse': {
                setDetails({ ...details, brideHouse: data })
                break;
            }
            case 'groomFather': {
                setDetails({ ...details, groomFather: data })
                break;
            }
            case 'groomName': {
                setDetails({ ...details, groomName: data })
                break;
            }
            case 'groomHouse': {
                setDetails({ ...details, groomHouse: data })
                break;
            }
            case 'place': {
                setDetails({ ...details, place: data })
                break;
            }
            case 'pin': {
                setDetails({ ...details, pin: data })
                break;
            }
            case 'wedresidence': {
                setDetails({ ...details, wedresidence: data })
                break;
            }
            case 'slno': {
                setDetails({ ...details, slno: data })
                break;
            }
            case 'post': {
                setDetails({ ...details, post: data })
                break;
            }
            case 'district': {
                setDetails({ ...details, district: data })
                break;
            }
            default: {
                break;
            }
        }
    }, [setDetails, details])
    React.useEffect(() => {
        setWedres((prev) => {
            return { ...prev, input: details.wedresidence }
        })
    }, [details.wedresidence])

    const handleAdd = async () => {
        const res = Object.values(details).every((value) => value !== '');
        if (res && date) {
            // console.log(details)
            setIsLoading(true)
            const currentDate = date.format('DD/MM/YYYY')
            try {
                const response = await createPdf({ ...details, date: currentDate, weddate: weddate.format('DD/MM/YYYY'), wedresidence: wedres.input == 'others' ? wedres.output : details.wedresidence })
                setIsLoading(false)
                enqueueSnackbar('Certificate Generated Successfully !', {
                    variant: 'success'
                })
                try {
                    const blobData = new Blob([response], { type: 'application/pdf' });
                    setBlobdata(blobData)
                    const url = URL.createObjectURL(blobData);
                    setBloburl(url)
                } catch (err) {
                    console.log(err)
                }


                // setDetails(detaildemo)
            } catch (err) {
                setIsLoading(false)
                enqueueSnackbar('Failed to generate !', {
                    variant: 'error'
                })
            }
        } else {
            enqueueSnackbar('Please fill in all Fields !', {
                variant: 'warning'
            })
        }
    }
    const handleDownload = React.useCallback(() => {
        const a = document.createElement('a');
        a.href = bloburl;
        a.download = `${details.brideName}/${date.format('DD/MM/YYYY')}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

    }, [bloburl])
    const handleSave = () => {
        const file = new File([blobData], 'your_pdf_file.pdf', { type: 'application/pdf' });
        const storageRef = ref(storage, `/certificates/${details.brideName}.pdf`);
        uploadBytes(storageRef, file).then((snapshot) => {
            enqueueSnackbar('Saved Successfully !', {
                variant: 'success'
            })
        }).catch((error) => {
            enqueueSnackbar('Failed to Save !', {
                variant: 'error'
            })
        });
    }
    return (
        <>
            {isLoading ? <LoadingModal /> : bloburl ?
                <Grid container sx={{ width:'100vw',height:'80vh'}}>
                       <Box sx={{ width:'100%',height:'70vh'}}>
                        <Viewer fileUrl={bloburl} />
                        <Button onClick={handleDownload} variant='contained' sx={{ m: 2 }}>Download</Button>
                        <Button onClick={handleSave} variant='contained' sx={{ m: 2 }}>Save Pdf</Button>
                    </Box>

                </Grid>
                 
                : <>  <Box sx={{ width: { xs: '100%', md: '60vw' } }} >
                    <Grid container spacing={2} justifyContent='center' alignItems="center">

                        <Grid item xs={12} >
                            <Box sx={boxStyle}>
                                <Typography variant='h5' color='rgb(35 120 205)'> Generate Certificate</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} >
                            <Box sx={boxStyle}>
                                <TextField id="outlined-asxxa" label="Enter SL NO" variant="outlined"
                                    value={details.slno}
                                    onChange={(e) => handleInput(e.target.value, 'slno')}
                                    sx={{ width: '100%' }}

                                />
                            </Box>
                        </Grid>

                        <Grid item xs={12} >
                            <Box sx={boxStyle}>
                                <TextField id="outlined-basic" label="Bride's Name" variant="outlined"
                                    value={details.brideName}
                                    onChange={(e) => handleInput(e.target.value, 'brideName')}
                                    sx={{ width: '100%' }}
                                    type='text'
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} >
                            <Box sx={boxStyle}>
                                <TextField id="outlined-asxa" label="Bride's Father Name" variant="outlined"
                                    value={details.brideFather}
                                    onChange={(e) => handleInput(e.target.value, 'brideFather')}
                                    sx={{ width: '100%' }}
                                    type='text'
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} >
                            <Box sx={boxStyle}>
                                <TextField id="outlined-basic" label="Bride's House Name" variant="outlined"
                                    value={details.brideHouse}
                                    onChange={(e) => handleInput(e.target.value, 'brideHouse')}
                                    sx={{ width: '100%' }}
                                    type='text'
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} >
                            <Box sx={boxStyle}>
                                <TextField id="outlined-asdaa" label="Groom's Name" variant="outlined"
                                    value={details.groomName}
                                    onChange={(e) => handleInput(e.target.value, 'groomName')}
                                    sx={{ width: '100%' }}
                                    type='text'
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} >
                            <Box sx={boxStyle}>
                                <TextField id="outlined-basic" label="Groom's Father Name" variant="outlined"
                                    value={details.groomFather}
                                    onChange={(e) => handleInput(e.target.value, 'groomFather')}
                                    sx={{ width: '100%' }}
                                    type='text'
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} >
                            <Box sx={boxStyle}>
                                <TextField id="outlined-asdsad" label="Groom's House Name" variant="outlined"
                                    value={details.groomHouse}
                                    onChange={(e) => handleInput(e.target.value, 'groomHouse')}
                                    sx={{ width: '100%' }}
                                    type='text'
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} >
                            <Box sx={boxStyle}>
                                <TextField id="outlined-basic" label="Groom's place" variant="outlined"
                                    value={details.place}
                                    onChange={(e) => handleInput(e.target.value, 'place')}
                                    sx={{ width: '100%' }}
                                    type='text'
                                />
                            </Box>
                        </Grid>

                        <Grid item xs={12} >
                            <Box sx={boxStyle}>
                                <TextField id="outlined-post" label="Groom's Post" variant="outlined"
                                    value={details.post}
                                    onChange={(e) => handleInput(e.target.value, 'post')}
                                    sx={{ width: '100%' }}
                                    type='text'
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} >
                            <Box sx={boxStyle}>
                                <TextField id="outlined-District" label="Groom's District" variant="outlined"
                                    value={details.district}
                                    onChange={(e) => handleInput(e.target.value, 'district')}
                                    sx={{ width: '100%' }}
                                    type='text'
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} >
                            <Box sx={boxStyle}>
                                <TextField id="PinNo" label="Groom's Pin No" variant="outlined"
                                    value={details.pin}
                                    onChange={(e) => handleInput(e.target.value, 'pin')}
                                    sx={{ width: '100%' }}
                                    type='number'
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} >
                            <Box sx={boxStyle}>

                                <FormControl sx={{ width: '100%' }}>
                                    <InputLabel id="ledgerid">Wedding Residence</InputLabel>
                                    <Select
                                        labelId="ledgerid"
                                        id="ledgerid"
                                        value={details.wedresidence}
                                        onChange={(e) => handleInput(e.target.value, 'wedresidence')}
                                        autoWidth
                                        label="ledger"
                                    >
                                        <MenuItem value={"bride's residence"}>Bride's Residence</MenuItem>
                                        <MenuItem value={"groom's residence"}>Groom's Residence</MenuItem>
                                        <MenuItem value={'others'}>Others</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        {wedres?.input == 'others' &&
                            <Grid item xs={12} >
                                <Box sx={boxStyle}>
                                    <TextField id="outlined-basic" label="Enter Others" variant="outlined"
                                        value={wedres.output}
                                        onChange={(e) => setWedres((prev) => {
                                            return { ...prev, output: e.target.value }
                                        })}
                                        sx={{ width: '100%' }}
                                        type='text'
                                    />
                                </Box>
                            </Grid>
                        }
                        <Grid item xs={6} >
                            <Box sx={boxStyle}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en'>
                                    <DemoContainer components={['DatePicker']} >
                                        <DatePicker
                                            label="Wedding Date"
                                            value={weddate}
                                            onChange={(newValue) => setWeddate(newValue)}
                                            format='DD/MM/YYYY'
                                            sx={{ width: '100%' }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Box>
                        </Grid>
                        <Grid item xs={6} >
                            <Box sx={boxStyle}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en'>
                                    <DemoContainer components={['DatePicker']} >
                                        <DatePicker
                                            label="Certificate Date"
                                            value={date}
                                            onChange={(newValue) => setDate(newValue)}
                                            format='DD/MM/YYYY'
                                            sx={{ width: '100%' }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                    <Button onClick={handleAdd} sx={{ m: 2 }} variant="contained">SUBMIT</Button>
                </>

            }
        </>
    )
}

export default Generate