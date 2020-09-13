"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PorterSchema extends Schema {
  up() {
    this.create("porters", (table) => {
      table.increments();
      table.string("name", 100).notNullable().unique();
      table.string("email", 100).notNullable().unique();
      table.integer("hostel_id").unsigned();
      table.string("password", 30).notNullable();
      table.string("dp", 30).unique();
      table.timestamps();

      table.foreign("hostel_id").references("id").inTable("hostels");
    });
  }

  down() {
    this.drop("porters");
  }
}

module.exports = PorterSchema;
