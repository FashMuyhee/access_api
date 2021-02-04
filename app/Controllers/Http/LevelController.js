"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Level = use("App/Models/Level");
const { validate } = use("Validator");
class LevelController {
  /**
   * Show a list of all levels.
   * GET levels
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const levels = await Level.all();
    return response
      .status(error.status)
      .send({ payload: { type: "success", levels } });
  }

  

  /**
   * Create/save a new level.
   * POST levels
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const data = request.only(["level"]);
      const rules = {
        level: "required",
      };
      const validation = await validate(data, rules);
      if (validation.fails()) {
        return response
          .status(400)
          .send({ payload: { type: "error", error: validation.messages() } });
      }

      await Level.create(data);
      return response.status(200).send({
        payload: { type: "success", message: "level Created Successfully" },
      });
    } catch (error) {
      return response.status(error.status).send(error);
    }
  }


  /**
   * Delete a level with id.
   * DELETE levels/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = LevelController;
