const connection = require("../config/database_Main_Connection")


let checkSubject = (subjectCode, tableName) => {
    return new Promise(async (resolve, reject) => {
        try {
            connection.query(`SELECT * FROM ${tableName} WHERE subject_code ='${subjectCode}'`,
                function (error, results) {
                    if (error) throw error;
                    if (results.length > 0) {
                        resolve(results);
                    }
                })
        } catch (error) {
            reject(error)

        }
    })


    // function (error, results) {
    //     if (error) throw error;
    //     if (results.length > 0) {
    //         req.flash("subjectDescription", results[0].subject_description)

    //         req.flash("showPanel", true)

    //         return res.redirect("/curriculum")
    //     }
    // })

}
let deleteSubject = (subjectCode, tableName) => {
    return new Promise((resolve, reject) => {
        try {
            console.log(subjectCode)
            console.log(tableName)
            connection.query(`DELETE FROM ${tableName} WHERE subject_code = '${subjectCode}'`, function (error, results) {
                if (error) throw error;
                console.log(results);
                resolve("Deleted successfully")

            })
        } catch (error) {
            reject(error)

        }


    })
}

let editSubject = (subjectCode, tableName, editedDataList) => {
    return new Promise((resolve, reject) => {

        let subjectItem = {
            subject_code: editedDataList.subject_code.trim(),
            subject_description: editedDataList.subject_description.trim(),
            units: editedDataList.units,
            year_level: editedDataList.year_level,
            semester: editedDataList.semesters
        };
        let query = `UPDATE ${tableName} SET ? WHERE subject_code ='${subjectCode}'`;
        connection.query(query, subjectItem, function (err) {
            if (err) {
                if (err.code = 'ER_DUP_ENTRY') {
                    reject(`Duplicate entry for ${subjectCode} | ${subjectItem.subject_description}`);
                }
            }
            resolve("Successfuly Edited");

        });

    })
}


module.exports = {
    checkSubject: checkSubject,
    editSubject: editSubject,
    deleteSubject: deleteSubject
}