/* global Backendless */

'use strict';

class Likes extends Backendless.ServerCode.PersistenceItem {
  constructor() {
    super();
    
    /**
     @name Likes#user
     @type BackendlessUser
     */
    this.user = undefined;

    /**
     @name Likes#place
     @type Place
     */
    this.place = undefined;

    /**
     @name Likes#tag
     @type Tag
     */
    this.tag = undefined;

  }
}

module.exports = Backendless.ServerCode.addType(Likes);