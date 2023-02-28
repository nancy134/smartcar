import axios from 'axios';

export function getPlace(lat, long){
    return new Promise(function(resolve, reject){
        var url = process.env.NEXT_PUBLIC_API_SERVICE + 'smartcar/google/places/?lat='+lat+'&long='+long; 

        var options = {
            method: 'GET',
            url: url
        };
        axios(options).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

const google = {
    getPlace
};

export default google;
