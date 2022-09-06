const passport = require("passport");
const passportLocal = require("passport-local");
const loginService = require("../services/loginService");
let LocalStrategy = passportLocal.Strategy;

let initPassportLocal = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "studentID",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, studentID, password, done) => {
        try {
          let user = await loginService.findUserBySchoolID(studentID);
          if (!user) {
            return done(
              null,
              false,
              req.flash(
                "errors",
                `${studentID} ba sabi mo? di yan pumapasok dito `
              )
            );
          }
          if (user) {
            let match = await loginService.comparePassword(user, password);
            console.log(user, password);
            if (!match) {
              return done(null, false, req.flash("errors", match));
            } else {
              return done(null, user, null);
            }
          }
        } catch (err) {
          console.log("somethings wrongs herebkjkgj", err);
          return done(null, false, err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.student_id);
  });

  passport.deserializeUser((student_id, done) => {
    loginService
      .findUserBySchoolID(student_id)
      .then((user) => {
        return done(null, user);
      })
      .catch((error) => {
        return done(error, null);
      });
  });
};
module.exports = initPassportLocal;
