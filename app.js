
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')

require('./passport')

var app = express();


mongoose
  .connect("mongodb://localhost:27017/passport-auth", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex:true
  })
  .then(() => console.log("DB connected...^"));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



/*
 *  Calling routes
 */

app.use(require('./routes/users'))


app.listen(3000, () => {
  console.log(`Server on running...^`)
})
