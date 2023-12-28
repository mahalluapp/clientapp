import { useEffect, useState } from 'react'
import { getAuth,onAuthStateChanged } from "firebase/auth"
import { useNavigate } from 'react-router-dom';
import { addUsertoDB, getUserfromDB } from '../Firebase/helper';
import LoadingModal from './LoadingModal';
import { useSnackbar } from 'notistack'
import { expressLogin } from '../swrApi/helperApis';

const Login = () => {
    const auth = getAuth();
    const [status, setStatus] = useState(false)
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();

    useEffect(()=>{
        if(status == false){
            onAuthStateChanged(auth, async (user) => {
                if (user?.uid) {
                    const roles = await getUserfromDB(user.uid);
                    if (roles) {
                        try {
                            await expressLogin(user.accessToken);
                            enqueueSnackbar('you are logged in successfully !', {
                                variant: 'success'
                            })
                        } catch (err) {
                            enqueueSnackbar('Server Error !', {
                                variant: 'error'
                            })
                        }finally{
                            navigate('/', { replace: true })
                            setStatus(true)
                        }
                       
                    }else{            
                        try {
                            await addUsertoDB(user.uid, {
                                username: user.displayName,
                                email: user.email,
                                roles: ["VHJCaVM="],
        
                            })
                            await expressLogin(user.accessToken);
                            enqueueSnackbar('Signed in Successfull !', {
                                variant: 'success'
                            })
                            navigate('/', { replace: true })
        
                        } catch (err) {
                            enqueueSnackbar('Signing Failed !', {
                                variant: 'error'
                            })
                            
                        } finally{
                            navigate('/', { replace: true })
                            setStatus(true)
                        }
                    }
                }
            });

        }
       
    },[auth])
    return <LoadingModal />
}

export default Login