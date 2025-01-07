import http from "./service.js";


export function registerUser(body){
    return http.post('/register', body);
}

export function loginUser(body){
    return http.post('/login', body);
}

export function getAllCustomers(){
    return http.get('/user_customer');
}