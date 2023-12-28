import React from 'react'
import { useSnackbar } from 'notistack'
import { useSWRConfig } from 'swr'
import LoadingModal from '../Components/LoadingModal';
import { useNavigate,useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteSheet } from '../swrApi/miscApi';
const DeleteSheet = () => {
    const navigate = useNavigate()
    const { mutate } = useSWRConfig()
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation()
    const [isLoading, setIsLoading] = React.useState(false);
    const [open, setOpen] = React.useState(true);  
    const handleClose = () => {
        navigate('/adminpanel/extras',{
            replace:true
        });

    };
    const handleDelete = async () =>{
        try{
            setIsLoading(true);
            await deleteSheet({sheetName:location.state})
            enqueueSnackbar(`${location.state} Sheet Deleted  !`, {
                variant: 'success'
            })
            mutate('/misc');
            navigate('/adminpanel/extras',{replace:true});
            setIsLoading(false)
        }catch(err){
            enqueueSnackbar(`Failed !`, {
                variant: 'error'
            })
            navigate('/adminpanel/extras',{replace:true});
            setIsLoading(false)
        }
    }
    if(isLoading) return <LoadingModal/>
    return (
        <>
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
                Do you want to delete {location.state} Sheet ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={handleDelete} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </>
      );
    }
  


export default DeleteSheet