import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Skeleton from '@mui/material/Skeleton';
import { useLocation } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import useSWR from 'swr';
import ArticleIcon from '@mui/icons-material/Article';
import { listCerts } from '../swrApi/certApi';
import { storage } from '../Firebase/firebase';
import { ref, deleteObject } from "firebase/storage";
import LoadingModal from '../Components/LoadingModal';
import { useSnackbar } from 'notistack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DeleteCert = () => {
    const [search, setSearch] = React.useState('');
    const [loading, setIsLoading] = React.useState(false);
    const [filtered, setFiltered] = React.useState([]);
    const { enqueueSnackbar } = useSnackbar()
    const [open, setOpen] = React.useState(false);
    const [item, setItem] = React.useState(null)
    const { data, isLoading, mutate } = useSWR('/certs', listCerts, {
        revalidateOnFocus: false,
    })
    const handleSelect = async (item) => {
        setItem(item)
        setOpen(true)
    }
    React.useEffect(() => {
        if (search == '') {
            setFiltered(data) //.items
        } else if (data) {      //items.
            const filteredData = data?.filter((item) => item.trim().toLowerCase().includes(search.toLowerCase()))
            setFiltered(filteredData)
        }

    }, [data, search]);
    if (loading) return <LoadingModal />
    const handleClose = () => {
        setIsLoading(false)
        setOpen(false)

    }
    const handleDelete = async () => {
        try {
            setIsLoading(true)
            await deleteObject(ref(storage, `certificates/${item}`));
            mutate()
            enqueueSnackbar(`${item} Deleted Successfully`, {
                variant: 'success'

            })
            setIsLoading(false)
            setOpen(false)
        } catch (err) {
            enqueueSnackbar(`${item} Deletion Failed`, {
                variant: 'error'

            })
            setIsLoading(false);
            setOpen(false)

        }
    }
    return (<>
        {open && 
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Delete Sheet"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Do you want to delete {item}?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>NO</Button>
                <Button onClick={handleDelete} autoFocus>
                    YES
                </Button>
            </DialogActions>
        </Dialog>
        }
        <Box sx={{ minWidth: '100vw', maxWidth: '50vw' }}>
            <Grid container direction="row"
                justifyContent="center"
                alignItems="center">
                <Grid item xs={12} md={6} >
                    <Box sx={{ backgroundColor: '#fff', p: 1, width: { sm: '100%', md: '500px', lg: '800px' }, textAlign: 'center', mx: 'auto', boxShadow: 2, borderRadius: 2 }}>
                        <Stack spacing={2} direction="row" alignItems="center">
                            <Avatar><SearchIcon /></Avatar>
                            <TextField id="setsearch" label="Search Certificate" variant="outlined"
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
                            backgroundColor: '#fff', p: 1, width: { sm: '100%', md: '500px', lg: '800px' }, textAlign: 'center', boxShadow: 2,
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
                                            <Avatar ><ArticleIcon /></Avatar>
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
        </Box>
    </>
    )
}

export default DeleteCert