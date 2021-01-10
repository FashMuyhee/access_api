"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const { validate } = use("Validator");
const User = use("App/Models/User");
const Hostel = use("App/Models/Hostel");
const Porter = use("App/Models/Porter");
const Student = use("App/Models/Student");

class AdminUserController {
  // todo login in view route
  // todo profile in view route
  // todo update in view route

  //? admin  login
  async login({ auth, request, response }) {
    try {
      const { email, password } = request.all();
      const userAuth = await auth
        .authenticator("admin")
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
        .send({ payload: { type: "success", userAuth } });
    } catch (error) {
      console.log(error);
      return response
        .status(error.status)
        .send({ payload: { type: "error", error } });
    }
  }

  /*  async logout({ auth, response }) {
    try {
      const user = await auth.authenticator("admin").logout();
      return response.status(200).send({ message: "Logged Out" });
    } catch (error) {
      return response.status(error.status).send(error);
    }
  } */

  /**
   * Display a single porter.
   * GET porters/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async show({ params: { id }, auth, response }) {
    const user = await auth.authenticator("admin").getUser();
    return response.status(200).send({ payload: { data: user } });
  }

  /**
   * Update porter details.
   * PUT or PATCH porters/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  //? create hostel
  async addHostel({ auth, request, response }) {
    try {
      const user = await auth.authenticator("admin").getUser();
      const data = request.only(["hostel"]);

      const rules = {
        hostel: "required|unique:hostels,hostel",
      };

      const validation = await validate(data, rules);
      if (validation.fails()) {
        return response
          .status(400)
          .send({ payload: { type: "error", error: validation.messages() } });
      }

      // const student = await user.student().create(data);
      await Hostel.create(data);
      return response.status(200).send({
        payload: { type: "success", message: "registration successful" },
      });
    } catch (error) {
      return response
        .status(error.status)
        .send({ payload: { type: "error", error } });
    }
  }

  /**
   * Create/save a porter.
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */  
  //? add porter
  async addPorter({ auth, request, response, params: { id } }) {
    try {
      try {
        const user = await auth.authenticator("admin").getUser();

        const { name, email, password, hostel_id } = request.all();
        const data = {
          name,
          email,
          password,
          hostel_id,
        };

        const rules = {
          name: "required|unique:porters,name",
          email: "required|unique:porters,email",
          password: "required",
          hostel_id: "required",
        };

        const validation = await validate(data, rules);
        if (validation.fails()) {
          return response
            .status(400)
            .send({ payload: { type: "error", error: validation.messages() } });
        }

        await Porter.create(data);

        return response.status(200).send({
          payload: {
            type: "success",
            message: `Porter Added`,
          },
        });
      } catch (error) {
        return response.status(error.status).send({
          payload: { type: "error", error: "something went wrong try again" },
        });
      }
    } catch (error) {
      return response
        .status(error.status)
        .send({ payload: { type: "error", error } });
    }
  }

  /**
   * Create/save a porter.
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */

    //? add student
  async addStudent({ auth, request, response, params: { id } }) {
    try {
      try {
        const user = await auth.authenticator("admin").getUser();

        const {
          name,
          email,
          password,
          hostel_id,
          room_no,
          matric_no,
          dept,
        } = request.all();
        const data = {
          name,
          email,
          password,
          hostel_id,
          matric_no,
          dept,
          room_no,
        };

        const rules = {
          name: "required",
          email: "required|unique:students,email",
          password: "required",
          hostel_id: "required",
          room_no: "required",
          dept: "required",
          matric_no: "required|unique:students,matric_no",
        };

        const validation = await validate(data, rules);
        if (validation.fails()) {
          return response
            .status(400)
            .send({ payload: { type: "error", error: validation.messages() } });
        }

        await Student.create(data);

        return response.status(200).send({
          payload: {
            type: "success",
            message: `Student Added`,
          },
        });
      } catch (error) {
        return response.status(error.status).send({
          payload: { type: "error", error: "something went wrong try again" },
        });
      }
    } catch (error) {
      return response
        .status(error.status)
        .send({ payload: { type: "error", error } });
    }
  }
}
module.exports = AdminUserController;
