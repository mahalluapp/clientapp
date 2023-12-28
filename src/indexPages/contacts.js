import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import { useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: 'black',
    maxWidth: '100%',
    display: 'block'
}));

const Contacts = ({ users, isLoading }) => {
    const location = useLocation()
    const [search, setSearch] = React.useState('')
    const [data, setData] = React.useState(null)
    const navigate = useNavigate()
    const handleSearch = (name) => {
        setSearch(name)

    }
    const { enqueueSnackbar } = useSnackbar()

    const handleClick = (user) => {

        if (Object.values(user).every((value) => value !== '')) {
            if (location.pathname == '/payment') {
                navigate('profile', {
                    state: user
                })
            } else if (location.pathname == '/peopleinfo/updatepeople') {
                navigate('/peopleinfo/updateprofile', {
                    state: user
                })
            }
        } else {

            enqueueSnackbar('Network Error !', {
                variant: 'Error'

            })

        }
    }
    React.useEffect(() => {
        if (users && search == '') {
            setData(users) //.items
        } else if (users) {      //items.
            const filtered = users.filter((user) => user.Name?.trim().toLowerCase().includes(search.toLowerCase()))
            setData(filtered)
        }

    }, [users, search])
    return (
        <>
            <Box sx={{ width: '100%' }}>
                {/* <button onClick={handleTest}>TEST</button> */}
                <Item sx={{
                    my: 1,
                    mx: 'auto',
                   width: '100%'
                }}>
                    <Stack spacing={2} direction="row" alignItems="center" sx={{ p: 1 }}>

                        <Stack>
                            <Avatar><SearchIcon /></Avatar>
                        </Stack>
                        <Stack sx={{ width:'100%' }}>
                            <TextField id="outlined-basic" label="Name" variant="outlined"
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </Stack>
                    </Stack>
                </Item>

            </Box>
            <Item
                sx={{
                    my: 1,
                    mx: 'auto',
                    overflow: 'scroll',
                    overflowX: 'hidden',
                    height: '60vh',
                    width: '100%'
                }}
            >
                {isLoading ? <>
                   
                    <Stack spacing={1}>
                        {Array.from({ length: 7 }, () => undefined).map((d, i) => (
                            <Skeleton variant="rounded" width={'100%'} height={60} key={i} />
                        ))}

                    </Stack>
                </> : data?.map((user, i) => (
                    <div key={i} onClick={() => handleClick(user)}>
                        {user?.Name && 
                        <Stack spacing={2} direction="row" alignItems="center" sx={{ my: 1, ":hover": { backgroundColor: "rgb(132 121 121 / 17%)", cursor: 'pointer' }, borderRadius: '10px', p: 1 }}  >
                            <Stack >
                                <Avatar >{user?.Name[0]}</Avatar>
                            </Stack>
                            <Stack sx={{ minWidth: 0 }} >
                                <Typography noWrap variant='body1' >{user?.Name }</Typography>
                            </Stack>
                        </Stack>
                        }
                    </div>
                ))

                }
            </Item>

        </>

    )
}

export default Contacts