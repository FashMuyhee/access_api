"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class StudentsSchema extends Schema {
  up() {
    this.create("students", (table) => {
      table.increments();
      table.string("name", 100).notNullable().unique();
      table.string("email", 100).notNullable().unique();
      table.integer("hostel_id").unsigned();
      table.string("room_no").notNullable();
      table.string("matric_no").notNullable();
      table.string("dept").notNullable();
      table.string("password", 30).notNullable();
      table.string("dp", 30).unique();
      table.timestamps();

      table.foreign("hostel_id").references("id").inTable("hostels");
    });
  }

  down() {
    this.drop("students");
  }
}

module.exports = StudentsSchema;
