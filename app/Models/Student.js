"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Student extends Model {
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
