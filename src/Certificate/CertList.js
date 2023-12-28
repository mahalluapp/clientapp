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
import { ref, getDownloadURL } from "firebase/storage";
import LoadingModal from '../Components/LoadingModal';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const CertList = () => {
    const location = useLocation();
    const [search, setSearch] = React.useState('');
    const [loading, setIsLoading] = React.useState(false);
    const [filtered, setFiltered] = React.useState([])
    const { data, isLoading } = useSWR('/certs', listCerts, {
        revalidateOnFocus: false,
    })
    const [url, setUrl] = React.useState(null)
    const handleSelect = async (item) => {
        setIsLoading(true)
        try {

            const url = await getDownloadURL(ref(storage, `certificates/${item}`));
            setUrl(url)
            setIsLoading(false)
        } catch (err) {
            console.log(err)
            setIsLoading(false)
        }

    }
    React.useEffect(() => {
        if (search == '') {
            setFiltered(data) //.items
        } else if (data) {      //items.
            const filteredData = data?.filter((item) => item.trim().toLowerCase().includes(search.toLowerCase()))
            setFiltered(filteredData)
        }

    }, [data, search]);
    const handleDownload = () => {
        const a = document.createElement('a');
        a.href = `${url}?attachment=true`;;
        a.download = `${location.state}`;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    if (loading) return <LoadingModal />
    if (url) return (<>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Box sx={{ width: '100vw', height: '70vh', p: 2 }}>
                <Viewer fileUrl={url} />

            </Box>
        </Worker>
        <Button onClick={handleDownload} variant="contained" sx={{ mt: 2 }}>Download</Button>
    </>
    )
    return (
        <Box sx={{ width: '100%' }}>
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
    )
}

export default CertList