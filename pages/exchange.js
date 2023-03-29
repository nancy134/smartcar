import authService from '../services/auth';
import smartcarService, { getLocation, getUser } from '../services/smartcar';
import googleService from '../services/google';
import AccountButton from '../components/AccountButton';
import numeral from 'numeral';


import {
    Button,
    Card,
    Form,
    Container,
    Navbar,
    Nav,
    Spinner
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
    const [locationLoading, setLocationLoading] = useState(false);
    const [vin, setVin] = useState(null);
    const [vinLoading, setVinLoading] = useState(false);
    const [percentRemaining, setPercentRemaining] = useState(null);
    const [range, setRange] = useState(null);
    const [batteryLoading, setBatteryLoading] = useState(false);
    const [distance, setDistance] = useState(null);
    const [odometerLoading, setOdometerLoading] = useState(false);
    const [id, setId] = useState(null);
    const [make, setMake] = useState(null);
    const [model, setModel] = useState(null);
    const [year, setYear] = useState(null);
    const [attributesLoading, setAttributesLoading] = useState(false);
    const [frontLeft, setFrontLeft] = useState(null);
    const [frontRight, setFrontRight] = useState(null);
    const [backLeft, setBackLeft] = useState(null);
    const [backRight, setBackRight] = useState(null);
    const [tiresLoading, setTiresLoading] = useState(false);
    const [amountRemaining, setAmountRemaining] = useState(null);
    const [amountRemainingFuel, setAmountRemainingFuel] = useState(null);
    const [percentRemainingFuel, setPercentRemainingFuel] = useState(null);
    const [rangeFuel, setRangeFuel] = useState(null);
    const [fuelLoading, setFuelLoading] = useState(false);
    const [isPluggedIn, setIsPluggedIn] = useState(null);
    const [chargeState, setChargeState] = useState(null);
    const [chargeLoading, setChargeLoading] = useState(false);
    const [permissions, setPermissions] = useState(null);
    const [chargeStatus, setChargeStatus] = useState(null);
    const [chargeStatusLoading, setChargeStatusLoading] = useState(false); const [chargeStartLoading, setChargeStartLoading] = useState(false);
    const [chargeStopLoading, setChargeStopLoading] = useState(false);    const [securityStatus, setSecurityStatus] = useState(null);
    const [lockLoading, setLockLoading] = useState(false);
    const [unlockLoading, setUnlockLoading] = useState(false);
    const [oilLifeRemaining, setOilLifeRemaining] = useState(null);
    const [oilLifeLoading, setOilLifeLoading] = useState(false);
    const [batteryCapacity, setBatteryCapacity] = useState(null);
    const [batteryCapacityLoading, setBatteryCapacityLoading] = useState(false);
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
        setLocationLoading(true);
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
                setLocationLoading(false);
            }).catch(function(err){
                setLocationLoading(false);
                console.log(err);
            });
        }).catch(function(err){
            setLocationLoading(false);
            console.log(err);
        });
    }


     const onGetVin = () => {
         setVinLoading(true);
         smartcarService.getVin(accessToken, vehicle).then(function(result){
             setVinLoading(false);
             setVin(result.vin);
             console.log(result);
         }).catch(function(err){
             setVinLoading(false);
             setVin("Error loading VIN");
             console.log(err);
         });
     }
  

     const onGetBattery = () => {
        setBatteryLoading(true)
        smartcarService.getBattery(accessToken, vehicle).then(function(result){
            setBatteryLoading(false);
            setPercentRemaining(result.percentRemaining);
            setRange(result.range);
            console.log(result);
        }).catch(function(err){
            setBatteryLoading(false);
            console.log(err);
        });
    }

  
    const onGetOdometer = () => {
        setOdometerLoading(true);
        smartcarService.getOdometer(accessToken, vehicle).then(function(result){
            setDistance(result.distance);
            setOdometerLoading(false);
            console.log(result);
        }).catch(function(err){
            setOdometerLoading(false);
            console.log(err);
        });
    }


  
    const onGetVehicleAttributes = () => {
        setAttributesLoading(true);
        smartcarService.getVehicleAttributes(accessToken, vehicle).then(function(result){
            setId(result.id);
            setMake(result.make);
            setModel(result.model);
            setYear(result.year);
            setAttributesLoading(false);
            console.log(result);
        }).catch(function(err){
           setAttributesLoading(false);
           console.log(err);
        });
    }


    const onGetTirePressure = () => {
        setTiresLoading(true);
        smartcarService.getTirePressure(accessToken, vehicle).then(function(result){
            setFrontLeft(result.frontLeft);
            setFrontRight(result.frontRight);
            setBackLeft(result.backLeft);
            setBackRight(result.backRight);
            setTiresLoading(false);
            console.log(result);
        }).catch(function(err){
            setTiresLoading(false);
            console.log(err);
        });
    }

    const onGetFuel = () => {
        setFuelLoading(true);
        smartcarService.getFuel(accessToken, vehicle).then(function(result){
            setFueldLoading(false);
            setAmountRemainingFuel(result.amountRemaining);
            setPercentRemainingFuel(result.percentRemaining);
            setRangeFuel(result.range);
            console.log(result);
        }).catch(function(err){
            setFuelLoading(false);
            console.log(err);
        });
    }


    const onGetCharge = () => {
        setChargeLoading(true);
        smartcarService.getCharge(accessToken, vehicle).then(function(result){
            if (result.isPluggedIn)
                setIsPluggedIn("true");
            else
                setIsPluggedIn("false");
            setChargeState(result.state);
            setChargeLoading(false);
            console.log(result);
        }).catch(function(err){
            setChargeLoading(false);
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

    const onControlCharge = (action) => {
        var body = {
            action: action
        }
        if (action === "START")
            setChargeStartLoading(true);
        else
            setChargeStopLoading(true);
        
        smartcarService.controlCharge(accessToken, vehicle, body).then(function(result){
            setChargeStatus(result.status);
            console.log(result);
            setChargeStartLoading(false);
            setChargeStopLoading(false);
        }).catch(function(err){
            setChargeStartLoading(false);
            setChargeStopLoading(false);
            console.log(err);
        });
    }




    const onControlSecurity = (action) => {
        var body = {
            action: action
        }
        if (action === "LOCK")
            setLockLoading(true);
        else
            setUnlockLoading(true);
            
        smartcarService.controlSecurity(accessToken, vehicle, body).then(function(result){
            setSecurityStatus(result.status);
            setLockLoading(false);
            setUnlockLoading(false);
            console.log(result);
        }).catch(function(err){
            setLockLoading(false);
            setUnlockLoading(false);
            console.log(err);
        });
    }


    const onGetEngineOil = () => {
        setOilLifeLoading(true)
        smartcarService.getEngineOil(accessToken, vehicle).then(function(result){
            setOilLifeRemaining(result.lifeRemaining);
            setOilLifeLoading(false)
            console.log(result);
        }).catch(function(err){
            setOilLifeLoading(false)
            console.log(err);
        });
    }


    const onGetBatteryCapacity = () => {
        setBatteryCapacityLoading(true);
        smartcarService.getBatteryCapacity(accessToken, vehicle).then(function(result){
            setBatteryCapacity(result.capacity);
            setBatteryCapacityLoading(false);
            console.log(result);
        }).catch(function(err){
            setBatteryCapacityLoading(false);
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
                         { locationLoading ?
                         <Spinner
                             as="span"
                             animation="border"
                             size="sm"
                             role="status"
                             aria-hidden="true"
                         />
                         :
                         <span>Get Location</span>
                         }
                     </Button>

                    </Card.Text>
                </Card.Body>
            </Card>
            : null }

            { readVin ?


            <Card className="m-2" id="VIN">
                <Card.Body>
                    <Card.Title>VIN</Card.Title>
                    <Card.Text>{vin}</Card.Text>

                     <Button onClick={onGetVin}variant="primary">
                         { vinLoading ?
                         <Spinner
                             as="span"
                             animation="border"
                             size="sm"
                             role="status"
                             aria-hidden="true"
                         />
                         :
                         <span>Get VIN</span>
                         }
                     </Button>

                </Card.Body>
            </Card>
            : null }


            { readBattery ?
              <Card className="m-2" id="Battery">
                  <Card.Body>
                      <Card.Title>Battery</Card.Title>
                      <Card.Text>
                        <p>Percent Remaining: {numeral(percentRemaining).format('0%')}</p>
                        <p>Range: {numeral(range).format('0,0')} miles</p>
                      </Card.Text>
                      
                      <Button onClick={onGetBattery}variant="primary">
                         { batteryLoading ?
                         <Spinner
                             as="span"
                             animation="border"
                             size="sm"
                             role="status"
                             aria-hidden="true"
                         />
                         :
                         <span>Get Battery</span>
                         }
                        </Button>

                  </Card.Body>
              </Card>
              : null }

              { readOdometer ?


              <Card className="m-2" id="Odometer">
                  <Card.Body>
                      <Card.Title>Odometer</Card.Title>
                      <Card.Text>
                      <p>Distance: {numeral(distance).format(0,0)} miles</p>
                      </Card.Text>

                      <Button onClick={onGetOdometer}variant="primary">
                         { odometerLoading ?
                         <Spinner
                             as="span"
                             animation="border"
                             size="sm"
                             role="status"
                             aria-hidden="true"
                         />
                         :
                         <span>Get Odomometer</span>
                         }
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
                         { attributesLoading ?
                         <Spinner
                             as="span"
                             animation="border"
                             size="sm"
                             role="status"
                             aria-hidden="true"
                         />
                         :
                         <span>Get Vehicle Attributes</span>
                         }
                     </Button>

                  </Card.Body>
              </Card>
              : null }

              { readTires ?
              <Card className="m-2" id="TirePressure">
                  <Card.Body>
                      <Card.Title>Tire Pressure</Card.Title>
                      <Card.Text>
                          <p>Front Left: {numeral(frontLeft).format(0,0)} psi</p>
                          <p>Front Right: {numeral(frontRight).format(0,0)} psi</p>
                          <p>Back Left: {numeral(backLeft).format(0,0)} psi</p>
                          <p>Back Right: {numeral(backRight).format(0,0)} psi</p>
                      </Card.Text>

                      <Button onClick={onGetTirePressure}variant="primary">
                         { tiresLoading ?
                         <Spinner
                             as="span"
                             animation="border"
                             size="sm"
                             role="status"
                             aria-hidden="true"
                         />
                         :
                         <span>Get Tire Pressure</span>
                         }
                     </Button>

                  </Card.Body>
              </Card>
              : null }


              { readFuel ?
              <Card className="m-2" id="Charge">
                  <Card.Body>
                      <Card.Title>Get Fuel</Card.Title>
                      <Card.Text>
                        <p>Amount Fuel Remaining: {numeral(amountRemainingFuel).format(0,0.0)} gallons</p>
                        <p>Percent Fuel Remaining: {numeral(percentRemainingFuel).format(0.0)}%</p>
                        <p>Range Fuel: {numeral(rangeFuel).format(0.0)} km</p>
                      </Card.Text>
   
                      <Button onClick={onGetFuel}variant="primary">
                         { fuelLoading ?
                         <Spinner
                             as="span"
                             animation="border"
                             size="sm"
                             role="status"
                             aria-hidden="true"
                         />
                         :
                         <span>Get Fuel</span>
                         }
                     </Button>

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
   
                          <Button onClick={onGetCharge}variant="primary">
                         { chargeLoading ?
                         <Spinner
                             as="span"
                             animation="border"
                             size="sm"
                             role="status"
                             aria-hidden="true"
                         />
                         :
                         <span>Read Charge</span>
                         }
                     </Button>

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

                          <Button onClick={() => onControlCharge("START")} variant="primary">
                          { chargeStartLoading ?
                         <Spinner
                             as="span"
                             animation="border"
                             size="sm"
                             role="status"
                             aria-hidden="true"
                         />
                         :
                         <span>Start Charge</span>
                         }
                         </Button>{' '}

                         <Button onClick={() => onControlCharge("STOP")}variant="primary">

                         { chargeStartLoading ?

                         <Spinner
                             as="span"
                             animation="border"
                             size="sm"
                             role="status"
                             aria-hidden="true"
                         />
                         :
                        <span>Stop Charge</span>                         
                         }
                     </Button>

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

                          <Button onClick={() => onControlSecurity("LOCK")}variant="primary">
                          { lockLoading ?
                         <Spinner
                             as="span"
                             animation="border"
                             size="sm"
                             role="status"
                             aria-hidden="true"
                         />
                         :
                         <span>Lock</span>
                         }
                     </Button>
                     
                     {' '}

                     <Button onClick={() => onControlSecurity("UNLOCK")}variant="primary">

                     { unlockLoading ?

                         <Spinner
                             as="span"
                             animation="border"
                             size="sm"
                             role="status"
                             aria-hidden="true"
                         />
                         :
                        <span>Unlock</span>

                        
                         }
                     </Button>
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

                          <Button onClick={onGetEngineOil}variant="primary">
                         { oilLifeLoading ?
                         <Spinner
                             as="span"
                             animation="border"
                             size="sm"
                             role="status"
                             aria-hidden="true"
                         />
                         :
                         <span>Get Engine Oil</span>
                         }
                     </Button>

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

                          <Button onClick={onGetBatteryCapacity}variant="primary">
                         { batteryCapacityLoading ?
                         <Spinner
                             as="span"
                             animation="border"
                             size="sm"
                             role="status"
                             aria-hidden="true"
                         />
                         :
                         <span>Get Battery Capacity</span>
                         }
                     </Button>
                     
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
      </Container>
    );
}
