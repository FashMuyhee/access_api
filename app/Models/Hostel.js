"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Hostel extends Model {
  
  //?log to hostel
  logs() {
    return this.hasMany("App/Models/Log");
  }
}

module.exports = Hostel;
