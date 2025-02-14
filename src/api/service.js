import axios from "axios";
import {toast} from "sonner";
import * as response from "autoprefixer";


const http = axios.create({
    baseURL: 'http://localhost:3000/api/',
})

http.interceptors.response.use((response)=>{
        return response;
}, (error)=>{

    if(error.response){
        switch(error.response.status){
            case 401:
                toast.error(response.data.message || "Incorrect credentials");
                 window.location.href="/?error=Your session has expired, please login";
                break;
            default:
                break;
        }
    }
    return Promise.reject(error);
})
export default http