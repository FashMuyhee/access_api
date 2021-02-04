"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Student = use("App/Models/Student");
const AccessLog = use("App/Models/Log");
class StudentController {
  /**
   * Show a list of all students.
   * GET students
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ response, view }) {
    const students = await Student.all();
    return response
      .status(200)
      .send({ payload: { type: "success", students } });
  }

  /**
   * Display a single student.
   * GET students/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const student = await Student.find(params.id);
    return response.status(200).send({ payload: { type: "success", student } });
  }

  /**
   * Update student details.
   * PUT or PATCH students/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a student with id.
   * GET students/:id/get_school
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async getSchool({ params, request, response }) {
    const student = await Student.find(params.id);
    return student.school;
  }

  /**
   * Delete a student with id.
   * GET students/:id/get_department
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async getDepartment({ params: id }) {
    const student = await Student.find(id);
    return student.dept;
  }

  /**
   * GET students/:id/get_by_department
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async getByDepartment({ params, request, response }) {
    return this.getDepartment({params});
  }

  /**
   * Delete a student with id.
   * DELETE students/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = StudentController;
