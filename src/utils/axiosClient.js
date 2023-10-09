import axios from "axios";
import jwtDecode from "jwt-decode";
const api = axios.create({
    baseURL: 'http://localhost:8080/api/'
})
export const get = async (path, options = {}) => {
    const response = await api.get(path, options = {});
    return response.data
}

export const post = async (path, options = {}) => {
    const response = await api.post(path, options = {});
    return response.data
}

export const decode = (token) => {
    return jwtDecode(token);
}

export default api;

