import axios from 'axios';
import MemoryStorage from './memoryStorage';

const memoryStorageService = MemoryStorage.getService();

const axiosMurban = axios.create({withCredentials: true});

axiosMurban.interceptors.request.use(
    config => {
        const token = memoryStorageService.accessToken();
        if (token){
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    error => {
        console.log(error);
        Promise.reject(error);
    });

axiosMurban.interceptors.response.use((response) => {
    return response
}, function(error){
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry){
        originalRequest._retry = true;
        const refreshToken = memoryStorageService.refreshToken();
        return axiosMurban.post(process.env.REACT_APP_API+'refreshToken',
            {
                "refresh_token": refreshToken
            }).then(res => {
                if (res.status === 201) {
                    memoryStorageService.setAccessToken(res.data.access_token);
                    axiosMurban.defaults.headers.common['Authorization'] = 'Bearer ' + memoryStorageService.accessToken();
                    return axiosMurban(originalRequest)
                }
            }).catch(function(err){
                if (err.response && err.response.data){
                   var ret = err.response.data;
                   ret.type = "LoginTimeout";
                   console.log(ret);
                   return Promise.reject(ret);
                } else {
                   return Promise.reject(err);
                }
            });
    }
    return Promise.reject(error);
});

export default axiosMurban; 