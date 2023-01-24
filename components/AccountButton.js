import React from 'react';
import authService from '../services/auth';

let windowObjectReference = null;
let previousUrl = null;

function AccountButton(){

    const getAuthUrl = () => {
        var url =
        "https://connect.smartcar.com/oauth/authorize?" +
        "response_type=code" +
        "&client_id=" + "5aa617fd-e31c-42de-a10f-b6c9ff903138" +
        "&scope=read_odometer read_vehicle_info required:read_location" +
        "&redirect_uri=" + process.env.NEXT_PUBLIC_HOME + "exchange" +
        "&state=0facda3q3q3q3q19" +
        "&mode=test" 
        return url;
    }
    const login = () => {
        console.log("login");
        //var url = getAuthUrl();
        authService.getAuthUrl().then(function(result){
            console.log(result);
            window.location.href = result.authUrl;
        }).catch(function(err){
            console.log(err);
        });
    }

    return(
        <div>
            <button onClick={login}>Login to Smartcar</button>
        </div>
    );
}
export default AccountButton;
