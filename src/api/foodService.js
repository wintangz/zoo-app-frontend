import * as axiosClient from '~/utils/axiosClient';

export const getFood = async () => {
    try {
        const res = await axiosClient.get('foods')
        return res.data;
    } catch (error) {
        return error.response;
    }
}
export const getFoodById = async (id) => {
    try {
        const res = await axiosClient.get(`foods/${id}`);
        return res.data;
    } catch (error) {
        return error.response;
    }
}
export const createFood = async (values) => {
    try {

        const res = await axiosClient.post('foods', values);
        console.log(res);
        return res;

    } catch (error) {
        return error.response;
    }
}
export const updateFoods = async (id, values) => {
    try {

        const res = await axiosClient.put(`foods/${id}`, values);
        return res;
    } catch (error) {
        return error.response;
    }
}
export const deleteFoods = async (id) => {
    try {
        const res = await axiosClient.remove(`foods/${id}`);
        return res.data
    } catch (error) {
        console.log(error.response);
        return error.response;
    }
}