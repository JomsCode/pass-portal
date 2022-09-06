const { body, validationResult } = require("express-validator");
const student = require("../services/studentRegistrationService");
const studentsListPage = (req, res) => {
  return res.render("student/student-list");
};

const addNewStudentPage = (req, res) => {
  return res.render("student/addNewStudent", {
    //Errors
    msg: req.flash("info"),

    //DATA

    year: req.flash("year"),
    id: req.flash("studentID"),
    course: req.flash("course"),
    firstName: req.flash("firstName"),
    middleInitial: req.flash("middleInitial"),
    lastName: req.flash("lastName"),
    email: req.flash("email"),
    mobileNumber: req.flash("mobileNumber"),
    password: req.flash("password"),

    //errors
    firstNameStatus: req.flash("firstNameStatus"),
    middleInitialStatus: req.flash("middleInitialStatus"),
    lastNameStatus: req.flash("lastNameStatus"),
    emailStatus: req.flash("emailStatus"),
  });
};

let registerNewStudent = async (req, res) => {
  const validatorMessenger = validationResult(req);

  const list = req.body;

  if (!validatorMessenger.isEmpty()) {
    let errors = [];

    for (i = 0; i < Object.entries(list).length; i++) {
      req.flash(Object.keys(list)[i], Object.values(list)[i]);
    }

    console.log(validatorMessenger);
    validatorMessenger.array().forEach((item) => {
      errors.push(item.msg);

      req.flash(item.param + "Status", "is-invalid");
    });
    req.flash("info", errors);
    return res.redirect("/student-list/addNewStudent");
  } else {
    try {
      let newUser = new Object(list);

      {
        // {
        //   id: studentID,
        //   first_name: firstName,
        //   middle_initials: middleInitial,
        //   last_name: lastName,
        //   year: year,
        //   course: course,
        //   email: email,
        //   mobile_number: mobileNumber,
        //   password: password,
        // };
      }

      await student.createNewUser(newUser).then((value) => {
        req.flash("info", value);
      });

      return res.redirect("/student-list");
    } catch (e) {
      req.flash("info", e);
      console.log("wtf");

      for (i = 0; i < Object.entries(list).length; i++) {
        req.flash(Object.keys(list)[i], Object.values(list)[i]);
      }

      return res.redirect("/student-list/addNewStudent");
    }
  }
};

module.exports = {
  pageView: studentsListPage,
  addNewView: addNewStudentPage,
  registerNewStudent: registerNewStudent,
};
