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
    getLocation,
	getVin,
	getBattery,
	getOdometer,
	getVehicleAttributes,
	getTirePressure,
	getFuel,
	getCharge,
	getPermissions,
	controlCharge,
	controlSecurity,
	getEngineOil,
	getBatteryCapacity
};


export function getVin(accessToken, id){
    return new Promise(function(resolve, reject){
        var url = process.env.NEXT_PUBLIC_API_SERVICE + 'smartcar/vehicles/' + id + '/vin';
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

export function getBattery(accessToken, id){
    return new Promise(function(resolve, reject){
        var url = process.env.NEXT_PUBLIC_API_SERVICE + 'smartcar/vehicles/' + id + '/battery';
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


export function getOdometer(accessToken, id){
    return new Promise(function(resolve, reject){
        var url = process.env.NEXT_PUBLIC_API_SERVICE + 'smartcar/vehicles/' + id + '/odometer';
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

export function getVehicleAttributes(accessToken, id){
    return new Promise(function(resolve, reject){
        var url = process.env.NEXT_PUBLIC_API_SERVICE + 'smartcar/vehicles/' + id;
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

export function getTirePressure(accessToken, id){
    return new Promise(function(resolve, reject){
        var url = process.env.NEXT_PUBLIC_API_SERVICE + 'smartcar/vehicles/' + id + '/tires/pressure';
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

export function getFuel(accessToken, id){
    return new Promise(function(resolve, reject){
        var url = process.env.NEXT_PUBLIC_API_SERVICE + 'smartcar/vehicles/' + id + '/fuel';
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

export function getCharge(accessToken, id){
    return new Promise(function(resolve, reject){
        var url = process.env.NEXT_PUBLIC_API_SERVICE + 'smartcar/vehicles/' + id + '/charge';
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

export function getPermissions(accessToken, id){
    return new Promise(function(resolve, reject){
        var url = process.env.NEXT_PUBLIC_API_SERVICE + 'smartcar/vehicles/' + id + '/permissions';
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


export function controlCharge(accessToken, id, body){
    return new Promise(function(resolve, reject){
        var url = process.env.NEXT_PUBLIC_API_SERVICE + 'smartcar/vehicles/' + id + '/charge';
        var bearerToken = "Bearer " + accessToken;
        var headers = {
            "Authorization" : bearerToken
        };
        var options = {
            method: 'POST',
            url: url,
            headers: headers,
			data: body
        };
        axios(options).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        }); 
    });
}

export function controlSecurity(accessToken, id, body){
    return new Promise(function(resolve, reject){
        var url = process.env.NEXT_PUBLIC_API_SERVICE + 'smartcar/vehicles/' + id + '/security';
        var bearerToken = "Bearer " + accessToken;
        var headers = {
            "Authorization" : bearerToken
        };
        var options = {
            method: 'POST',
            url: url,
            headers: headers,
			data: body
        };
        axios(options).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        }); 
    });
}


export function getEngineOil(accessToken, id){
    return new Promise(function(resolve, reject){
        var url = process.env.NEXT_PUBLIC_API_SERVICE + 'smartcar/vehicles/' + id + '/engine/oil';
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

export function getBatteryCapacity(accessToken, id){
    return new Promise(function(resolve, reject){
        var url = process.env.NEXT_PUBLIC_API_SERVICE + 'smartcar/vehicles/' + id + '/battery/capacity';
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


export default smartcar;


