import React from 'react';
import authService from '../services/auth';

import {
    Button
} from 'react-bootstrap';

let windowObjectReference = null;
let previousUrl = null;

function AccountButton(){




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
           <Button 
    onClick={login}
	variant="primary"
>Login to Smartcar</Button>
        </div>
    );
}
export default AccountButton;
