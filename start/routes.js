"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Welcome To Access Control API V0.0.5" };
});

Route.group(() => {
  //? porter routes
  Route.resource("porters", "PorterController").except([
    "create",
    "edit",
    "index",
    "store",
  ]);
  Route.post("porters/login", "PorterController.login").as("porters.login");

  //? admin routes
  Route.resource("admin", "AdminUserController").except([
    "create",
    "edit",
    "index",
    "store",
  ]);

  //? level routes
  Route.resource("levels", "LevelUserController").except([
    "create",
    "edit",
    "update",
  ]);

  //? hostel route
  Route.resource("hostels", "HostelController").except([
    "create",
    "edit",
    "update",
  ]);

  //? student route
  Route.resource("students", "StudentController").except([
    "create",
    "edit",
    "update",
  ]);
  Route.get("students/:id/get_school", "StudentController.getSchool");
  Route.get("students/:id/get_department", "StudentController.getDepartment");
  Route.get(
    "students/:id/get_by_department",
    "StudentController.getByDepartment"
  );

  Route.post("porters/logout", "PorterController.logout").as("porters.logout");
  Route.post("admin/logout", "AdminUserController.logout").as("admin.logout");
}).middleware(["auth"]);

//?admin extra  route
Route.group(() => {
  Route.post("add_hostel", "AdminUserController.addHostel").as(
    "admin.add_hostel"
  );
  Route.post("add_porter", "AdminUserController.addPorter").as(
    "admin.add_porter"
  );
  Route.post("add_student", "AdminUserController.addStudent").as(
    "admin.add_student"
  );
})
  .prefix("admin")
  .middleware(["auth"]);

// non-auth
// ? admin login
Route.post("admin/login", "AdminUserController.login").as("admin.login");
