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
  const [vin, setVin] = useState(null);
  const [percentRemaining, setPercentRemaining] = useState(null);
  const [range, setRange] = useState(null);
  const [distance, setDistance] = useState(null);
  const [id, setId] = useState(null);
  const [make, setMake] = useState(null);
  const [model, setModel] = useState(null);
  const [year, setYear] = useState(null);
  const [frontLeft, setFrontLeft] = useState(null);
  const [frontRight, setFrontRight] = useState(null);
  const [backLeft, setBackLeft] = useState(null);
  const [backRight, setBackRight] = useState(null);
  const [amountRemaining, setAmountRemaining] = useState(null);


    const [amountRemainingFuel, setAmountRemainingFuel] = useState(null);
    const [percentRemainingFuel, setPercentRemainingFuel] = useState(null);
    const [rangeFuel, setRangeFuel] = useState(null);
  

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

  const onGetVin = () => {
    smartcarService.getVin(accessToken, vehicle).then(function(result){
        setVin(result.vin);
        console.log(result);
    }).catch(function(err){
        console.log(err);
    });
  }
  

  const onGetBattery = () => {
    smartcarService.getBattery(accessToken, vehicle).then(function(result){
        setPercentRemaining(result.percentRemaining);
        setRange(result.range);
        console.log(result);
    }).catch(function(err){
        console.log(err);
    });
  }
  
  const onGetOdometer = () => {
    smartcarService.getOdometer(accessToken, vehicle).then(function(result){
        setDistance(result.distance);
        console.log(result);
    }).catch(function(err){
        console.log(err);
    });
  }

  
  const onGetVehicleAttributes = () => {
    smartcarService.getVehicleAttributes(accessToken, vehicle).then(function(result){
        setId(result.id);
		setMake(result.make);
		setModel(result.model);
		setYear(result.year);
        console.log(result);
    }).catch(function(err){
        console.log(err);
    });
  }

  const onGetTirePressure = () => {
    smartcarService.getTirePressure(accessToken, vehicle).then(function(result){
        setFrontLeft(result.frontLeft);
		setFrontRight(result.frontRight);
		setBackLeft(result.backLeft);
		setBackRight(result.backRight);
        console.log(result);
    }).catch(function(err){
        console.log(err);
    });
  }


  const onGetFuel = () => {
    smartcarService.getFuel(accessToken, vehicle).then(function(result){
        setAmountRemainingFuel(result.amountRemaining);
		setPercentRemainingFuel(result.percentRemaining);
		setRangeFuel(result.range);
        console.log(result);
    }).catch(function(err){
        console.log(err);
    });
  }



  const onStartOver = () => {
      window.location.href = "https://localhost:3000";
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

      <button onClick={onGetVin}>Get Vin</button>
      <p>VIN: {vin}</p>


      <button onClick={onGetBattery}>Get Battery</button>
      <p>Percent Remaining: {percentRemaining}</p>
	  <p>Range: {range}</p>


      <button onClick={onGetOdometer}>Get Odometer</button>
      <p>Distance: {distance}</p>

      <button onClick={onGetVehicleAttributes}>Get Vehicle Attributes</button>
      <p>Id: {id}</p>      
	  <p>Make: {make}</p>
	  <p>Model: {model}</p>
	  <p>Year: {year}</p>

      <button onClick={onGetTirePressure}>Get TirePressure</button>
      <p>Front Left: {frontLeft}</p>      
	  <p>Front Right: {frontRight}</p>
	  <p>Back Left: {backLeft}</p>
	  <p>Back Right: {backRight}</p>

      <button onClick={onGetFuel}>Get Fuel</button>
      <p>Amount Fuel Remaining: {amountRemainingFuel}</p>      
	  <p>Percent Fuel Remaining: {percentRemainingFuel}</p>
	  <p>Range Fuel: {rangeFuel}</p>

      <button onClick={onStartOver}>Start Over</button>
    </>
  );
}


