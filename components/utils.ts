import axios from "axios";

export const backendUrl = 'http://localhost:3545';
export const addUser = axios.create ({
    baseURL: backendUrl,
    headers: {
        accept: 'application/json',
    }       
})
export const withCookies = axios.create ({
    withCredentials: true,
    baseURL: backendUrl,
    headers: {
        accept: 'application/json',
    }       
})
withCookies.interceptors.request.use((config)=>{
    if(config.headers) {
        config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    } 
    return config
})
// export const setAuthToken = (token: string | null) => {
//     if(token){
//         innerBackend.defaults.headers.common['Authorization'] = 'Bearer '+token;
//     } 
// }