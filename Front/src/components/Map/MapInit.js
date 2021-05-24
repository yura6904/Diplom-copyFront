import React from 'react';
import google from 'google-maps-react';

export let initMap = () => {
    debugger;
    var coordinates = {lat: 47.212325, lng: 38.933663};
    console.log("INIT MAP")
    let map = new google.maps.Map(document.getElementById('map'), {
        center: coordinates,
        zoom: 4
    });
    let marker = new google.maps.Marker({
        position: coordinates,
        map: map
    });
}