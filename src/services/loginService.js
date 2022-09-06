const connection = require("../config/database_Main_Connection");
const bcrypt = require("bcryptjs");

let findUserBySchoolID = (studentID) => {
  return new Promise((resolve, reject) => {
    try {
      const roleCheck = /\d{2}-\d{4}/;
      let sqlQuerry = "";
      if (roleCheck.test(studentID)) {
        sqlQuerry = "SELECT * FROM students WHERE student_id =?";
      } else {
        sqlQuerry = "SELECT * FROM Admin_users WHERE id = ?";
      }

      connection.query(sql, studentID, (errors, rows) => {
        if (errors) reject(errors);
        // throw errors;

        //Users' student ID index is 0

        let user = rows[0];

        resolve(user);
      });
    } catch (error) {
      console.log("somethings wrongs here", error);
      reject(error);
    }
  });
};

let comparePassword = (user, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const isMatch = await bcrypt.compare(password, user.password);

      // console.log(password, user.password);
      // console.log(await bcrypt.compare(password, user.password));

      await bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          resolve(true);
        } else {
          resolve(`The password that you've entered is incorrect`);
        }
      });
    } catch (e) {
      console.log("somethings wrongs here", e);
      reject(e);
    }
  });
};

module.exports = {
  findUserBySchoolID: findUserBySchoolID,
  comparePassword: comparePassword,
};
