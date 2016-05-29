/**
 * Created by bubble on 20.04.16.
 */

import {Component, Input} from "angular2/core";
import {Place} from "../entities/place";
import {Router} from "angular2/router";

@Component({
  selector: 'place-detail',
  templateUrl: 'app/components/placeDetail/placeDetail.html',
  //styleUrls: ['app/component/placeDetail/placeDetail.css']
})
export class PlaceDetail{
  @Input()
  place: Place;
  constructor(
    private _router: Router
  ){}
  gotoDetail(place: Place){
    let link = ['FullPlace', {objId: place.objectId}];
    this._router.navigate(link);
  }
  
}

