/**
 * Created by bubble on 25.04.16.
 */
import {Component, OnInit} from "angular2/core";
import {RouteParams, Router} from "angular2/router";
import {PlaceService} from "../../services/placeService";
import {LikeService} from "../../services/likeService";
import {Place} from "../entities/place";
import {DisplayTag} from "../entities/DisplayTag";
import {AllTags} from "../tagsComponent/allTags/allTags";
const Backendless = require('backendless');
const L = require('leaflet');
// import GeoPoint = __Backendless.GeoPoint;


@Component({
  selector: 'full-place',
  templateUrl: 'app/components/full' +
  'Place/fullPlace.html',
  styleUrls: ['app/components/fullPlace/fullPlace.css'],
  directives: [AllTags]
})
export class FullPlace implements OnInit {
  place:Place;
  count:number;
  tags:DisplayTag[];
  user:Backendless.User;
  map;

  constructor(private _router:Router,
              private _routeParams:RouteParams,
              private _placeService:PlaceService,
              private  _likeService:LikeService) {
  }

  ngOnInit() {
    let objId = this._routeParams.get('objId');
    this.getPlace(objId)
      .then(()=> this.initMap());
    this.getTags(objId);
    // this.initMap();
  }

  getPlace(objId) {
    return this._placeService.getPlace(objId)
      .then(place => this.place = place);
  }

  delete() {
    this._placeService.deletePlace(this.place).then(
      ()=> {
        let link = ['Places'];
        this._router.navigate(link);
      }
    );
  }

  editDescription() {
    console.log('description will be changed');
    let field = <HTMLInputElement>document.getElementById('description');
    let button = document.getElementById('editDescription');
    this.toggleEditing(field, button);
  }

  editTitle(event) {
    console.log('title will be changed');
    let field = <HTMLInputElement>document.getElementById('title');
    let button = document.getElementById('editTitle');
    this.toggleEditing(field, button);
  }

  toggleEditing(field:HTMLInputElement, button:HTMLElement) {
    if (field.readOnly) {
      field.readOnly = false;
      field.focus();
    } else field.readOnly = true;
    button.classList.toggle('edited');
    button.classList.toggle('saved');
  }

  getTags(placeId : string) {
    return this._likeService
      .getLikedTags(placeId)
      .then(tagsCount => this.tags = tagsCount);
  }

  initMap(){
    // var bounds = new L.latLngBounds([52.5, 21], [44, 41]);
    var lat = this.place.location? this.place.location.latitude : 48.46;
    var long = this.place.location? this.place.location.longitude : 30.87;
    this.map = L.map('little_map', {
      center: new L.LatLng(lat, long),
      zoom: 14
    });

    L.tileLayer(
      'https://api.mapbox.com/styles/v1/kastrulya/ciot1llnt001ydaniiuhzd4sh/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2FzdHJ1bHlhIiwiYSI6ImNpb3Bsdm92dTAwMDJ2bG0xenEwZmJlYm4ifQ.nsPNZQ726nMQtszDGhDX3w',
      {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        accessToken: 'pk.eyJ1Ijoia2FzdHJ1bHlhIiwiYSI6ImNpb3Bsdm92dTAwMDJ2bG0xenEwZmJlYm4ifQ.nsPNZQ726nMQtszDGhDX3w'
      }).addTo(this.map);

    var marker = L.marker([lat, long]).addTo(this.map);
    marker.bindPopup("<b>Title</b><br>I am a popup.");

  }

  edit(newTitle, newDescription){
    // editDescription.value();
    this.place.name = newTitle;
    this.place.description = newDescription;

    this.place.location = new Backendless.GeoPoint();
    this.place.location.latitude = 55.332;
    this.place.location.longitude = 30.453;

    this._placeService.updatePlace(this.place);
  }

}
