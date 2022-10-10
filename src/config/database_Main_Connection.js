// require("dotenv").config();
const mysql = require("mysql");

require("dotenv").config();


const connection = mysql.createConnection({
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_name,
});

// connection.connect(function (error) {
//   if (error) { console.log(error, "\nSET YOUR FCKING XAMPP SERVER PROPERLY,YOU DUMB!!") } else { console.log("Pasok ka na sa Harvard University!!!!!!!!"); };

// });

module.exports = connection;
