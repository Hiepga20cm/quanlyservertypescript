import axiosClient from "./axios";

const userApi = {
    getUsers: async () => {
        const url = '/user/getUsers';
        return axiosClient.get(url)
    },
    deleteUser: async (id) => {
        const url = `/user/${id}/deleteUser`;
        return axiosClient.delete(url);
    },
    createUser: async (data) => {
        const url = `/user/register`;
        return axiosClient.post(url, data);
    },
    getUser: async (id) => {
        const url = `/user/${id}/updateUser`;
        return axiosClient.get(url);
    },
    updateUser: async (data, id) => {
        const url = `/user/${id}/update`;
        return axiosClient.patch(url, data);
    }
}

export default (userApi);   
