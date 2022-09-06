const express = require("express");
const routes = require("../config/routesList");
const auth = require("../auth/studentDataValidator");
const passport = require("passport");
const initPassportLocal = require("../controllers/passportLocalController");

router = express.Router();
initPassportLocal();

const init = (app) => {
  router.get(
    "/",

    // routes.Login_Manager.checkLoggedOut,
    (req, res) => {
      res.render("homepage");
    }
  );

  //LOG-IN

  router.get(
    "/admin",
    // routes.Login_Manager.checkLoggedOut,
    routes.Login_Manager.pageView
  );
  router.post(
    "/admin",
    passport.authenticate("local", {
      successRedirect: "/menu",
      failureRedirect: "/admin",
      successFlash: true,
      failureFlash: true,
    })
  );

  router.get("/logout", routes.Login_Manager.postLogOut);
  router.get("/instructor", routes.Login_Manager.pageView);
  router.get("/student", routes.Login_Manager.pageView);

  //MENU FOR REGISTRAR

  router.get(
    "/menu",
    // routes.Login_Manager.checkLoggedIn,
    routes.Menu.pageView
  );

  // STUDENT LIST

  router.get(
    "/student-list",
    // routes.Login_Manager.checkLoggedIn,

    routes.Student_List.pageView
  );
  router.get("/student-list/addNewStudent", routes.Student_List.addNewView);

  router.post(
    "/student-list/addNewStudent",
    routes.Login_Manager.checkLoggedIn,
    auth.validateData,
    routes.Student_List.registerNewStudent
  );

  router.get(
    "/curriculum",// routes.Login_Manager.checkLoggedIn,
    routes.Curriculum.pageView
  );

  router.post("/curriculum", routes.Curriculum.addNewCurriculum);


  router.get("/curriculum/addNewSubject", routes.Curriculum.addNewSubjectView);
  router.post("/curriculum/addNewSubject", routes.Curriculum.addNewSubject);

  router.get("/staff", routes.Staff.pageView);
  router.get("/staff/addNewStaff", routes.Curriculum.addNewSubjectView);

  return app.use("/", router);
};

module.exports = init;



//FIXME Put back log-ins for both students and admin users



//TODO add roles in sessions