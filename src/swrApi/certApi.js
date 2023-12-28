import { axiosInstance } from "./axiosIntercept"
import { storage } from '../Firebase/firebase';
import { ref, listAll} from "firebase/storage"; 
export const createPdf = async (args) => {
    try {
        const response = await axiosInstance.get('/processdoc', {
            params: args,
            responseType: 'arraybuffer',
            headers: {
                Accept: 'application/pdf',
            }
        })
        // console.log(response.data)
        return response.data
    } catch (err) {
        // console.log(err)
        throw err
    }

}
export const listCerts = async () => {
    const listRef = ref(storage, 'certificates');
    try{
        const response = await listAll(listRef);
        const items = []
        response.items.forEach((itemRef) => {
            items.push(itemRef._location.path_.split('/')[1])
        });
        return items
    }catch(err){
        throw err
    }
    
}
