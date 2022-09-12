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

let editSubject = () => {

}


module.exports = {
    checkSubject: checkSubject,
    editSubject: editSubject,
    deleteSubject: deleteSubject
}