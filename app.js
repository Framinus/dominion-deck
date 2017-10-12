const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine','pug');
app.use(require('./routes/index.js'));
app.use(require('./routes/history.js'));
app.use(require('./routes/formsubmit.js'));

app.listen(3000, () => {
  console.log('The server is listening on port 3000.');
});
