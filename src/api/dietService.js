import * as axiosClient from '~/utils/axiosClient';

export const getDiet = async () => {
    try {
        const res = await axiosClient.get('diets')
        return res.data;
    } catch (error) {
        return error.response;
    }
}
export const getDietById = async (id) => {
    try {
        const res = await axiosClient.get(`diets/${id}`);
        return res.data;
    } catch (error) {
        return error.response;
    }
}
export const createDiet = async (values) => {
    try {

        const res = await axiosClient.post('diets', values);
        return res.data;
    } catch (error) {
        return error.response;
    }
}
export const updateDiets = async (id, values) => {
    try {
        console.log(id)
        console.log(values)

        const res = await axiosClient.put(`diets/${id}`, values);
        return res;
    } catch (error) {
        console.log(error)
    }
}
export const deleteDiets = async (id) => {
    try {
        const res = await axiosClient.remove(`diets/${id}`);
        return res.data
    } catch (error) {
        console.log(error.response);
        return error.response;
    }
}