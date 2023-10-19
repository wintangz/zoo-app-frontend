import * as axiosClient from '~/utils/axiosClient';

export const getAnimals = async () => {
    try {
        const res = await axiosClient.get('species')
        return res.data;
    } catch (error) {
        return error.response;
    }
}
export const getEnclosures = async () => {
    try {
        const res = await axiosClient.get('enclosures')
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const getHabitats = async () => {
    try {
        const res = await axiosClient.get('habitats')
        return res.data;
    } catch (error) {
        return error.response;
    }
}

export const createAnimals = async (values) => {
    try {
        const res = await axiosClient.post('animals', values)
        return res.data;
    } catch (error) {
        return error.response;
    }
}

export const getAllAnimals = async () => {
    try {
        const res = await axiosClient.get('animals')
        return res.data;
    } catch (error) {
        return error.response;
    }
}
export const assignZooTrainerToAnimal = async (values, path) => {
    try {
        const res = await axiosClient.post(path, values)
        return res.data;
    } catch (error) {
        return error.response;
    }
}