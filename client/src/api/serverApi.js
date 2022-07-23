import axiosClient from "./axios";

const serverApi = {
    getSever: async () => {
        const url = '/';
        return axiosClient.get(url);
    },

    createServer: async (data) => {
        const url = '/server/store';
        return axiosClient.post(url, data);
    },

    editServer: async (data, id) => {

        const url = `/server/${id}`;
        return axiosClient.patch(url, data);
    },
    //getServerToEdit
    edit: async (id) => {
        const url = `/server/${id}/edit`;
        return axiosClient.get(url);
    },
    destroyServer: async (id) => {
        const url = `/server/delete/${id}`;
        return axiosClient.patch(url);
    },
    restoreServer: async (id) => {
        const url = `/server/${id}/restore`;
        return axiosClient.patch(url);
    },
    deleteInDatabase: async (id) => {
        const url = `/server/${id}/deleteindatabase`;
        return axiosClient.delete(url);
    },
    storedServer: async () => {
        const url = `/me/stored/server`;
        return axiosClient.get(url);
    },
    getTrashServer: async () => {
        const url = `/me/trash/server`;
        return axiosClient.get(url);
    },
    search :async (serverName) =>{
        const url = `/search/${serverName}`;
        return axiosClient.get(url);
    }

}
export default (serverApi);