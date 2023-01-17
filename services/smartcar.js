import axios from 'axios';

export function getVehicles(accessToken){
    return new Promise(function(resolve, reject){
        var url = process.env.NEXT_PUBLIC_API_SERVICE + 'smartcar/vehicles';
        var bearerToken = "Bearer " + accessToken;
        var headers = {
            "Authorization" : bearerToken 
        }
        var options = {
            method: 'GET',
            url: url,
            headers: headers
        }; 
        axios(options).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });        
    });
}

export function getLocation(accessToken, id){
    return new Promise(function(resolve, reject){
        var url = process.env.NEXT_PUBLIC_API_SERVICE + 'smartcar/vehicles/' + id + '/location';
        var bearerToken = "Bearer " + accessToken;
        var headers = {
            "Authorization" : bearerToken
        };
        var options = {
            method: 'GET',
            url: url,
            headers: headers
        };
        axios(options).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        }); 
    });
}
 
const smartcar = {
    getVehicles,
    getLocation
};
export default smartcar;


