import axios from "axios";
import jwtDecode from "jwt-decode";
const api = axios.create({
    // baseURL: 'http://192.168.1.229:8080/api/'
    baseURL: 'http://localhost:8080/api/'
})
export const get = async (path) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    const response = await api.get(path, config);
    return response.data
}

export const post = async (path, values) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    const response = await api.post(path, values, config);
    return response
}

export const put = async (path, values) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    const response = await api.put(path, values, config);
    return response;
}



export const decode = (token) => {
    return jwtDecode(token);
}

export default api;

