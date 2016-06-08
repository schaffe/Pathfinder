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
    geojson;

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

    createMask(countryMask) {
        L.Mask = L.Polygon.extend({
            options: {
                stroke: false,
                color: '#1b3716',// ,//'rgb(152,152,152)',//'#1b3716',
                fillOpacity: 0.5,//0.2,
                clickable: false,
                outerBounds: new L.LatLngBounds([-90, -360], [90, 360])
            },

            initialize: function (latLngs, options) {
                var outerBoundsLatLngs = [
                    this.options.outerBounds.getSouthWest(),
                    this.options.outerBounds.getNorthWest(),
                    this.options.outerBounds.getNorthEast(),
                    this.options.outerBounds.getSouthEast()
                ];
                L.Polygon.prototype.initialize.call(this, [outerBoundsLatLngs, latLngs], options);
            },
        });

        L.mask = function (latLngs, options) {
            return new L.Mask(latLngs, options);
        };

        L.mask(countryMask).addTo(this.map);
    }

    createDistricts(countryDistricts) {
        function style(feature) {
            return {
                // fillColor: 'rgb(22,55,878)',
                weight: 2,
                // opacity: 1,
                color: 'white',
                dashArray: '3',
                // fillOpacity: 0.7
            };
        }

        this.geojson = L.geoJson(countryDistricts, {
            style: style,
            onEachFeature: this.onEachFeature
        }).addTo(this.map);
    }

    onEachFeature(feature, layer) {
        layer.on({
            mouseover: event=>{
                var layer = event.target;
                layer.setStyle({
                    weight: 2,//5,
                    color: '#666',
                    dashArray: '',
                    // fillOpacity: 0.7
                });
            },
            mouseout: event=>{
                this.geojson.resetStyle(event.target);
            },
            click: event=>{
                this.map.fitBounds(event.target.getBounds());
            }
        });
    }
}

// function highlightFeature(e) {
//     var layer = e.target;
//
//     layer.setStyle({
//         weight: 2,//5,
//         color: '#666',
//         dashArray: '',
//         // fillOpacity: 0.7
//     });
//
//     if (!L.Browser.ie && !L.Browser.opera) {
//         layer.bringToFront();
//     }
//     info.update(layer.feature.properties);
// }
//
// function zoomToFeature(e) {
//     map.fitBounds(e.target.getBounds());
// }
//
// function resetHighlight(e) {
//     geojson.resetStyle(e.target);
//     info.update();
// }