const connection = require("../config/database_Main_Connection");
const bcrypt = require("bcryptjs");

let createNewUser = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkEmail(user.email);
      if (check) {
        reject(
          `This email "${user.email}" has already exist. Please choose another email`,
          "email"
        );
      } else {
        let salt = bcrypt.genSaltSync(10);
        let userItem = {
          student_id: user.studentID,
          username: user.firstName,
          first_name: user.firstName,
          middle_initials: user.middleInitial,
          last_name: user.lastName,
          course: user.course,
          year: user.year,
          email: user.email,
          number: user.mobileNumber,
          password: bcrypt.hashSync(user.password, salt)
        };

        connection.query(
          "INSERT INTO students SET ? ",
          userItem,
          function (err, rows) {
            if (err) {
              // reject(false);
              throw err;
            }
            console.log("works");
            resolve("Created a new user successful");
          }
        );


      }
    } catch (e) {
      reject(e);
    }
  });
};

let checkEmail = (email) => {
  return new Promise((resolve, reject) => {
    try {
      connection.query(
        " SELECT * FROM `students` WHERE `email` = ?",
        email,
        function (err, rows) {
          if (err) {
            reject(err);
          }

          if (rows.length > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      );
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  createNewUser: createNewUser,
};
