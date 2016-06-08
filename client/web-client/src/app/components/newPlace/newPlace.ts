/**
 * Created by bubble on 25.04.16.
 */
import {Component, OnInit} from "angular2/core";
import {Place} from "../entities/place";
import {PlaceService} from "../../services/placeService";
import {Router} from "angular2/router";
import {MapService} from "../../services/mapService";
const L = require('leaflet');


@Component({
    selector: 'new-place',
    templateUrl: 'app/components/newPlace/newPlace.html',
    styleUrls: ['app/components/newPlace/newPlace.css']
})
export class NewPlace implements OnInit {
    location;

    constructor(private _router:Router,
                private _placeService:PlaceService,
                private _mapService: MapService) {
    }

    ngOnInit() {
        var map = L.map("little_map", this._mapService.mapOptions);
        this._mapService.map = map;
        this._mapService.addLayer();
        var popup = L.popup();
        //noinspection TypeScriptUnresolvedFunction
        this._mapService.map.on('click' , (event)=> {
            popup
                        .setLatLng(event.latlng)
                        .setContent("Новий об’єкт розташований за такими координатами: " + event.latlng.toString())
                        .openOn(map);
                    this._mapService.markerLocation = event.latlng;
        });
    }

    create() {
        let title = (<HTMLInputElement>document.getElementById("title")).value;
        let description = (<HTMLInputElement>document.getElementById("description")).value;
        let place = new Place(title, description);
        place.location = new Backendless.GeoPoint();
        place.location.latitude = this._mapService.markerLocation.lat;
        place.location.longitude = this._mapService.markerLocation.lng;
        this._placeService.createPlace(place).then(()=>this._router.navigate(['Places']));
        // let link = ['Places'];
        // this._router.navigate(link);
    }
}
