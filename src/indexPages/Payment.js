import * as React from 'react';
import { Box, Button, Grid, Paper } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import { getPeopleData } from '../swrApi/helperApis'
import { useState,useContext } from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useSWR from 'swr'
import Contacts from './contacts';
import { AuthContext } from '../Pages/AuthContexProvider';
import { styled } from '@mui/material/styles';

const Payment = () => {
    const {accessToken} = useContext(AuthContext).user
    const [region, setRegion] = useState('')
    const handleRegion = (event) => {
        setRegion(event.target.value);
    };
    const {data : users,isLoading,isValidating} = useSWR(region !== '' ? {url :'/exec',args : region}: null,(arg)=>getPeopleData(arg,accessToken), {
        revalidateOnFocus: false,
      })
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        maxWidth: '100%',
        display: 'block'
    }));
    return (
        <Box  sx={{  minWidth: '100vw',maxWidth:'90vw'}}>
            <Grid container direction="row"
                justifyContent="center"
                alignItems="center">
                <Grid item xs={12} >
                    <Box sx={{ width: {sm :'100%',md:'60vw'},mx:'auto' }}>
                    <Item>
                    <FormControl sx={{ width:'100%' }}>
                        <InputLabel id="regionid">Region</InputLabel>
                        <Select
                            labelId="regionid"
                            id="regionid"
                            value={region}
                            onChange={handleRegion}
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
                    <Contacts users = {users} isLoading={isLoading}/>
                    </Box>
                    

                </Grid>

            </Grid>
        </Box>
    )
}

export default Payment