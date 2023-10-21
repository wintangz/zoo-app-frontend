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

export const getEnclosuresById = async (values) => {
    try {

        const res = await axiosClient.get(`habitats/${values}`)
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

export const getAllDiet = async () => {
    try {
        const res = await axiosClient.get('diets')
        return res.data;
    } catch (error) {
        return error.response;
    }
}

export const createFeedingSchedule = async (values) => {
    try {
        const res = await axiosClient.post('feeding_schedules', values)
        return res.data;
    } catch (error) {
        return error.response;
    }
}

export const getAllSchedule = async (values) => {
    try {
        const res = await axiosClient.get('feeding_schedules')
        return res.data;
    } catch (error) {
        return error.response;
    }
}

export const conFirm = async (path, values) => {
    try {
        const res = await axiosClient.put(`feeding_schedules/${path}/confirmation`, values)
        return res.data;
    } catch (error) {
        return error.response;
    }
}
