import request from '../utils/request.ts'

export const getGal = (value: string) => {
    return request.get('/search/getGal', {
        params:{
            search: value
        }
    });
}