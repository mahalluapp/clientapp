import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useSnackbar } from 'notistack'
import { createSheet } from '../swrApi/miscApi'
import { styled } from '@mui/material/styles';
import { useSWRConfig } from 'swr'
import LoadingModal from '../Components/LoadingModal';
import { useNavigate } from 'react-router-dom';
const CreateSheet = () => {
    const [sheet, setSheet] = React.useState({
        sheetName: '',
        opBalance: ''
    })
    const navigate = useNavigate()
    const { mutate } = useSWRConfig()
    const { enqueueSnackbar } = useSnackbar()
    const [isLoading, setIsLoading] = React.useState(false)

    const regexPattern = /^[0-9a-zA-Z]+$/;
    const handleCreate = async () => {
        if (!!sheet.sheetName && !sheet.opBalance) {
            enqueueSnackbar(' Please fill in all fields !', {
                variant: 'warning'
            })
        } else if (regexPattern.test(sheet.sheetName)) {
            setIsLoading(true)
            try {
                await createSheet(sheet);
                mutate('/misc');
                setIsLoading(false)
                enqueueSnackbar(`${sheet.sheetName} Sheet Created  !`, {
                    variant: 'success'
                })
                
                navigate('/misc/addsheetdata')
                setSheet({
                    sheetName: '',
                    opBalance: ''
                })
            } catch (err) {
                setIsLoading(false)
                enqueueSnackbar(`Failed to create sheet ${sheet.sheetName} !`, {
                    variant: 'error'
                })
            }
        } else {
            enqueueSnackbar(' Sheet name is not Valid!', {
                variant: 'warning'
            })
        }
    }
    return (
        <>
            {isLoading ? <LoadingModal /> : <Box sx={{ width: {sm:'100%', md: '80vw' }, p: 2}}>
                <Grid container spacing={2} justifyContent='center' alignItems="center">

                    <Grid item xs={12} sx={{ p: 2 }} >
                        <Box sx={{ backgroundColor: '#fff',p:2, width: {sm:'100%',md : '500px'}, textAlign: 'center', mx: 'auto', boxShadow: 2, borderRadius: 2 }}
                        >
                            <Typography variant='h5' color='rgb(35 120 205)'> Create Sheet</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sx={{ p: 2 }} >
                        <Box sx={{ backgroundColor: '#fff',p:2, width: {sm:'100%',md : '500px'}, textAlign: 'center', mx: 'auto', boxShadow: 2, borderRadius: 2 }}
                        >
                            <TextField id="outlined-basic" label="Enter Sheet Name" variant="outlined"
                                value={sheet.sheetName}
                                onChange={(e) => setSheet((prev) => {
                                    return { ...prev, sheetName: e.target.value }
                                })}
                                sx={{ width: '100%' }}

                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sx={{ p: 2 }} >
                        <Box sx={{ backgroundColor: '#fff', p: 2, width: {sm:'100%',md : '500px'}, textAlign: 'center', mx: 'auto', boxShadow: 2, borderRadius: 2 }}
                        >
                            <TextField id="outlined-basic" label="Enter Opening Balance" variant="outlined"
                                value={sheet.opBalance}
                                onChange={(e) => setSheet((prev) => {
                                    return { ...prev, opBalance: e.target.value }
                                })}
                                sx={{ width: '100%' }}
                                type='number'
                            />
                        </Box>
                    </Grid>

                </Grid>
                <Button onClick={handleCreate} variant="contained">Create Sheet</Button>
            </Box>
            }
        </>
    )
}

export default CreateSheet