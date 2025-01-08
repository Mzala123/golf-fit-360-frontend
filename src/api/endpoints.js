import http from "./service.js";

export function registerCustomer(body){
    return http.post('/registerCustomer', body);
}

export function registerAdmin(body){
  return http.post('/registerAdmin', body);
}

export function loginUser(body){
    return http.post('/login', body);
}


export function getAllCustomers(){
    return http.get('/customers');
}

export function getOneCustomer(customerId){
    return http.get(`/customers/${customerId}`);
}

export function updateCustomer(customerId, body){
    return http.put(`/customers/${customerId}`, body);
}