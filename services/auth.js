import axios from 'axios';

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
 
const auth = {
    getSmartcarTokens,
    getAuthUrl
};
export default auth;


