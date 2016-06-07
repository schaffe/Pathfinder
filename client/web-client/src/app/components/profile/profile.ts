import {Component, Input, OnInit} from "angular2/core";
import {Place} from "../entities/place";
import {PlaceService} from "../../services/placeService";
import {PlaceDetail} from "../placeDetail/placeDetail";

@Component({
    selector: 'profile',
    templateUrl: 'app/components/profile/profile.html',
    //styleUrls: ['app/component/placeDetail/placeDetail.css'],
    directives: [PlaceDetail]
})
export class Profile implements OnInit{
    user: Backendless.User;
    likedPlaces: Place[];
    createdPlaces: Place[];
    constructor(private _placeService: PlaceService) {
    }

    ngOnInit(){
        this.getCreatedPlaces();
    }
    
    getLikedPlaces(){
        this._placeService.getLikedPlaceOfUser(this.user).then(res=>this.likedPlaces = res.data);
    }
    
    getCreatedPlaces(){
        this._placeService.getCreatedPlaceByUser(this.user).then(res=>this.createdPlaces = res.data);
    }
    
}