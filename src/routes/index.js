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
      res.render("./dashboards/registrarDashBoard");
      // res.render("homepage");
    }
  );


  //LOG-IN


  router.get(
    "/login",
    // routes.Login_Manager.checkLoggedOut,
    routes.Login_Manager.pageView
  );
  router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/menu",
      failureRedirect: "/login",
      successFlash: true,
      failureFlash: true,
    })
  );

  router.get("/logout", routes.Login_Manager.postLogOut);


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

  router.post("/curriculum/createNew", routes.Curriculum.addNewCurriculum);

  router.post("/curriculum/edit", routes.Curriculum.editInfo);

  router.post("/curriculum/edit/save", routes.Curriculum.editSubject);

  router.post("/curriculum/edit/delete", routes.Curriculum.deleteSubject);

  router.post("/curriculum/show", routes.Curriculum.show);

  router.get("/curriculum/addNewSubject", routes.Curriculum.addNewSubjectView);

  router.post("/curriculum/saveNewSubject", routes.Curriculum.saveNewSubject);

  router.post("/curriculum/addNewSubject", routes.Curriculum.addNewSubject)

  router.get("/staff", routes.Staff.pageView);
  router.get("/staff/addNewStaff", routes.Curriculum.addNewSubjectView);

  return app.use("/", router);
};

module.exports = init;



//FIXME Put back log-ins for both students and admin users



//TODO add roles in sessions