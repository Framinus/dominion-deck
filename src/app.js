require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
// const cookieParser = require('cookie-parser');
const path = require('path');
const routes = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(session({
  key: 'user_sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 10 * 600000}
}))

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('public'));

app.use('/', routes);

app.listen(3000, () => {
  console.log('The server is listening on port 3000.');
});
