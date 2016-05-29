/**
 * Created by bubble on 20.04.16.
 */

import {Component, OnInit} from "angular2/core";
import {Router} from "angular2/router";
import {PlaceDetail} from "../placeDetail/placeDetail";
import {PlaceService} from "../../services/placeService";
import {Place} from "../entities/place";

const Backendless = require('backendless');

@Component({
  selector: 'places',
  templateUrl: 'app/components/allPlaces/allPlaces.html',
  directives: [PlaceDetail]
})
export class Places implements OnInit{
  places : Place[];
  constructor(
    private _router: Router,
    private _placeService: PlaceService
  ){}

  ngOnInit(){
    //this.places = this._placeService.getPlaces();
    this.getPlaces();
  }

  getPlaces(){
    this._placeService.getPlaces().then( res => this.places = res.data );
  }

  addNewPlace(){
    let link = ['NewPlace'];
    this._router.navigate(link);
  }
}
