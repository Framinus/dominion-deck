const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./routes/index.js'));
app.use(require('./routes/history.js'));
app.use(require('./routes/signup.js'));
app.use(require('./routes/login.js'));
app.use(require('./routes/logout.js'));
app.use(require('./routes/game.js'));

app.listen(3000, () => {
  console.log('The server is listening on port 3000.');
});
