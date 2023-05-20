import moment from "moment"
export const convertDateTimeToString = (datetime) =>{
    return moment(datetime).format('YYYY-MM-DD')
}
export const convertDateTimeToString2 = (datetime) =>{
    return moment(datetime).format('DD-MM-YYYY')
}
export const formatDate = (datetime) =>{
    return moment(datetime).format('YYYY')
}