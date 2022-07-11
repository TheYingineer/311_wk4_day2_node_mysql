const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error') // in order to use this line, you must have an error.js under sql folder


const getAllAddress = (req, res) => {
  // SELECT ALL Address
  pool.query("SELECT * FROM test.usersAddress", (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getAddressById = (req, res) => {
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  let id = req.params.id;
  let sql = "SELECT * FROM test.usersAddress WHERE ID = ?" // the "?" is what the user type in
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [id]) 

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createAddress = (req, res) => {
  let body = req.body // this line basically request what's on the database and retreive the entire body of data. 
  // INSERT INTO USERS FIRST AND LAST NAME 
  let sql = "INSERT INTO test.usersAddress (user_id, address, city, county, state, zip) VALUES  (?,?,?,?,?,?); " 
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [body.user_id, body.address, body.city, body.county, body.state, body.zip]) // entire body of data from user_id, address, city, county, state and zip

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}


const updateAddressById = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  let body = req.body // you must declare the body so that you can get the entire content of the CARS category
  let id = req.params.id;//specially get id from the request parameter

  let sql = "UPDATE test.usersAddress SET user_id = ?, address = ?, city = ?, county = ?, state = ?, zip = ?, WHERE id =?"  // id =? is the condition

  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [body.user_id, body.address, body.city, body.county, body.state, body.zip, id])
  //the reason why the id is last is b/c id = condition,
  // here we are using the body is b/c body is the content of the entire CARS database, thus, we are using body.user_id, body.address, body.city, body.county, body.state, body.zip

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteAddressById = (req, res) => {
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
  let id = req.params.id;//specially get id from the request parameter 
  let sql = "DELETE FROM test.usersAddress WHERE id = ?" // id =? is the condition, Address is my database; if you are unsure, google delete mysql 
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  })
}

module.exports = {
    getAllAddress,
    getAddressById,
    createAddress,
    updateAddressById,
    deleteAddressById
}