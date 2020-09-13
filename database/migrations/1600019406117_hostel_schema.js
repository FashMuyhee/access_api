"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class HostelSchema extends Schema {
  up() {
    this.create("hostels", (table) => {
      table.increments();
      table.string("hostel", 30).unique();
      table.timestamps();
    });
  }

  down() {
    this.drop("hostels");
  }
}

module.exports = HostelSchema;
