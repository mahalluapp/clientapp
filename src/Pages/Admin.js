import React, { useContext, useEffect, useState } from 'react'
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../Firebase/firebase';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import { Box, Grid } from '@mui/material';
import { AuthContext } from './AuthContexProvider';

const Admin = () => {
    const [data, setData] = useState([])
    const [toggle, setToggle] = useState(true)
    const { privates } = useContext(AuthContext)

    useEffect(() => {
        const arr = []
        const getData = async () => {
            const querySnapshot = await getDocs(query(collection(db, "users"), where('roles', 'array-contains', privates[1])));
            querySnapshot.forEach((doc) => {
                arr.push({ ...doc.data(), id: doc.id })
            });
            setData(arr)
        }
        getData()
    }, [toggle])
    const changeRole = async (id, roles) => {
        console.log(id)
        const washingtonRef = doc(db, "users", id);
        const adminRef = doc(db, "admins", "admins");
        
        if (roles.includes(privates[1])) {
            try {
                await updateDoc(washingtonRef, {
                    roles: arrayRemove(privates[1])
                })
                await updateDoc(adminRef, {
                    admins: arrayRemove(id)
                })
                
                setToggle(!toggle)
            } catch (err) {
                console.log(err)
            }

        } else if (roles.includes(privates[2])) {
            try {
                await updateDoc(washingtonRef, {
                    roles: arrayUnion(privates[1])
                });
                await updateDoc(adminRef, {
                    admins: arrayUnion(id)
                });
                
                setToggle(!toggle)
            } catch (err) {
                console.log(err)
            }

        }
        ;
    }
    const handleTest = () => {
        console.log(data)
    }
    return (
        <>
            {
                data ? < >

                    
                    <Box sx={{ minWidth: '95vw', maxWidth: '90vw', m: 'auto' ,display:'flex',alignItems:'center',justifyContent:'center',minHeight:'80vh',flexDirection:'column'}}>
                    <Typography sx={{mb:2}}>Change Accessibility </Typography>
                        <Grid container spacing={2}  >
                            <Grid item xs={12} md={12} p={1}>
                               <TableContainer component={Paper} >
                                    <Table aria-label="simple table" >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="right">Username</TableCell>
                                                <TableCell align="right">Email</TableCell>
                                                <TableCell align="right">Role</TableCell>
                                                <TableCell align="right">Change Role</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        {data.map((row, i) => {
                                            return (
                                                <TableBody key={i}>
                                                    <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                                        <TableCell align="right">{row.username}</TableCell>
                                                        <TableCell align="right">{row.email}</TableCell>
                                                        <TableCell align="right">{row.roles.includes(privates[1]) ? 'admin' : 'user'}</TableCell>
                                                        <TableCell align="right">
                                                            <Switch
                                                                checked={row.roles.includes(privates[1]) ? true : false}
                                                                onChange={() => changeRole(row.id, row.roles)}
                                                                inputProps={{ 'aria-label': 'controlled' }}
                                                            />
                                                        </TableCell>

                                                    </TableRow>

                                                </TableBody>
                                                )
                                        })}
                                      

                                    </Table>
                                </TableContainer>
                            </Grid>

                        </Grid>
                    </Box>
                    {/* <Button onClick={handleTest}> TEST</Button> */}
                </> : <>

                </>
            }
        </>
    )
}

export default Admin