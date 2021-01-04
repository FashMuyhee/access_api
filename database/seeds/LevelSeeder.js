"use strict";

/*
|--------------------------------------------------------------------------
| LevelSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Database = use("Database");
const _ = require("lodash");

class LevelSeeder {
  async run() {
    await Database.from("levels").insert([
      {
        level: "ND1",
        created_at: _.now(),
      },
      {
        level: "ND2",
        created_at: _.now(),
      },
      {
        level: "HND1",
        created_at: _.now(),
      },
      {
        level: "HND2",
        created_at: _.now(),
      },
    ]);
  }
}

module.exports = LevelSeeder;
