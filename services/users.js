import axiosMurban from './axiosMurban'

;

export function getUser(){
    return new Promise(function(resolve, reject){
        var url = process.env.NEXT_PUBLIC_API_SERVICE + 'user/me';
        var options = {
            method: 'GET',
            url: url
        };
        axiosMurban(options).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

const users = {
    getUser
};

export default users;
