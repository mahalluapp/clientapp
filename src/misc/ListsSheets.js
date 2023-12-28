import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import { useLocation } from 'react-router-dom';
import { getSheetList } from '../swrApi/miscApi';
import { Button, Grid } from '@mui/material';
import useSWR from 'swr';
import ArticleIcon from '@mui/icons-material/Article';


const ListsSheets = () => {
    const location = useLocation();
    const [search, setSearch] = React.useState('')
    const [filtered, setFiltered] = React.useState([])
    const navigate = useNavigate()
    const [path, setPath] = React.useState(null);
    const { data, isLoading, isValidating } = useSWR('/misc', getSheetList, {
        revalidateOnFocus: false,
    })
    React.useEffect(() => {
        if (location.pathname == '/misc/addsheetdata') {
            setPath('/misc/add')
        } else if (location.pathname == '/misc/viewsheetdata') {
            setPath('/misc/view')
        } else if (location.pathname == '/adminpanel/extras/editmiscsheet') {
            setPath('edit')
        } else if (location.pathname == '/adminpanel/extras/deletemiscsheet') {
            setPath('delete')
        }
    }, [])
    const handleSelect = (item) => {
        navigate(`${path}`, {
            state: item,
            replace:true
        })
    }
    const handleTest = () => {
        console.log(location.pathname)
    }
    React.useEffect(() => {
        if (search == '') {
            setFiltered(data?.sheets) //.items
        } else if (data) {      //items.
            const filteredData = data?.sheets.filter((item) => item.trim().toLowerCase().includes(search.toLowerCase()))
            setFiltered(filteredData)
        }

    }, [data, search])
    return (
        <>
            <Box sx={{ minWidth: '100vw', maxWidth: '50vw' }}>

                {/* <Button onClick={handleClick}>TEST</Button> */}
                <Grid container direction="row"
                    justifyContent="center"
                    alignItems="center">
                    <Grid item xs={12} md={6} >
                        <Box sx={{ backgroundColor: '#fff', p: 1, width: {sm:'100%',md : '500px',lg:'800px'}, textAlign: 'center', mx: 'auto', boxShadow: 2, borderRadius: 2 }}>
                            <Stack spacing={2} direction="row" alignItems="center">
                                <Avatar><SearchIcon /></Avatar>
                                <TextField id="setsearch" label="Search Sheet" variant="outlined"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    sx={{ width: '100%', mx: 'auto', }}

                                />

                            </Stack>
                        </Box>

                        <Box
                            sx={{
                                my: 1,
                                mx: 'auto',
                                overflow: 'scroll',
                                overflowX: 'hidden',
                                height: '70vh',
                                backgroundColor: '#fff', p: 1, width: {sm:'100%',md : '500px',lg:'800px'}, textAlign: 'center', boxShadow: 2,
                                borderRadius: 2
                            }}
                        >
                            {isLoading ? <>

                                <Stack spacing={1}>
                                    {Array.from({ length: 7 }, () => undefined).map((d, i) => (
                                        <Skeleton variant="rounded" width={'100%'} height={60} key={i} />
                                    ))}

                                </Stack>
                            </> : filtered?.map((item, i) => (
                                <div key={i} onClick={() => handleSelect(item)}>
                                    {filtered &&
                                        <Stack spacing={2} direction="row" alignItems="center" sx={{ my: 1, ":hover": { backgroundColor: "rgb(132 121 121 / 17%)", cursor: 'pointer' }, borderRadius: '10px', p: 1 }}  >
                                            <Stack >
                                                <Avatar ><ArticleIcon/></Avatar>
                                            </Stack>
                                            <Stack sx={{ minWidth: 0 }} >
                                                <Typography variant='body1' >{item}</Typography>
                                            </Stack>
                                        </Stack>
                                    }

                                </div>
                            ))

                            }


                        </Box>
                    </Grid>
                </Grid>
                {/* <Button onClick={handleTest}>TEST</Button> */}
            </Box>

        </>
    )
}

export default ListsSheets