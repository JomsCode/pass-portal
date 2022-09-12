
const subject = require("../services/addingSubjectService")
const connection = require("../config/database_Main_Connection");
const curriculumService = require("../services/curriculumService");
const subjectService = require("../services/subjectEditService");

// const { query } = require("express");


function preciseYear(academicYear) {

  let yearSplit = academicYear.split("-");
  return `${yearSplit[0].slice(-2)}_${yearSplit[1].slice(-2)}`;


}



let view = async (req, res) => {


  if (req.session.course == undefined) req.session.course = "BSA";

  if (req.session.academicYear == undefined) req.session.academicYear = "2018-2019";

  if (req.session.yearLevel == undefined) req.session.yearLevel = "1st";
  if (req.session.tableName == undefined) {
    req.session.tableName = `${req.session.course.toLowerCase()}_curriculum_${preciseYear(req.session.academicYear)}`
  }

  let course = req.session.course;
  let academicYear = req.session.academicYear;
  let yearLevel = req.session.yearLevel;
  let tableName = req.session.tableName;

  try {
    await curriculumService.show(tableName, course, academicYear, yearLevel).then(value => {

      if (typeof (value) == "string") {
        req.flash("errorOnTable", value)

      } else {
        // req.flash("results", value);
        req.session.results = value
      }



    });

  } catch (e) {
    console.log("error: ", e)
    req.flash("errorOnTable", e)
    req.session.results = null;


  }
  let deletePanel = req.flash("deletePanel");


  return res.render("curriculum/curriculumlist", {
    error: req.flash("error"),
    acad_year: req.flash("year"),
    course: req.flash("course_assigned"),
    results: req.session.results,
    errorOnTable: req.flash("errorOnTable"),
    academicYear: req.session.academicYear,
    courseOnTable: req.session.course.toUpperCase(),
    tableName: req.session.tableName,
    yearLevel: req.session.yearLevel,
    deletePanel: deletePanel,
    editPanel: req.flash("editPanel"),
    subjectDescription: req.flash("subjectDescription"),


  });




}

let editInfo = async (req, res) => {
  try {

    if (req.body.delete) {
      await subjectService.checkSubject(req.body.delete, req.session.tableName).then(value => {
        req.flash("subjectDescription", value[0].subject_description)

        req.flash("deletePanel", true)
        req.flash("code", req.body.delete);

        return res.redirect("/curriculum")
      });



    } else if (req.body.edit) {
      await subjectService.checkSubject(req.body.edit, req.session.tableName).then(value => {
        req.flash("subjectEdit", value)

        req.flash("editPanel", true)
        req.flash("code", req.body.edit);

        return res.redirect("/curriculum")
      });
    }


  } catch (error) {
    console.log(error)

  }

}

let deleteSubject = async (req, res) => {
  try {
    let subjectCode = req.flash("code");
    await subjectService.deleteSubject(subjectCode[0], req.session.tableName).then((value => {
      console.log(value)
      return res.redirect("/curriculum");

    }))
  } catch (error) {
    console.log(error)

  }

}
let editSubject = async (req, res) => {
  try {
    let subjectCode = req.flash("code");
    await subjectService.editubject(subjectCode[0], req.session.tableName).then((value => {
      console.log(value)
      return res.redirect("/curriculum");

    }))
  } catch (error) {
    console.log(error)

  }

}



let showList = (req, res) => {

  let academicYear = req.body.academicYear;
  let year = preciseYear(req.session.academicYear);

  let course = req.body.courseAndYear.split(" ")[0]
  let yearLevel = req.body.courseAndYear.split(" ")[1]

  req.session.course = course;
  req.session.academicYear = academicYear;
  req.session.yearLevel = yearLevel;


  req.session.tableName = `${course.toLowerCase()}_curriculum_${year}`;

  res.redirect("/curriculum")

}


let addNewSubjectPage = (req, res) => {
  return res.render("curriculum/addNewSubject", {


    msg: req.flash("info"),
    courseNAcadYear: req.session.currentCurriculumInfo,

    subject_code: req.flash("subjectCode"),
    subject_description: req.flash("subjectDescription"),
    units: req.flash("units"),
    semester: req.flash("semesters"),
    year_level: req.flash("year_level"),


    success: req.flash("success"),
    successinfo: req.flash("successinfo")

  });
};


let addNewSubject = (req, res) => {

  req.session.currentCurriculumInfo = `${req.session.course} ${req.session.academicYear}`
  return res.redirect("/curriculum/addNewSubject");


}




let saveNewSubject = async (req, res) => {

  const newSubject = new Object(req.body)

  console.log(newSubject)
  try {
    console.log(req.session.tableName)
    await subject.addingNewSubject(newSubject, req.session.tableName).then((value) => {
      req.flash("success", true);
      req.flash("successinfo", `${value} ${req.session.currentCurriculumInfo}`);
    });

    return res.redirect("/curriculum/addNewSubject");
  } catch (error) {

    req.flash("info", error);
    req.flash("success", false);
    for (i = 0; i < Object.entries(newSubject).length; i++) {
      req.flash(Object.keys(newSubject)[i], Object.values(newSubject)[i]);
    }
    return res.redirect("/curriculum/addNewSubject");

  }
}



let addNewCurriculum = async (req, res) => {


  let course = req.body.course.toLowerCase();
  let year = preciseYear(req.body.acadYear);

  req.session.course = course;
  req.session.academicYear = req.body.acadYear;

  try {
    await curriculumService.createNew(course, year, req.body.acadYear).then((value) => {
      req.flash("successInfo", value);

      req.session.currentCurriculumInfo = `${req.body.course} ${req.body.acadYear}`;
      req.session.tableName = `${course}_curriculum_${year}`;


      return res.redirect("/curriculum/addNewSubject");

    })


  } catch (error) {
    req.flash("course_assigned", req.body.course);
    req.flash("year", req.body.acadYear);
    req.flash("error", error)



    return res.redirect("/curriculum")
  }

  // let tableName = req.body.course.toLowerCase() +`_ ${ req.body.year }`

}

module.exports = {
  pageView: view,
  addNewCurriculum: addNewCurriculum,
  addNewSubjectView: addNewSubjectPage,
  saveNewSubject: saveNewSubject,
  addNewSubject: addNewSubject,
  show: showList,
  editInfo: editInfo,
  deleteSubject: deleteSubject
};
