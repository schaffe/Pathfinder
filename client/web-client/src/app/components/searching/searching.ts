import {Component} from "angular2/core";
import {SearchService} from "../../services/searchService";
import {JSONP_PROVIDERS} from "angular2/http";

@Component({
    selector: 'search',
    templateUrl: 'app/components/searching/searching.html',
    styleUrls: ['app/components/searching/searching.css'],
    providers: [JSONP_PROVIDERS, SearchService]
})
export class Searching {
    items: Promise<String[]>;
    constructor(
        private  _searchService:SearchService) {
    }

    search(term){
        this._searchService.search(term)
            .then(res=>this.items = res.data);
    }
    
    findPlaces(tagName){
        this._searchService
    }

}
