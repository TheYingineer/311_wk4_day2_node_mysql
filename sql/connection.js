const mysql = require('mysql')


// Navigate to the `sql/connections.js` file and alter the following fields to reflect your database setup:

// ```
//   host: 'localhost',
//   user: 'root',
//   password: 'password',
//   database: 'admin'
// ```

// These will be the same credentials we used to set up a connection in MySQL Workbench.

class Connection {
  constructor() {
    if (!this.pool) {
      console.log('creating connection...')
      this.pool = mysql.createPool({
        connectionLimit: 100,
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'admin'
      }) //ASK CESAR: How can I create the npm i dotenv without crashing the program

      return this.pool
    }

    return this.pool
  }
}

const instance = new Connection()

module.exports = instance;