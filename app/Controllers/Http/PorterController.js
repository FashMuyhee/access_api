"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const { validate } = use("Validator");
const Porter = use("App/Models/Porter");

class PorterController {
  /**
   * Show a list of all porters.
   * GET porters
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({ response }) {
    const porters = await Porter.all();
    return response.status(200).send({
      payload: { type: "success", data: porters },
    });
  }

  async store({ request, response }) {
    try {
      const data = request.only(["email", "password", "hostel_id"]);
      const rules = {
        email: "required|email|unique:porters,email",
        password: "required",
        hostel: "required",
      };

      const validation = await validate(data, rules);
      if (validation.fails()) {
        return response
          .status(400)
          .send({ payload: { type: "error", error: validation.messages() } });
      }

      await Porter.create(data);
      return response.status(200).send({
        payload: { type: "success", message: "Regristration Sucessfull" },
      });
    } catch (error) {
      return response.status(error.status).send(error);
    }
  }

  async login({ auth, request, response }) {
    try {
      const { email, password } = request.all();
      const userAuth = await auth.attempt(email, password);

      return response
        .status(200)
        .send({ payload: { type: "success", userAuth } });
    } catch (error) {
      return response
        .status(error.status)
        .send({ payload: { type: "error", error } });
    }
  }

  async logout({ auth, response }) {
    // try {
    const user = await auth.logout(auth.getUser());
    if (user) return response.json({ ee: "ww" });
    // return response.status(200).send({ message: "Logged Out" });
    // } catch (error) {
    //   return response.status(error.status).send(error);
    // }
  }

  /**
   * Create/save a new porter.
   * POST porters
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {}

  /**
   * Display a single porter.
   * GET porters/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Update porter details.
   * PUT or PATCH porters/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a porter with id.
   * DELETE porters/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = PorterController;
