import React, {useState, useEffect} from 'react';
import {DirectionsRenderer} from 'react-google-maps'

export  const MapDirectionsRenderer = (props) => {
    const [directions, setDirections] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
      debugger;
      if (props.elements != undefined && props.elements.length !== 0) {      
        let factoryInfo = props.elements.factoryInfo;
        let customerInfo = props.elements.customerInfo;
        let coordinatesOfFactoriesAndCustomers = props.elements;
        //путь сбора заказов 
        debugger;
        const waypoints = coordinatesOfFactoriesAndCustomers.map(f => ({
          location: { lat: f.coordinates[0], lng: f.coordinates[1] },
          stopover: true
        }));
        //точка возврата транспорта
        debugger;
        waypoints.push({  
          location: { lat: coordinatesOfFactoriesAndCustomers[0].coordinates[0], lng: coordinatesOfFactoriesAndCustomers[0].coordinates[1] },
          stopover: true
        });
        
        const travelMode = window.google.maps.TravelMode.DRIVING;
        const origin = waypoints.shift().location;
        const destination = waypoints.pop().location;
    
        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
          {
            origin: origin,
            destination: destination,
            travelMode: travelMode,
            waypoints: waypoints
          },
          (result, status) => {
            console.log(result)
            debugger
            if (status === window.google.maps.DirectionsStatus.OK) {
              setDirections(result);
            } else {
              setError(result);
            }
          }
        );
      }
    });
    if (error) {
        return <h1>{error}</h1>;
    }
    //TODO убрать маркеры, которые выставляются или оставить их, а предыдущие убрать
    //const directionRenderer = new window.google.maps.DirectionsRenderer();
    //directionRenderer.setOptions({suppressMarkers: true});
      return (
        directions && (
        <DirectionsRenderer directions={directions} setOptions = {{suppressMarkers: true}}/>
        )
      );
}