const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({ extended: true });
app.use(cookieParser());

app.set('view engine', 'pug');

app.listen(3000, () => {
  console.log('The server is listening on port 3000.');
});
