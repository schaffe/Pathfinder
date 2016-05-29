import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';

import {SeedApp} from './app/seed-app';

const Backendless = require('backendless');

var APP_ID:string = '7B2AF945-909B-6DB6-FF64-C772BC00BD00';
var APP_KEY:string = 'ED9F0C34-3A5E-CB75-FF86-0E4AE53E1400';
var APP_VER:string = 'v1';
Backendless.initApp(APP_ID, APP_KEY, APP_VER);
Backendless.enablePromises();

bootstrap(SeedApp, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy})
])
.catch(err => console.error(err));
