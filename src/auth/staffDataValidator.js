const { check } = require("express-validator");

let validateData = [
  check("studentID", "Kindly put a valid  student id here").isString(),
  check("email", "Something was wrong, kindly put a valid email here")
    .isEmail()
    .normalizeEmail(),
  check("password", "Kahit 4 letters lang muna").isLength({
    min: 4,
  }),
  check("firstName", "Kindly put a valid  first name here").isString(),
  check("middleInitial", "Kindly put a valid middle initial here").isString(),
  check("lastName", "Kindly put a valid last name here").isString(),
  check(
    "mobileNumber",
    "Kindly put a valid mobile number here"
  ).isMobilePhone(),
];

module.exports = { validateData: validateData };
