import React from 'react';
import './MapGoogle.css';
import {MapDirectionsRenderer} from './MapDirectionsRenderer';
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps'

// TODO: HOOK для MapGoogle
// TODO: InfoWindow

export const ShowOnTheMap = (props) => {
    return(
        <Marker key = {props._id} position = {{
                lat: props.coordinates[0], lng: props.coordinates[1]                
            }}
            icon = {props.checked ? "https://img.icons8.com/doodle/30/000000/marker--v1.png" : "https://img.icons8.com/plasticine/30/000000/marker.png"}
            onClick={()=>{
                /*selectedMarker = props;
                return (// доделать после HOOK
                    <InfoWindow position = {{
                        lat: selectedMarker.coordinates[0], lng: selectedMarker.coordinates[1]                
                        }}>                        
                        <div>{selectedMarker.name}</div>
                    </InfoWindow>
                )*/
            }}
        />
    )
}

export const  MapGoogle = (props) =>{
    let coordinatesOfFactoriesAndCustomers = [];

    const ShowMap = () => {
        return (
            <GoogleMap defaultZoom = {5} defaultCenter = {{lat: 52.51545, lng: 13.3736}} >
                {ShowChosenFactories()}
                {ShowCustomers()}
                <MapDirectionsRenderer elements = {coordinatesOfFactoriesAndCustomers}/>
            </GoogleMap>
        )
    }
    const ShowChosenFactories = () => {
        let factoriesMarkers = [];
        let chosenFactories = [];
        debugger;
        if (props.factoriesArray) {
        for ( let i = 0; i < props.factoriesArray.length; i++) {
            for ( let j = 0; j < props.factoryInfo.length; j++) {
                if (props.factoriesArray[i][0] === props.factoryInfo[j]._id){
                    chosenFactories.push(props.factoryInfo[j]);
                    coordinatesOfFactoriesAndCustomers.push(props.factoryInfo[j])
                }
            }
        }
    }
        /*return (
            chosenFactories.map(element => {
                factoriesMarkers.push(ShowOnTheMap(element))
                return factoriesMarkers
            })                
        )*/
    }
    const ShowCustomers = () => {
        debugger;
        return (
            props.customerInfo.map(element => {
                if (element.checked) {
                    coordinatesOfFactoriesAndCustomers.push(element);
                }
                else {
                    //let deleteItemIndex = customerMarkers.indexOf(ShowOnTheMap(element));
                    //if (deleteItemIndex > -1) customerMarkers.splice(deleteItemIndex,1);
                }
            })                
        )
    }     
    const WrappedMap = withScriptjs(withGoogleMap(ShowMap));
    return (
        <WrappedMap 
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDPFar_hr412glanOG5gRLPPi5iJx-rttc"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
    )
}
