import { useEffect, useState } from 'react'
import { getAuth, getRedirectResult, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth"
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
   
    // useEffect(() => {
    //     if (status == false) {
    //         getRedirectResult(auth)
    //             .then(async (result) => {
    //                 const user = result.user;
    //                 const roles = await getUserfromDB(user.uid);
    //                 console.log(roles)
    //                 if (!roles) {

    //                     try {
    //                         await addUsertoDB(user.uid, {
    //                             username: user.displayName,
    //                             email: user.email,
    //                             roles: ["VHJCaVM="],

    //                         })
    //                         enqueueSnackbar('Signed in Successfull !', {
    //                             variant: 'success'
    //                         })
    //                         try {
    //                             await expressLogin(user.accessToken)
    //                         } catch (err) {
    //                             console.log(err)
    //                         }
    //                         navigate('/', { replace: true })

    //                     } catch (err) {
    //                         enqueueSnackbar('Signing Failed !', {
    //                             variant: 'error'
    //                         })
    //                         navigate('/', { replace: true })
    //                     } finally {
    //                         setStatus(true)
    //                     }

    //                 } else {
                      



    //                 }

    //             }).catch((error) => {
    //                 const email = error?.customData?.email;
    //                 const credential = GoogleAuthProvider?.credentialFromError(error);
    //                 if (email || credential) {
    //                     enqueueSnackbar('Signing Failed !', {
    //                         variant: 'error'
    //                     })
    //                     navigate('/', { replace: true })
    //                 }
    //                 if (status == true) {
    //                     enqueueSnackbar('Signing Failed !', {
    //                         variant: 'error'
    //                     })
    //                     navigate('/', { replace: true })
    //                 }
    //                 // console.log('redirect error')

    //             });

    //     } else {
    //         navigate('/', { replace: true })
    //     }



    // }, [status])


    return <LoadingModal />
}

export default Login