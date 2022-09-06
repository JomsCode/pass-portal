
const subject = require("../services/addingSubjectService")
const connection = require("../config/database_Main_Connection");
const curriculumService = require("../services/curriculumService")
let view = (req, res) => {

  return res.render("curriculum/curriculumlist", {
    error: req.flash("error"),
    acad_year: req.flash("year"),
    course: req.flash("course_assigned")
  });
};



let addNewCurriculum = async (req, res) => {


  let course = req.body.course.toLowerCase()
  let yearSplit = req.body.acadYear.split("-");
  let year = `${yearSplit[0].slice(-2)}_${yearSplit[1].slice(-2)}`
  try {
    await curriculumService.createNew(course, year, req.body.acadYear).then((value) => {
      req.flash("successInfo", value)
      req.session.currentCurriculumInfo = `${req.body.course} ${req.body.acadYear}`
      req.session.tableName = `${course}_curriculum_${year}`
      return res.redirect("/curriculum/addNewSubject")
    })


  } catch (error) {
    req.flash("error", error)
    console.log(error)

    req.flash("course_assigned", req.body.course);
    req.flash("year", req.body.acadYear);

    return res.redirect("/curriculum")
  }

  // let tableName = req.body.course.toLowerCase() +`_ ${req.body.year}`

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

let addNewSubject = async (req, res) => {

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

    console.log("wtf");
    req.flash("info", error);
    req.flash("success", false)
    for (i = 0; i < Object.entries(newSubject).length; i++) {
      req.flash(Object.keys(newSubject)[i], Object.values(newSubject)[i]);
    }
    return res.redirect("/curriculum/addNewSubject");

  }
}

module.exports = {
  pageView: view,
  addNewCurriculum: addNewCurriculum,
  addNewSubjectView: addNewSubjectPage,
  addNewSubject: addNewSubject
};
