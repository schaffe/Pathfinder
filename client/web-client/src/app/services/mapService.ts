/**
 * Created by bubble on 07.06.16.
 */


import {Injectable} from 'angular2/core';
// import {Location} from '../core/location.class';
// import {Map, TileLayer} from 'leaflet';
const L = require('leaflet');

@Injectable()
export class MapService {
    map:Map;
    baseMaps:any;
    mapOptions: {};
    markerLocation;

    constructor() {
        var bounds = new L.latLngBounds([52.5, 21], [44, 41]);
        this.mapOptions = {
            center: new L.LatLng(48.46, 30.87),
            zoom: 6,
            maxZoom: 18,
            minZoom: 6,
            zoomControl: false,
            inertia: false,
            attributionControl: false,
            maxBounds: bounds
        };
    }
    
    addLayer(){
        L.tileLayer(
            'https://api.mapbox.com/styles/v1/kastrulya/ciot1llnt001ydaniiuhzd4sh/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2FzdHJ1bHlhIiwiYSI6ImNpb3Bsdm92dTAwMDJ2bG0xenEwZmJlYm4ifQ.nsPNZQ726nMQtszDGhDX3w',
            {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                accessToken: 'pk.eyJ1Ijoia2FzdHJ1bHlhIiwiYSI6ImNpb3Bsdm92dTAwMDJ2bG0xenEwZmJlYm4ifQ.nsPNZQ726nMQtszDGhDX3w'
            }).addTo(this.map);
    }
}
