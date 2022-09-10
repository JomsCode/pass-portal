const connection = require("../config/database_Main_Connection");


let addingNewSubject = (subject, tableName) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(subject.subjectCode);
      let check = await checkSubjectCode(subject, tableName);
      if (check) {
        reject(
          `This Subject code "${subject.subjectCode}" has already exist. Please choose another email`,
          "email"
        );
      } else {
        // let salt = bcrypt.genSaltSync(10);


        let subjectItem = {
          subject_code: subject.subjectCode.trim(),
          subject_description: subject.subjectDescription.trim(),
          units: subject.units,
          // curriculum_year: subject.year,
          // course_assigned: subject.course,
          year_level: subject.year_level,
          semester: subject.semesters
        };

        connection.query(
          `INSERT INTO ${tableName} set ? `,
          subjectItem,
          function (err, rows) {
            if (err) {
              // reject(false);
              throw err;
            }

            resolve("Successfully added to the Curriculum of");
          }
        );

      }
    } catch (e) {
      reject(e);
    }
  });
};

let checkSubjectCode = (subjectObject, tableName) => {
  return new Promise((resolve, reject) => {
    console.log(subjectObject.subjectCode);
    try {
      connection.query(
        ` SELECT * FROM ${tableName} WHERE subject_code = ?`,
        subjectObject.subjectCode,
        function (err, rows) {
          if (err) {
            throw err;
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
  addingNewSubject: addingNewSubject,
};
