module.exports = {
  Login_Manager: require("../controllers/loginController"),
  Menu: require("../routes/menu"),

  Student_List: require("../controllers/studentListController"),
  Staff: require("../controllers/staffController"),
  Curriculum: require("../controllers/curriculumListController"),
  Grades: require("../routes/displayGrades"),
  Accounts: require("../routes/accountManager"),
  Accountabilities: require("../routes/accountabilities"),
};
