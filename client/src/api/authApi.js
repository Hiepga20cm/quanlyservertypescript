import axiosClient from "./axios";

const authApi = {
    login:async (data) => {
        const url = '/login';
        return axiosClient.post(url, data)
    },
    logout:async() =>{
        localStorage.clear();
        window.location.reload();
        alert('đăng xuất thành công');
       
    }

}

export default (authApi);