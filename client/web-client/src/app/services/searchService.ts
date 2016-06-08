import {Injectable} from "angular2/core";
import {Tag} from "../components/entities/tag";
const Backendless = require('backendless');

@Injectable()
export class SearchService {
    search(term:string) {
        var tagStorage = Backendless.Persistence.of(Tag);
        var dataQuery = new Backendless.DataQuery();
        dataQuery.condition = "name LIKE '%" + term + "%'";
        return tagStorage.find( dataQuery );
    }
}