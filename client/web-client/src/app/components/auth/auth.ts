/**
 * Created by bubble on 19.05.16.
 */
/**
 * Created by bubble on 17.05.16.
 */

import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
const Backendless = require('backendless');

@Component({
  selector: 'auth',
  templateUrl: 'app/components/auth/auth.html',
  directives: [ROUTER_DIRECTIVES],
  //styleUrls: ['app/components/auth/login/login.css'],
})export class Auth {
  isCurrUser() {
    return !!Backendless.LocalCache.get("current-user-id");
  }

  userLogout(user) {
    console.log("user has logout");
  }

  gotError(err) {
    console.log("error message - " + err.message);
    console.log("error code - " + err.statusCode);
  }

  logout(){
    console.log("current user: " + Backendless.LocalCache.get("current-user-id"));
    Backendless.UserService.logout( new Backendless.Async( this.userLogout, this.gotError ) );
  }

}
