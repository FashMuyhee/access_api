"use strict";

/*
|--------------------------------------------------------------------------
| AdminSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Database = use("Database");
const Hash = use("Hash");

class AdminSeeder {
  async run() {
    await Database.from("users").insert({
      name: "Admin User",
      email: "admin@accesscontrol.com.ng",
      password: await Hash.make("password"),
      dp: null,
    });
  }
}

module.exports = AdminSeeder;
