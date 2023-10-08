import * as request from '~/utils/request'

export const getHabitat = async () => {
    try {
        const res = await request.get('habitat')
        return res.data;    
    } catch (error) {
        console.log(error);
    }
}