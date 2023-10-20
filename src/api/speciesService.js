import * as axiosClient from '~/utils/axiosClient';

export const getSpecies = async () => {
    try {
        const res = await axiosClient.get('species')
        return res.data;
    } catch (error) {
        return error.response;
    }
}
export const getSpeciesById = async (id) => {
    try {
        const res = await axiosClient.get(`species/${id}`);
        return res.data;
    } catch (error) {
        return error.response;
    }
}
export const createSpecies = async (values) => {
    try {

        const res = await axiosClient.post('species', values);
        return res;
    } catch (error) {
        return error.response;
    }
}
export const updateSpecies = async (id, values) => {
    try {

        const res = await axiosClient.put(`species/${id}`, values);
        return res;
    } catch (error) {
        return error.response;
    }
}
export const deleteSpecies = async (id) => {
    try {
        const res = await axiosClient.remove(`species/${id}`);
        return res.data
    } catch (error) {
        console.log(error.response);
        return error.response;
    }
}