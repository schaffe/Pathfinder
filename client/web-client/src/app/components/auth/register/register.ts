/**
 * Created by bubble on 18.05.16.
 */

import {Component} from "angular2/core";
import {Router} from "angular2/router";
const Backendless = require('backendless');


@Component({
  selector: 'register',
  templateUrl: 'app/components/auth/register/register.html',
  styleUrls: ['app/components/auth/register/register.css']
})export class Register {
  constructor (
    private _router: Router
  ){}

  userRegistered(user) {
    console.log("user has registered");
  }

  gotError(err) {
    console.log("error message - " + err.message);
    console.log("error code - " + err.statusCode);
  }

  register(){
    let email = <HTMLInputElement>document.getElementById('email');
    let username = <HTMLInputElement>document.getElementById('username');
    let password = <HTMLInputElement>document.getElementById('password');

    var user:Backendless.User = new Backendless.User();
    user.email = email.value;
    user.password = password.value;
    user.username = username.value;

    Backendless.UserService.register( user, new Backendless.Async( this.userRegistered, this.gotError ) );
  }
}
