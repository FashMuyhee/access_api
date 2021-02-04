"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Hostel = use("App/Models/Hostel");
const { validate } = use("Validator");
class HostelController {
  /**
   * Show a list of all hostels.
   * GET hostels
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const hostels = await Hostel.all();
    return response
      .status(error.status)
      .send({ payload: { type: "success", hostels } });
  }
  


  /**
   * Create/save a new hostel.
   * POST hostels
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const data = request.only(["hostel"]);
      const rules = {
        hostel: "required",
      };
      const validation = await validate(data, rules);
      if (validation.fails()) {
        return response
          .status(400)
          .send({ payload: { type: "error", error: validation.messages() } });
      }

      await Hostel.create(data);
      return response.status(200).send({
        payload: { type: "success", message: "Hostel Created Successfully" },
      });
    } catch (error) {
      return response.status(error.status).send(error);
    }
  }

  /**
   * Display a single hostel.
   * GET hostels/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, response, view }) {
    try {
      const hostel = await Hostel.findOrFail(params);
      return response.status(200).send({
        payload: { type: "success", data: hostel },
      });
    } catch (error) {
      return response.status(error.status).send(error);
    }
  }


  /**
   * Delete a hostel with id.
   * DELETE hostels/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = HostelController;
