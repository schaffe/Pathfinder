/**
 * Created by bubble on 25.04.16.
 */
import {Component} from "angular2/core";
import {Place} from "../entities/place";
import {PlaceService} from "../../services/placeService";
import {Router} from "angular2/router";

@Component({
  selector: 'new-place',
  templateUrl: 'app/components/newPlace/newPlace.html',
  styleUrls: ['app/components/newPlace/newPlace.css']
})
export class NewPlace {
  constructor(
    private _router: Router,
    private _placeService: PlaceService
  ){}

  create(){
    let title = (<HTMLInputElement>document.getElementById("title")).value;
    let description = (<HTMLInputElement>document.getElementById("description")).value;
    let place = new Place(title, description);
    // this._placeService.createPlace(place).subscribe();
    this._placeService.createPlace(place).then();
    let link = ['Places'];
    this._router.navigate(link);
  }
}
