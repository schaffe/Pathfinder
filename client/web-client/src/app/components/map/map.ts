/**
 * Created by bubble on 26.05.16.
 */
import {Component, OnInit, ViewEncapsulation} from 'angular2/core';
import {MapService} from '../../services/mapService';
const L = require('leaflet');
// import * as markerCluster from 'leaflet.markercluster';
var geojson, map, info;

function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
    weight: 2,//5,
    color: '#666',
    dashArray: '',
    // fillOpacity: 0.7
  });

  if (!L.Browser.ie && !L.Browser.opera) {
    layer.bringToFront();
  }
  info.update(layer.feature.properties);
}

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

function resetHighlight(e) {
  geojson.resetStyle(e.target);
  info.update();
}

@Component({
  selector: 'map',
  template: `<div id="map"></div>`,
  styleUrls: ['app/components/map/map.css'],
  encapsulation: ViewEncapsulation.None
})
export class Map implements OnInit {

  constructor(private _mapService:MapService) {
  }

  ngOnInit() {
    this.displayMap();
    this.addMarkers();
  }

  displayMap() {
    var bounds = new L.latLngBounds([52.5, 21], [44, 41]);

    map = L.map('map', {
      center: new L.LatLng(48.46, 30.87),
      zoom: 6,
      maxZoom: 18,
      minZoom: 6,
      zoomControl: false,
      inertia: false,
      attributionControl: false,
      maxBounds: bounds
    });

    L.tileLayer(
      'https://api.mapbox.com/styles/v1/kastrulya/ciopmkl6g0052i8nmlnjw6iww/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2FzdHJ1bHlhIiwiYSI6ImNpb3Bsdm92dTAwMDJ2bG0xenEwZmJlYm4ifQ.nsPNZQ726nMQtszDGhDX3w',
      {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        accessToken: 'pk.eyJ1Ijoia2FzdHJ1bHlhIiwiYSI6ImNpb3Bsdm92dTAwMDJ2bG0xenEwZmJlYm4ifQ.nsPNZQ726nMQtszDGhDX3w'
    }).addTo(map);

    this.createMask();
    this.createDistricts();
    //Disable drag on min zoom
    map.on('drag', function () {
      map.panInsideBounds(bounds, {animate: false});
    });
    this.createInfo();
  }

  onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature
    });
  }

  createMask() {
    //Hide other countries with mask
    L.Mask = L.Polygon.extend({
      options: {
        stroke: false,
        color: '#1b3716',// 'white',//'rgb(152,152,152)',//'#1b3716',
        fillOpacity:/* 1,*/ 0.8,
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

    L.mask(this._mapService.ukraineMask).addTo(map);
  }

  createDistricts() {
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

    geojson = L.geoJson(this._mapService.ukraine_arr, {
      style: style,
      onEachFeature: this.onEachFeature
    }).addTo(map);
  }

  createInfo() {
    info = L.control();

    info.onAdd = function () {
      this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      this.update();
      return this._div;
    };

// method that we will use to update the control based on feature properties passed
    info.update = function (props) {
      this._div.innerHTML = '<h4>Область</h4>' + (props ?
        '<b>' + props.name + '</b>'
          : 'Оберіть область');
    };

    info.addTo(map);
  }

  addMarkers() {
    // map.addLayer(markers);
    var marker = L.marker([50.45, 30.52]).addTo(map);
    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
  }

}
