import * as axiosClient from '~/utils/axiosClient';

export const loginUser = async (loginData) => {
    try {
        const response = await axiosClient.post('auth/login', loginData);
        return response.data;
    } catch (error) {
        return error.response;
    }
};
export const registerUser = async (userData) => {
    try {
        const res = await axiosClient.post('users/customers', userData)
        console.log(res);
        return res.data;

    } catch (error) {
        return error.response;
    }
}

export const sentEmail = async (values) => {
    try {

        const res = await axiosClient.post('users/password-reset/email', values)
        console.log(res);
        return res.data;
    } catch (error) {
        console.log(error)
        return error.response;
    }
}

export const verificationCode = async (values) => {
    try {

        const res = await axiosClient.post('users/password-reset/verification-code', values)
        console.log(res);
        return res.data;
    } catch (error) {
        console.log(error)
        return error.response;
    }
}

export const resetPassword = async (values) => {
    try {

        const res = await axiosClient.post('users/password-reset', values)
        console.log(res);
        return res.data;
    } catch (error) {
        console.log(error)
        return error.response;
    }
}