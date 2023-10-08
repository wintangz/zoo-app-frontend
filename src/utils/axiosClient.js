import axios from "axios";

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

export default api;

