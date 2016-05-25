/* global Backendless */

'use strict';

class Tag extends Backendless.ServerCode.PersistenceItem {
  constructor() {
    super();
    
    /**
     @name Tag#name
     @type String
     */
    this.name = undefined;

  }
}

module.exports = Backendless.ServerCode.addType(Tag);