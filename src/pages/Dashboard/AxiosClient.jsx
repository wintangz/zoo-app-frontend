import axios from "axios";
import jwtDecode from "jwt-decode";

const axiosClient = axios.create({
    baseURL: 'https://zoo-by-valt-be.azurewebsites.net/api/'
    // baseURL: 'http://localhost:8080/api/'
})

export const get = async (path) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    const response = await axiosClient.get(path, config);
    return response.data
}

export const post = async (path, values) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    const response = await axiosClient.post(path, values, config);
    return response
}

export const put = async (path, values) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    const response = await axiosClient.put(path, values, config);
    return response;
}

export const remove = async (path) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };
    const response = await axiosClient.delete(path, config);
    return response;
};

export const decode = (token) => {
    return jwtDecode(token);
}

export default axiosClient