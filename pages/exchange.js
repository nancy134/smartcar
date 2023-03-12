import authService from '../services/auth';
import smartcarService, { getLocation, getUser } from '../services/smartcar';
import googleService from '../services/google';
import AccountButton from '../components/AccountButton';

import {
    Button,
    Card,
    Form,
    Container,
    Navbar,
    Nav
} from 'react-bootstrap';

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
    const [initialized, setInitialized] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [expiration, setExpiration] = useState(null);
    const [refreshExpiration, setRefreshExpiration] = useState(null);
    const [vehicles, setVehicles] = useState(null);
    const [vehicle, setVehicle] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [placeName, setPlaceName] = useState(null);
    const [placeType, setPlaceType] = useState(null);
    const [placeBusinessStatus, setPlaceBusinessStatus] = useState(null);
    const [placeId, setPlaceId] = useState(null);
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
    const [isPluggedIn, setIsPluggedIn] = useState(null);
    const [chargeState, setChargeState] = useState(null);
    const [permissions, setPermissions] = useState(null);
    const [chargeStatus, setChargeStatus] = useState(null);
    const [securityStatus, setSecurityStatus] = useState(null);
    const [oilLifeRemaining, setOilLifeRemaining] = useState(null);
    const [batteryCapacity, setBatteryCapacity] = useState(null);
    const [userId, setUserId] = useState(null);
    const [direction, setDirection] = useState(null);
    const [amperage, setAmperage] = useState(null);

    // Permissions
    const [readCompass, setReadCompass] = useState(null);
    const [readEngineOil, setReadEngineOil] = useState(null);
    const [readBattery, setReadBattery] = useState(null);
    const [readCharge, setReadCharge] = useState(null);
    const [controlCharge, setControlCharge] = useState(null);
    const [readThermometer, setReadThermometer] = useState(null);
    const [controlSecurity, setControlSecurity] = useState(null);
    const [readFuel, setReadFuel] = useState(null);
    const [readLocation, setReadLocation] = useState(null);
    const [readOdometer, setReadOdometer] = useState(null);
    const [readVehicleInfo, setReadVehicleInfo] = useState(null);
    const [readVin, setReadVin] = useState(null);
    const [readSpeedometer, setReadSpeedometer] = useState(null);
    const [readTires, setReadTires] = useState(null);
    const [vehicleMakes, setVehicleMakes] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [isCarSelected, setIsCarSelected] = useState(null);


    useEffect(() => {
    const onGetTokens = () => {
        var body = {
            code: router.query.code
        }
        authService.getSmartcarTokens(body).then(function(result1){
            setAccessToken(result1.accessToken);
            setRefreshToken(result1.refreshToken);
            setExpiration(result1.expiration);
            setRefreshExpiration(result1.refreshExpiration);
            setIsLoggedIn(true);
            console.log(result1);
            smartcarService.getVehicles(result1.accessToken).then(function(result2){
                console.log(result2);
                setVehicles(result2.vehicles);
                if (result2.vehicles && result2.vehicles[0]){
                    getMakes(result1.accessToken, result2.vehicles).then(function(makes){console.log(makes);
                        setVehicle(result2.vehicles[0]);
                        setVehicleMakes(makes);
                        setIsCarSelected(true);
                        smartcarService.getPermissions(result1.accessToken, result2.vehicles[0]).then(function(result3){
                            setPermissions(result3.permissions);
                            for (var i=0; i<result3.permissions.length; i++){
                                console.log(result3.permissions[i]);
                                var p = result3.permissions[i];
                                setPermission(p);
                            }
                            console.log(result3);
                            setInitialized(true);
                        }).catch(function(err){
                            console.log(err);
                        });
                    }).catch(function(err){
                        console.log(err);
                    });
                } else {
                    setInitialized(true);
                }
            }).catch(function(err){
                console.log(err);
            });
        }).catch(function(err){
            console.log(err);
        });
    }

        if (router.isReady){
            onGetTokens();
        } else {
            return;
        }
    },[router.isReady, router.query.code]);

    const setPermission = (p) => {
        if      (p === 'read_compass') setReadCompass(true);
        else if (p === 'read_engine_oil') setReadEngineOil(true);
        else if (p === 'read_battery') setReadBattery(true);
        else if (p === 'read_charge') setReadCharge(true);
        else if (p === 'control_charge') setControlCharge(true);
        else if (p === 'read_thermometer') setReadThermometer(true);
        else if (p === 'read_fuel') setReadFuel(true);
        else if (p === 'read_location') setReadLocation(true);
        else if (p === 'control_security') setControlSecurity(true);
        else if (p === 'read_odometer') setReadOdometer(true);
        else if (p === 'read_speedometer') setReadOdometer(true);
        else if (p === 'read_tires') setReadTires(true);
        else if (p === 'read_vehicle_info') setReadVehicleInfo(true);
        else if (p === 'read_vin') setReadVin(true);
    }

    const clearPermissions = () => {
        setReadCompass(null);
        setReadEngineOil(null);
        setReadBattery(null);
        setReadCharge(null);
        setControlCharge(null);
        setReadThermometer(null);
        setReadFuel(null);
        setReadLocation(null);
        setControlSecurity(null);
        setReadOdometer(null);
        setReadOdometer(null);
        setReadTires(null);
        setReadVehicleInfo(null);
        setReadVin(null);

        setLatitude(null);
        setLongitude(null);
        setVin(null);
        setPercentRemaining(null);
        setRange(null);
        setDistance(null);
        setId(null);
        setMake(null);
        setModel(null);
        setYear(null);
        setFrontLeft(null);
        setFrontRight(null);
        setBackLeft(null);
        setBackRight(null);
        setAmountRemaining(null);
        setAmountRemainingFuel(null);
        setPercentRemainingFuel(null);
        setRangeFuel(null);
        setIsPluggedIn(null);
        setChargeState(null);
        setPermissions(null);
        setChargeStatus(null);
        setSecurityStatus(null);
        setOilLifeRemaining(null);
        setBatteryCapacity(null);
        setUserId(null);
        setDirection(null);
        setAmperage(null);
    }

    const getMakes = (accessToken, vehicles) => {

        return new Promise(function(resolve, reject){
            var promises = [];
            for (var i=0; i<vehicles.length; i++){
                var attributesPromise = smartcarService.getVehicleAttributes(accessToken, vehicles[i]);
                promises.push(attributesPromise);
            }
            Promise.all(promises).then(function(values){
                resolve(values);
            }).catch(function(err){
                reject(err);
            });
        });
    }

    const onLogout = () => {
        setIsLoggedIn(null);
        setAccessToken(null);
        setRefreshToken(null);
        setExpiration(null);
        setRefreshExpiration(null);
    }


    const onGetVehicles = () => {
        smartcarService.getVehicles(accessToken).then(function(result){
            console.log(result);
            setVehicles(result.vehicles);
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
            googleService.getPlace(result.latitude, result.longitude).then(function(places){
                console.log(places);
                if (places.status === 'OK'){
                    if (places.results.length > 0){
                        setPlaceName(places.results[0].name);
                        setPlaceType(places.results[0].types[0]);
                        setPlaceBusinessStatus(places.results[0].business_status);
                        var placeId = "https://www.google.com/maps/search/?api=1&query_place_id="+places.results[0].place_id;
                        setPlaceId(placeId);

                    } else {
                        setPlaceName("No place found");
                    }
                } else {
                    setPlaceName("No place found");
                }
            }).catch(function(err){
                console.log(err);
            });
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


  const onGetCharge = () => {
    smartcarService.getCharge(accessToken, vehicle).then(function(result){
        if (result.isPluggedIn)
        setIsPluggedIn("true");
    else
        setIsPluggedIn("false");
		setChargeState(result.state);
        console.log(result);
    }).catch(function(err){
        console.log(err);
    });
  }

  const onGetPermissions = () => {
    smartcarService.getPermissions(accessToken, vehicle).then(function(result){
        setPermissions(result.permissions);
        console.log(result);
    }).catch(function(err){
        console.log(err);
    });
  }

  const onControlCharge = () => {
    var body = {
	    action: "START"
	}
    smartcarService.controlCharge(accessToken, vehicle, body).then(function(result){

        setChargeStatus(result.status);
        console.log(result);
    }).catch(function(err){
        console.log(err);
    });
  }

  const onControlSecurity = () => {
    var body = {
	    action: "LOCK"
	}

    smartcarService.controlSecurity(accessToken, vehicle, body).then(function(result){
        setSecurityStatus(result.status);
        console.log(result);
    }).catch(function(err){
        console.log(err);
    });
  }

  const onGetEngineOil = () => {
    smartcarService.getEngineOil(accessToken, vehicle).then(function(result){
        setOilLifeRemaining(result.lifeRemaining);
        console.log(result);
    }).catch(function(err){
        console.log(err);
    });
  }

  const onGetBatteryCapacity = () => {
    smartcarService.getBatteryCapacity(accessToken, vehicle).then(function(result){
        setBatteryCapacity(result.capacity);
        console.log(result);
    }).catch(function(err){
        console.log(err);
    });
  }

  const onGetUser = () => {
    smartcarService.getUser(accessToken).then(function(result){
        setUserId(result.id);
        console.log(result);
    }).catch(function(err){
        console.log(err);
    });
  }


  const onGetTeslaCompass = () => {
    smartcarService.getTeslaCompass(accessToken, vehicle).then(function(result){
        setDirection(result.direction);
		setHeading(result.heading);
        console.log(result);
    }).catch(function(err){
        console.log(err);
    });
  }

  const onGetTeslaChargeAmperage = () => {
    smartcarService.getTeslaChargeAmperage(accessToken, vehicle).then(function(result){
        setAmperage(result.amperage);
        console.log(result);
    }).catch(function(err){
        console.log(err);
    });
  }
  

  const onSelectCar = (e) => {
    console.log(e.target.value);
    setVehicle(e.target.value);
	setIsCarSelected(false);
    clearPermissions();
    smartcarService.getPermissions(accessToken, e.target.value).then(function(result3){
        setPermissions(result3.permissions);
        for (var i=0; i<result3.permissions.length; i++){
            console.log(result3.permissions[i]);
            var p = result3.permissions[i];
            setPermission(p);
        }
        console.log(result3);
		setIsCarSelected(true);
    }).catch(function(err){
        console.log(err);
    });
}


  const onStartOver = () => {
      window.location.href = "https://localhost:3000";
  }
  return (

    <Container>
    <Navbar collapseOnSelect sticky="top" expand="lg" bg="dark" variant="dark">

      <Container>
        <Navbar.Brand href="#home">Murban</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
        
        { readLocation ?
          <Nav.Link href="#location">Location</Nav.Link>
        : null }

        { readVin ?
          <Nav.Link href="#VIN">VIN</Nav.Link>
        : null }

        { readBattery ?
          <Nav.Link href="#Battery">Battery</Nav.Link>
        : null }

        { readOdometer ?
          <Nav.Link href="#Odometer">Odometer</Nav.Link>
        : null }

        { readVehicleInfo ?
          <Nav.Link href="#Attributes">Attributes</Nav.Link>
        : null }

        { readTires ?
          <Nav.Link href="#TirePressure">Tire Pressure</Nav.Link>
        : null }

        { readCharge ?
          <Nav.Link href="#Charge">Charge</Nav.Link>
        : null }

        { controlSecurity ?
          <Nav.Link href="#Security">Security</Nav.Link>
        : null }

        { getUser ?
          <Nav.Link href="#User">User</Nav.Link>
        : null }

        { readCharge ?
          <Nav.Link href="#TeslaAmp">Tesla Amperage</Nav.Link>
        : null }

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

       
    <Container>

      
      { isLoggedIn ?

      <div>

 <Card className="m-2">
      <Card.Body>
          <Card.Title>Login Info</Card.Title>
          <Card.Text>
              <p>access token: {accessToken}</p>
              <p>refresh token: {refreshToken}</p>
              <p>expiration: {expiration}</p>
              <p>refreshExpiration: {refreshExpiration}</p>
              <Button variant="primary" onClick={onLogout}>Logout</Button>
              </Card.Text>
		  </Card.Body>
	  </Card>
	  

      <Form.Select onChange={onSelectCar}>

      {vehicleMakes && vehicleMakes.map((v) => (
       <option value={v.id} key={v.id}>{v.year + " " + v.make + " " +v.model }</option>
       ))}
       </Form.Select>

      { isCarSelected ?
      <div>


{ readLocation ?
      <Card className="m-2" id="location">
      <Card.Body>
          <Card.Title>Get Location</Card.Title>
          <Card.Text>
     <p>latitude: {latitude} longitude: {longitude}</p>
      <p>Place name: {placeName}</p>
      <p>Place type: {placeType}</p>
      <p>Place business status: {placeBusinessStatus}</p>
      <p><a href={placeId} rel="noreferrer" target="_blank">View in Google Map</a></p>
      <Button onClick={onGetLocation}variant="primary">
                          Get Location
                          </Button>
              </Card.Text>                  </Card.Body>
          </Card>
      : null }




      { readVin ?
      <Card className="m-2" id="VIN">
	      <Card.Body>
		      <Card.Title>VIN</Card.Title>
			  <Card.Text>
			  {vin}
			  </Card.Text>
			  <Button onClick={onGetVin}variant="primary">
			  Get VIN
			  </Button>
		  </Card.Body>
	  </Card>
      : null }

      { readBattery ?
      <Card className="m-2" id="Battery">
	      <Card.Body>
		      <Card.Title>Battery</Card.Title>
			  <Card.Text>
              <p>Percent Remaining: {percentRemaining}</p>
              <p>Range: {range}</p>
			  </Card.Text>
			  <Button onClick={onGetBattery}variant="primary">
			  Get Battery
			  </Button>
		  </Card.Body>
	  </Card>
      : null }



      { readOdometer ?
      <Card className="m-2" id="Odometer">
	      <Card.Body>
		      <Card.Title>Odometer</Card.Title>
			  <Card.Text>
              <p>Distance: {distance}</p>
              </Card.Text>
              <Button onClick={onGetOdometer}variant="primary">
              Get Distance 
			  </Button>
		  </Card.Body>
	  </Card>
      : null }

      { readVehicleInfo ?
      <Card className="m-2" id="Attributes">
      <Card.Body>
          <Card.Title>Vehicle Attributes</Card.Title>
          <Card.Text>

      
      <p>Id: {id}</p>      
      <p>Make: {make}</p>
      <p>Model: {model}</p>
      <p>Year: {year}</p>
      </Card.Text>
      <Button onClick={onGetVehicleAttributes}variant="primary">
      Get Vehicle Attributes  
      </Button>
      
      </Card.Body>
      </Card>
      : null }

    { readTires ?
    <Card className="m-2" id="TirePressure">
    <Card.Body>
    <Card.Title>Tire Pressure</Card.Title>
    <Card.Text>
      <p>Front Left: {frontLeft}</p>      
      <p>Front Right: {frontRight}</p>
      <p>Back Left: {backLeft}</p>
      <p>Back Right: {backRight}</p>
      </Card.Text>
      <Button onClick={onGetTirePressure}variant="primary">Get Tire Pressure</Button>
      
      </Card.Body>
      </Card>
      : null }

      { readFuel ?
  
    <Card className="m-2" id="Charge">
    <Card.Body>
    <Card.Title>Get Fuel</Card.Title>
    <Card.Text>
      
      <p>Amount Fuel Remaining: {amountRemainingFuel}</p>      
      <p>Percent Fuel Remaining: {percentRemainingFuel}</p>
      <p>Range Fuel: {rangeFuel}</p>
      </Card.Text>
      <Button onClick={onGetFuel}variant="primary">Get Fuel</Button>
    
      </Card.Body>
      </Card>
      : null }

 
      { readCharge ?
     <Card className="m-2" id="Charge">
     <Card.Body>
     <Card.Title>Read Charge</Card.Title>
     <Card.Text>
      <p>Is Plugged In: {isPluggedIn}</p>      
      <p>Charge State: {chargeState}</p>
      <Button onClick={onGetCharge}variant="primary">Read Charge</Button>
      </Card.Text>
      </Card.Body>
      </Card>
      : null }


      { controlCharge ?
        <Card className="m-2">
        <Card.Body>
        <Card.Title>Control Charge</Card.Title>
        <Card.Text>
      <p>Charge Status: {chargeStatus}</p>
      <Button onClick={onControlCharge}variant="primary">Control Charge</Button>
      </Card.Text>
      </Card.Body>
      </Card>
      : null }


      { controlSecurity ?
        <Card className="m-2" id="Security">
        <Card.Body>
        <Card.Title>Control Security</Card.Title>
        <Card.Text>
           <p>Security Status: {securityStatus}</p>  
       <Button onClick={onControlSecurity}variant="primary">Control Security</Button>
      </Card.Text>
      </Card.Body>
      </Card>
      : null }


      { readEngineOil ?
        <Card className="m-2">
        <Card.Body>
        <Card.Title>Get Engine Oil</Card.Title>
        <Card.Text>
      <p>Engine Oil Life: {oilLifeRemaining}</p>
      <Button onClick={onGetEngineOil}variant="primary">Get Engine Oil</Button>
      </Card.Text>
      </Card.Body>
      </Card>
      : null }

      { readBattery ?
        <Card className="m-2">
        <Card.Body>
        <Card.Title>Get Battery Capacity</Card.Title>
        <Card.Text>
     
      <p>Battery Capacity: {batteryCapacity}</p>
     <Button onClick={onGetBatteryCapacity}variant="primary">Get Battery Capacity</Button>
      </Card.Text>
      </Card.Body>
      </Card>
      : null }
    
    {getUser ?
    <Card className="m-2" id="User">
    <Card.Body>
    <Card.Title>Get User</Card.Title>
    <Card.Text>
      <p>User id: {userId}</p>      
      <Button onClick={onGetUser}variant="primary">Get User</Button>
      </Card.Text>
      </Card.Body>
      </Card>
      : null }


      { readCompass ?
    <Card className="m-2">
    <Card.Body>
    <Card.Title>Get Tesla Compass</Card.Title>
    <Card.Text>
       <p>Direction: {direction}</p>
      <Button onClick={onGetTeslaCompass}variant="primary">Get Tesla Compass</Button>
      </Card.Text>
      </Card.Body>
      </Card>
      : null }

 
    { readCharge ?
    <Card className="m-2">
    <Card.Body>
    <Card.Title>Read Charge</Card.Title>
    <Card.Text>
    <p>Amperage: {amperage}</p>
    <Button onClick={onGetTeslaChargeAmperage}variant="primary">Get Tesla Charge Amperage</Button>
 
      </Card.Text>
      </Card.Body>
      </Card>
      : null }

    </div>
    : null }
    </div>
    :
    <AccountButton/>
    }
</Container>
</Container>  );
}
