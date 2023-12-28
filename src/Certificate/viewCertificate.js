import * as React from 'react';
import Box from '@mui/material/Box';
import LoadingModal from '../Components/LoadingModal';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import useSWR from 'swr';
import { getCert } from '../swrApi/certApi';
import { useSnackbar } from 'notistack';
const ViewCert = () => {
  const [bloburl, setBloburl] = React.useState(null);
  const location = useLocation();
  const { data, isLoading, isValidating, error } = useSWR({ url: '/cert', file: location.state }, getCert, {
    revalidateOnFocus: false,
  })
  const { enqueueSnackbar } = useSnackbar()


  React.useEffect(() => {
    if (data !== null && !isValidating && !error) {
      setBloburl(data)
    }
  }, [data])
  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = bloburl;
    a.download = `${location.state}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  if(error) return enqueueSnackbar('Failed !',{
    variant:'error'
  })
  return (
    <>
      {isLoading && isValidating ? <LoadingModal /> :

        <Box sx={{ width: { sm: '100%' }, p: 2, ml: { md: '20vw' }, height: '80vh' }}>
          {bloburl && <Viewer fileUrl={bloburl} />}
          <Button onClick={handleDownload} variant="contained" sx={{ mt: 2 }}>Download</Button>
        </Box>

      }

    </>

  )
}

export default ViewCert