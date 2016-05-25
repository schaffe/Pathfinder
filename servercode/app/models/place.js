/* global Backendless */

'use strict';

class Place extends Backendless.ServerCode.PersistenceItem {
  constructor() {
    super();
    
    /**
     @name Place#name
     @type String
     */
    this.name = undefined;

    /**
     @name Place#description
     @type String
     */
    this.description = undefined;

    /**
     @name Place#title
     @type String
     */
    this.title = undefined;

  }
}

module.exports = Backendless.ServerCode.addType(Place);