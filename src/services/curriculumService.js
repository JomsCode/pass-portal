const connection = require("../config/database_Main_Connection");

let createNew = (course, year, acadYear) => {
    return new Promise(async (resolve, reject) => {
        try {

            let tableName = `${course}_curriculum_${year}`
            console.log(tableName)
            let check = await checkCurriculum(tableName);
            if (check != true) {
                reject(check);
            }
            else {
                let query =
                    `CREATE TABLE ${course}_curriculum_${year}(
                     subject_code VARCHAR(16) NOT NULL , 
                     subject_description VARCHAR(45) NOT NULL , 
                     units TINYINT(2) NOT NULL , 
                     year_level VARCHAR(16) NOT NULL , 
                     semester VARCHAR(16) NOT NULL , 
                     PRIMARY KEY (subject_code)
                    )`;

                connection.query(query, function (err) {
                    if (err) {
                        console.log(err)
                        reject(err)

                    } else {
                        let newCurriculum = {
                            table_name: `${course}_curriculum_${year}`,
                            course_assigned: course.toUpperCase(),
                            year: acadYear
                        };
                        let query = `INSERT INTO curriculums SET ?`;
                        // let query = 'INSERT INTO `curriculums` (`table_name`, `course_assigned`, `year`) VALUES ('bsa_18_19', 'bsa', '2018-2019');'
                        connection.query(query, newCurriculum, function (err) {
                            if (err) reject(err)
                        })
                        resolve("The Curriculum has been successfully created")
                    }
                });




            }
        } catch (error) {
            reject(error);
            console.log(error);
        }
        // console.log("yoooooooooo")

    })
}

let checkCurriculum = (tableName) => {

    return new Promise((resolve, reject) => {

        try {

            connection.query(`SELECT * FROM ${tableName}`, function (err, rows) {
                let checkTable;

                if (err) {

                    checkTable = false;

                }
                else {
                    checkTable = true;
                }
                console.log("checkTable: ", checkTable);

                connection.query("SELECT * FROM curriculums WHERE table_name = ? ", tableName,
                    function (err, rows) {
                        let checkList;

                        if (err) {
                            checkList = false;
                        }


                        checkList = (rows.length > 0) ? true : false;

                        // console.log("checkList: ", checkList);
                        // console.log("checkTable: ", checkTable);

                        if (!checkTable && !checkList) {


                            resolve(true);
                        } else if (checkTable && !checkList) {
                            resolve("This table has been already in the database but not listed on Curriculum list. Kindly refer to admin to fix this problem")

                        } else if (checkList && !checkTable) {
                            resolve("This table has been already in Curriculum list but not added on Database. Kindly refer to admin to fix this problem")

                        } else if (checkTable && checkList) {
                            resolve("This table has been already created")
                        }

                    });
            });



        } catch (e) {
            reject(e)
        }

    })
}




let show = (course, academicYear, yearLevel) => {
    return new Promise(async (resolve, reject) => {

        try {
            let query = `SELECT table_name FROM curriculums WHERE course_assigned ='${course}' AND year = '${academicYear}'`
            connection.query(query, function (err, results) {
                if (err) throw err;

                console.log(results);
                if (results.length < 1) {
                    reject("Still no curriculum are made in here");
                } else {


                    connection.query(`SELECT * FROM ${results[0].table_name} WHERE year_level= '${yearLevel}'`, function (err, resultsList) {
                        if (err) throw err;

                        if (resultsList.length > 0) {
                            resolve(resultsList);
                        } else {
                            reject("No subjects are existing here");
                        }
                    })
                }

            })
        } catch (e) {
            reject(e)
            console.log(e)
        }


    })

}
module.exports = {
    createNew: createNew,
    show: show
}