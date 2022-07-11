const express = require("express");
// require("dotenv").config()
const bodyParser = require("body-parser");
const usersRouter = require('./routers/users');
const addressRouter = require('./routers/usersAddress');
const contactRouter = require('./routers/usersContact');

const app = express();
const port = process.env.PORT || 4001;

app.use(bodyParser.json())
// line 2 and line 8 here are the same as using app.use(express.json())

app.use(usersRouter) //Route: users
app.use(addressRouter) //Router: usersContact
app.use(contactRouter) //Router: usersAddress

app.get('/', (req, res) => {
  res.send('Welcome to our server Homepage!')
})

app.listen(port, () => {
 console.log(`Web server is listening on port ${port}!`);
});
