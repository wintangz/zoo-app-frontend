import axios from "axios";

const api = axios.create({
    // baseURL: 'http://192.168.2.120:8080/api/'
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

export default api;

