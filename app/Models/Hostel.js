"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Hostel extends Model {
  porters() {
    return this.hasMany("App/Models/Porter");
  }
}

module.exports = Hostel;
