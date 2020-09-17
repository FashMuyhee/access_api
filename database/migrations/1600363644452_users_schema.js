"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UsersSchema extends Schema {
  up() {
    this.create("users", (table) => {
      table.increments();
      table.string("name", 40);
      table.string("email", 100).notNullable().unique("email");
      table.string("password", 100);
      table.string("dp", 30).unique();
      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UsersSchema;
