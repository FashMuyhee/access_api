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


  // todo login in view route

  //* porter login
  async login({ auth, request, response }) {
    try {
      const { email, password } = request.all();
      const porterAuth = await auth
        .authenticator("porter")
        .attempt(email, password);
      const rules = {
        email: "required|email",
        password: "required",
      };

      const validation = await validate({ email, password }, rules);
      if (validation.fails()) {
        return response
          .status(400)
          .send({ payload: { type: "error", error: validation.messages() } });
      }

      return response
        .status(200)
        .send({ payload: { type: "success", porterAuth } });
    } catch (error) {
      console.log(error);
      return response
        .status(error.status)
        .send({ payload: { type: "error", error } });
    }
  }

  async logout({ auth, response }) {
    // try {
    const user = await auth.authenticator("porter").logout(auth.getUser());
    if (user) return response.json({ ee: "ww" });
    // return response.status(200).send({ message: "Logged Out" });
    // } catch (error) {
    //   return response.status(error.status).send(error);
    // }
  }

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
