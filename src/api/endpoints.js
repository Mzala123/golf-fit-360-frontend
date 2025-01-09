import http from "./service.js";
import {getCookie} from "../lib/utils.js";

export function registerCustomer(body){
    return http.post('/registerCustomer', body);
}

export function registerAdmin(body){
  return http.post('/registerAdmin', body);
}

export function loginUser(body){
    return http.post('/login', body);
}

//start customer endpoints
export function getAllCustomers(){
    return http.get('/customers',{
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${getCookie("access_token")}`},
    } );
}

export function getOneCustomer(customerId){
    return http.get(`/customers/${customerId}`, {
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${getCookie("access_token")}`},
    });
}

export function updateCustomer(customerId, body){
    return http.put(`/customers/${customerId}`, body, {
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${getCookie("access_token")}`},
    });
}
// end customer endpoints

export function getStartedMessage(){
    return http.get(`/readGettingStartedMessage`, {
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${getCookie("access_token")}`},
    })
}

export function getListFittingRequests(){
    return http.get(`/fittingRequest`, {
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${getCookie("access_token")}`},
    })
}

export function getOneFittingRequests(fittingId){
    return http.get(`/fittingRequest/${fittingId}`, {
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${getCookie("access_token")}`},
    })
}

export function getFittingRequestTasksList(fittingId){
    return http.get(`/fittingRequestTasks/${fittingId}`, {
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${getCookie("access_token")}`},
    })
}

export function performFittingTask(taskId, body){
    return http.put(`/performFittingTask/${taskId}`,body, {
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${getCookie("access_token")}`},
    })
}