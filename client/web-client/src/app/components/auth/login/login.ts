/**
 * Created by bubble on 17.05.16.
 */

import {Component} from "angular2/core";
const Backendless = require('backendless');

@Component({
  selector: 'login',
  templateUrl: 'app/components/auth/login/login.html',
  styleUrls: ['app/components/auth/login/login.css']
})export class Login {
  userLoggedIn( user )
  {
    console.log( "user has logged in" );
    window.history.back();
    location.reload();
  }

  gotError( err ) // see more on error handling
  {
    console.log( "error message - " + err.message );
    console.log( "error code - " + err.statusCode );
  }

  validate(email: string, password: string){
  //
  }

  login(){
    let email = <HTMLInputElement>document.getElementById('email');
    let password = <HTMLInputElement>document.getElementById('password');
    this.validate(email.value, password.value);
    Backendless.UserService.login( email.value, password.value, true, new Backendless.Async( this.userLoggedIn, this.gotError ) );
  }

}
