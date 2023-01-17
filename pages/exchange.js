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
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [expiration, setExpiration] = useState(null);
  const [refreshExpiration, setRefreshExpiration] = useState(null);
  const [vehicles, setVehicles] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
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
          setLoading(false);
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
          setVehicles(result);
          if (result.vehicles && result.vehicles[0]){
              setVehicle(result.vehicles[0]);
          }
      }).catch(function(err){
          console.log(err);
      });
  }

  const onGetLocation = () => {
      smartcarService.getLocation(accessToken, vehicle).then(function(result){
          setLatitude(result.latitude);
          setLongitude(result.longitude);
          console.log(result);
      }).catch(function(err){
          console.log(err);
      });
  }

  const onStartOver = () => {
      window.location.href = "https://local.phowma.com";
  }
  return (
    <>
      <h1>Smartcar functions</h1>
      <p>access token: {accessToken}</p>
      <p>refresh token: {refreshToken}</p>
      <p>expiration: {expiration}</p>
      <p>refreshExpiration: {refreshExpiration}</p>
      <button onClick={onGetVehicles}>Get Vehicles</button>
      <p>{ vehicle }</p>
      <button onClick={onGetLocation}>Get Location</button>
      <p>latitude: {latitude} longitude: {longitude}</p>
      <button onClick={onStartOver}>Start Over</button>
    </>
  );
}

