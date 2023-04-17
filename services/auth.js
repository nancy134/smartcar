import axios from 'axios';
import axiosMurban from './axiosMurban';


export function getSmartcarTokens(body){
    return new Promise(function(resolve, reject){
        var url = process.env.NEXT_PUBLIC_API_SERVICE + 'smartcar/auth';
        
        axios.post(url, body).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });        
    });
}

export function getAuthUrl(){
    return new Promise(function(resolve, reject){
        var url = process.env.NEXT_PUBLIC_API_SERVICE + 'smartcar/authUrl';
        var options = {
            method: 'GET',
            url: url
        };
        console.log("url: "+url);
        axios(options).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}
 

export function signin(params){
    return new Promise(function(resolve, reject){
        var url = process.env.NEXT_PUBLIC_API_SERVICE +"signin";
        var options = {
            method: 'POST',
            url: url,
            data: params
        };
        axiosMurban(options).then(function(resp){
            resolve(resp.data);
        }).catch(function(err){
            if (err && err.response && err.response.data){
                reject(err.response.data);
            } else {
                reject(err);
            }
        });
    });
}

export function refreshToken(params){
    return new Promise(function(resolve, reject){
        var url = process.env.NEXT_PUBLIC_API_SERVICE + "refreshToken";
        var options = {
            method: 'POST',
            url: url,
            data: params
        };
        axiosMurban(options).then(function(resp){
            resolve(resp.data);
        }).catch(function(err){
            if (err && err.response && err.response.data){
                reject(err.response.data);
            } else {
                reject(err);
            }
        });
    });
}

export function signup(params){
    return new Promise(function(resolve, reject){
        var url = process.env.NEXT_PUBLIC_API_SERVICE+"signup";
        var options = {
            method: 'POST',
            url: url,
            data: params
        };
        axiosMurban(options).then(function(resp){
            resolve(resp.data);
        }).catch(function(err){
            if (err && err.response && err.response.data){
                reject(err.response.data);
            } else {
                reject(err);
            }
        });
    });
}

export function confirm(params){
    return new Promise(function(resolve, reject){
        var url = process.env.NEXT_PUBLIC_API_SERVICE+"confirmSignUp";
        var options = {
            method: 'POST',
            url: url,
            data: params
        };
        axiosMurban(options).then(function(resp){
            resolve(resp.data);
        }).catch(function(err){
            if (err && err.response && err.response.data){
                reject(err.response.data);
            } else {
                reject(err);
            }
        });
    });
}

export function resendConfirmationCode(params){
    return new Promise(function(resolve, reject){
        var url = process.env.NEXT_PUBLIC_API_SERVICE+"resendConfirmationCode";
        var options = {
            method: 'POST',
            url: url,
            data: params
        };
        axiosIMurban(options).then(function(resp){
            resolve(resp.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function forgotPassword(params){
    return new Promise(function(resolve, reject){
        var url = process.env.NEXT_PUBLIC_API_SERVICE+"forgotPassword";
        var options = {
            method: 'POST',
            url: url,
            data: params
        };
        axiosMurban(options).then(function(resp){
            resolve(resp.data);
        }).catch(function(err){
            if (err && err.response && err.response.data){
                reject(err.response.data);
            } else {
                reject(err);
            }
        });
    });
}

export function confirmForgotPassword(params){
    return new Promise(function(resolve, reject){
        var url = process.env.NEXT_PUBLIC_API_SERVICE + "confirmForgotPassword";
        var options = {
            method: 'POST',
            url: url,
            data: params
        };
        axiosMurban(options).then(function(resp){
            resolve(resp);
        }).catch(function(err){
            if (err && err.response && err.response.data){
                reject(err.response.data);
            } else {
                reject(err);
            }
        });
    });
}

const auth = {
    getSmartcarTokens,
    getAuthUrl
};
export default auth;


