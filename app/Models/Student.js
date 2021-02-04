"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const Hash = use("Hash");

class Student extends Model {
  static boot() {
    super.boot();

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook("beforeSave", async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }
  
  static get hidden() {
    return ["password"];
  }

  //? hostel to student
  hostel() {
    return this.hasMany("App/Models/Hostel");
  }

  //? hostel to student
  log() {
    return this.hasMany("App/Models/Log");
  }

  //? session to student
  session() {
    return this.hasMany("App/Models/Session");
  }

  //? school to student
  school() {
    return this.hasMany("App/Models/School");
  }

  //? department to student
  department() {
    return this.hasMany("App/Models/Department");
  }

  //? LEvel to student
  level() {
    return this.hasMany("App/Models/Level");
  }
}

module.exports = Student;
