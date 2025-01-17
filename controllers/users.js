const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error') // in order to use this line, you must have an error.js under sql folder


const getAllUsers = (req, res) => {
  // SELECT ALL USERS
  pool.query("SELECT * FROM test.users", (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getUserById = (req, res) => {
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  let id = req.params.id;
  let sql = "SELECT * FROM test.users WHERE ID = ?" // the "?" is what the user type in
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [id]) 

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createUser = (req, res) => {
  let body = req.body // this line basically request what's on the database and retreive the entire body of data. 
  // INSERT INTO USERS FIRST AND LAST NAME 
  let sql = "INSERT INTO test.users (first_name, last_name) VALUES  (?,?); " // copy and pasted line 36-38 from initilize.sql file
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [body.first_name, body.last_name]) // entire body of data from first name, entire body of data from last name

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}


const updateUserById = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  let body = req.body // you must declare the body so that you can get the entire content of the CARS category
  let id = req.params.id;//specially get id from the request parameter

  let sql = "UPDATE test.users SET first_name = ?, last_name = ? WHERE id =?"  // id =? is the condition

  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [body.first_name, body.last_name, id])
  //the reason why the id is last is b/c id = condition,
  // here we are using the body is b/c body is the content of the entire CARS database, thus, we are using body.first_name, body.last_name

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteUserByFirstName = (req, res) => {
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
  let first_name = req.params.first_name;//specially get id from the request parameter 
  let sql = "DELETE FROM test.users WHERE first_name = ?" // id =? is the condition, CARS is my database; if you are unsure, google delete mysql 
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [first_name])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  })
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserByFirstName
}