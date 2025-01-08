export function isPrimary(key) {
    return key !== '+' ? key : false
}

export default function queryToStringObject(queryString) {
    return Object.fromEntries(new URLSearchParams(queryString))
}