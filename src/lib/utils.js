export function isPrimary(key) {
    return key !== '+' ? key : false
}

export default function queryToStringObject(queryString) {
    return Object.fromEntries(new URLSearchParams(queryString))
}


export function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/`;
}

export function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith(nameEQ)) {
            return decodeURIComponent(cookie.substring(nameEQ.length));
        }
    }
    return null;
}

export function getAccountName(session){
    if(session.user.usertype === "ADMIN"){
      return `${session.admin.firstname} ${session.admin.lastname}`;
    }else if(session.user.usertype === "CUSTOMER"){
        return `${session.customer.firstname} ${session.customer.lastname}`;
    }
    return "Guest"
}