import * as axiosClient from '~/utils/axiosClient';

//Animal
export const getAnimals = async () => {
    try {
        const res = await axiosClient.get('species')
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

//Enclosure
export const getEnclosures = async () => {
    try {
        const res = await axiosClient.get('enclosures')
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const createEnclousures = async (values) => {
    try {
        const res = await axiosClient.post('enclosures', values);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
}

export const getEnclosuresById = async (values) => {
    try {

        const res = await axiosClient.get(`enclosures/${values}`)
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const updateEnclosures = async (id, values) => {
    try {
        const res = await axiosClient.put(`enclosures/${id}`, values);
        return res;
    } catch (error) {
        return error.response;
    }
}

//Habitat
export const getHabitats = async () => {
    try {
        const res = await axiosClient.get('habitats')
        return res.data;
    } catch (error) {
        return error.response;
    }
}

export const getHabitatById = async (id) => {
    try {
        const res = await axiosClient.get(`habitats/${id}`);
        return res.data;
    } catch (error) {
        return error.response;
    }
}

export const createHabitats = async (values) => {
    try {
        const res = await axiosClient.post('habitats', values);
        // console.log(res);
        return res;
    } catch (error) {
        return error.response;
    }
}

export const updateHabitats = async (id, values) => {
    try {
        const res = await axiosClient.put(`habitats/${id}`, values);
        return res;
    } catch (error) {
        return error.response;
    }
}

export const assignZooTrainerToAnimal = async (values, path) => {
    try {
        const res = await axiosClient.post(path, values)
        return res;
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

export const moveInEnclosure = async (path, path2) => {
    try {
        const res = await axiosClient.post(`animals/${path}/enclosures/${path2}`)
        return res.data;
    } catch (error) {
        return error.response;
    }
}

export const moveOutEnclosure = async (path, path2) => {
    try {
        const res = await axiosClient.put(`animals/${path}/enclosures/${path2}`)
        return res.data;
    } catch (error) {
        return error.response;
    }
}
export const deleteHabitats = async (id) => {
    try {
        const res = await axiosClient.remove(`habitats/${id}`);
        return res.data
    } catch (error) {
        console.log(error.response);
        return error.response;
    }
}
export const deleteEnclosure = async (id) => {
    try {
        const res = await axiosClient.remove(`enclosures/${id}`);
        return res.data
    } catch (error) {
        console.log(error.response);
        return error.response;
    }
}

export const getEnclosuresAnimals = async () => {
    try {
        const res = await axiosClient.get('animals/enclosures')
        return res.data;
    } catch (error) {
        return error.response;
    }
}
export const deleteAnimals = async (id) => {
    try {
        const res = await axiosClient.remove(`animals/${id}`);
        return res.data
    } catch (error) {
        console.log(error.response);
        return error.response;
    }
}
export const deleteSchedules = async (id) => {
    try {
        const res = await axiosClient.remove(`feeding_schedules/${id}`);
        return res.data
    } catch (error) {
        console.log(error.response);
        return error.response;
    }
}

export const updateAnimal = async (path, values) => {
    try {
        const res = await axiosClient.put(`animals/${path}`, values)
        return res;
    } catch (error) {
        return error.response;
    }
}