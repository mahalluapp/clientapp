import axios from "axios";
import { signOut } from 'firebase/auth';
import { expressLogout } from "./helperApis";
import { auth } from '../Firebase/firebase';


const baseURLProd = 'https://kcpmahallub.onrender.com'
const baseURLlocal = 'http://localhost:8000'
export const axiosInstance = axios.create({
    baseURL: baseURLProd,
    withCredentials: true,
    headers: {
        "Content-Type": 'Application/json',
    }
})
axiosInstance.interceptors.response.use(function (response) {

    return response;
}, function (error) {
    if (error.response.status == 500) {
        console.error(error.response.data)
    } else if (error.response.status == 401) {
        signOut(auth).then(async () => {
            await expressLogout()
            window.location.replace(window.location.origin);
        }).catch((error) => {
            window.location.replace(window.location.origin);
        });
    }else if(error.response.status == 403){
        signOut(auth).then(async () => {
            window.location.replace(window.location.origin);
        }).catch((error) => {
            window.location.replace(window.location.origin);
        });
    }
    return Promise.reject(error);
});