import authService from '../services/auth';
import smartcarService from '../services/smartcar';

import { 
    useRouter,
} from 'next/router';
import {
    useState,
    useEffect
} from 'react';

// pages/exchange.js
export default function Exchange() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [expiration, setExpiration] = useState(null);
  const [refreshExpiration, setRefreshExpiration] = useState(null);
  const [vehicles, setVehicles] = useState(null);

  useEffect(() => {
      if (router.isReady){
          onGetTokens();
      } else {
          return;
      }
  },[router.isReady]);

  const onGetTokens = () => {
      var body = {
          code: router.query.code 
      }
      authService.getSmartcarTokens(body).then(function(result){
          setLoading(true);
          setAccessToken(result.accessToken);
          setRefreshToken(result.refreshToken);
          setExpiration(result.expiration);
          setRefreshExpiration(result.refreshExpiration);
          console.log(result);
      }).catch(function(err){
          console.log(err);
      });
  }

  const onGetVehicles = () => {
      smartcarService.getVehicles(accessToken).then(function(result){
          console.log(result);
          //setVehicles(result);
      }).catch(function(err){
          console.log(err);
      });
  }

  return (
    <div>
      <h1>Login page</h1>
      <p>
          Go to this page after logging in
      </p>
      { loading ?
      <p>authenticating</p>
      :
      <p>authenticated</p>
      }
      <button onClick={onGetVehicles}>Get Vehicles</button>
      { vehicles }
     
    <div/>
  );
}

