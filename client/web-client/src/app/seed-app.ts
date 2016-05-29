import {Component} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {About} from "./components/about/about";
import {Places} from "./components/allPlaces/places";
import {FullPlace} from "./components/fullPlace/fullPlace";
import {NewPlace} from "./components/newPlace/newPlace";
import {PlaceService} from "./services/placeService";
import {LikeService} from "./services/likeService";
import {MapService} from "./services/mapService";
import {Register} from "./components/auth/register/register";
import {Login} from "./components/auth/login/login";
import {Auth} from "./components/auth/auth";
//import {Logout} from './components/auth/logout/logout';

import {Map} from './components/map/map';

@Component({
  selector: 'seed-app',
  providers: [
    PlaceService, LikeService, MapService
  ],
  pipes: [],
  directives: [ROUTER_DIRECTIVES, Auth, Map],
  templateUrl: 'app/seed-app.html',
  styleUrls: ['app/seed-app.css']
})
@RouteConfig([
  { path: '/about',      component: About,       name: 'About' },
  { path: '/places',     component: Places,      name: 'Places', useAsDefault: true },
  { path: '/place/:objId', component: FullPlace, name: 'FullPlace' },
  { path: 'places/add', component: NewPlace,     name: 'NewPlace' },
  { path: 'register', component: Register, name: 'Register' },
  { path: 'login', component: Login, name: 'Login' },
  { path: 'map', component: Map, name: 'Map'}
])
export class SeedApp {
  constructor() {}
}
