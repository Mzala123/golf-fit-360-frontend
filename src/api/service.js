import axios from "axios";
const http = axios.create({
    baseURL: 'http://localhost:3000/api/',
})

http.interceptors.response.use((response)=>{
        return response;
}, (error)=>{

    if(error.response){
        switch(error.response.status){
            case 401:
                 window.location.href=`/?error=${error.response.data.message || "Unauthorized Error"}`;
                break;
            default:
                break;
        }
    }
    return Promise.reject(error);
})
export default http