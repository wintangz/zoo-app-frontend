import * as axiosClient from "~/utils/axiosClient";
// import { tokens } from "../theme";

export const getUser = async () => {
    try {

        const res = await axiosClient.get('users')
        return res.data;
    } catch (error) {
        return error.response;
    }
}
export const getCustomers = async () => {
    try {

        const res = await axiosClient.get('users/customers')
        return res.data;
    } catch (error) {
        return error.response;
    }
}
export const getZooTrainer = async () => {
    try {

        const res = await axiosClient.get('users/zoo-trainers')
        return res.data;
    } catch (error) {
        return error.response;
    }
}

export const createStaff = async (values) => {
    try {

        const res = await axiosClient.post('users/staff', values)
        return res;
    } catch (error) {
        return error.response;
    }
}
export const createZooTrainer = async (values) => {
    try {

        const res = await axiosClient.post('users/zoo-trainers', values)
        return res;
    } catch (error) {
        return error.response;
    }
}
export const createCustomer = async (values) => {
    try {

        const res = await axiosClient.post('users/customers', values)
        return res;
    } catch (error) {
        return error.response;
    }
}

export const getUserById = async (values) => {
    try {

        const res = await axiosClient.get(`users/${values}`)
        return res.data;
    } catch (error) {
        return error.response;
    }
}
export const updateUser = async (id, values) => {
    try {

        const res = await axiosClient.put(`users/${id}`, values)
        return res;
    } catch (error) {
        return error.response;
    }
}
export const deleteUser = async (id) => {
    try {
        const res = await axiosClient.remove(`users/${id}`);
        return res.data
    } catch (error) {
        console.log(error.response);
        return error.response;
    }
}

export const logout = async (values) => {
    try {
        const res = await axiosClient.post('auth/logout', values)
        return res;
    } catch (error) {
        return error.response;
    }
}