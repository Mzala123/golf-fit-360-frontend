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
export function getAllCustomers(page, limit, searchQuery,sort){
    return http.get(`/customers?page=${page}&limit=${limit}&search=${searchQuery}&sort=${sort}`,{
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

export function readOneGolfClubMessage(messageId){
    return http.get(`/golfClubMessage/${messageId}`, {
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${getCookie("access_token")}`},
    })
}

export function updateGolfClubMessage(messageId, body){
    return http.put(`/golfClubMessage/${messageId}`, body,{
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${getCookie("access_token")}`},
    })
}


export function getListFittingRequests(page, limit, searchQuery,sort){
    return http.get(`/fittingRequest?page=${page}&limit=${limit}&search=${searchQuery}&sort=${sort}`, {
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

export function getfittingRequestSchedules(page, limit, searchQuery,sort){
    return http.get(`/fittingRequestSchedules?page=${page}&limit=${limit}&search=${searchQuery}&sort=${sort}`, {
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${getCookie("access_token")}`},
    })
}

export function getfittingRequestHistory(page, limit, searchQuery,sort){
    return http.get(`/fittingRequestHistory?page=${page}&limit=${limit}&search=${searchQuery}&sort=${sort}`, {
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${getCookie("access_token")}`},
    })
}

export function performFittingTask(taskId, body){
    return http.put(`/performFittingTask/${taskId}`,body, {
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${getCookie("access_token")}`},
    })
}

export function scheduleFittingRequest(body){
    return http.post(`/fittingRequest`,body, {
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${getCookie("access_token")}`},
    })
}



export function readCustomerFittings(){
    return http.get(`/readCustomerFittings`, {
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${getCookie("access_token")}`},
    })
}

export function viewFittingProgressList(){
    return http.get(`/viewFittingProgressList`, {
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${getCookie("access_token")}`},
    })
}

export function viewFittingTaskProgressList(fittingId){
    return http.get(`/viewFittingTaskProgressList/${fittingId}`, {
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${getCookie("access_token")}`},
    })
}

export function getAvailableFittingRequestDateTime(){
    return http.get(`/getAvailableFittingRequestDateTime`, {
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${getCookie("access_token")}`},
    })
}

export function cancelFittingRequestsTasks(fittingId){
    return http.put(`/cancelFittingRequestsTasks/${fittingId}`, {
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${getCookie("access_token")}`},
    })
}



