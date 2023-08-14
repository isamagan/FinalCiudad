var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//para el formulario de contacto
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//viendo controlador para botonera sería  index.js

var miprogramaRouter=require('./routes/miprograma');
var colaboradoresRouter=require('./routes/colaboradores');
var novedadesRouter=require('./routes/novedades');
var contactoRouter=require('./routes/contacto');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//rutas de la botonera con un solo controlador

app.use('/miprograma',miprogramaRouter);
app.use('/colaboradores',colaboradoresRouter);
app.use('/novedades',novedadesRouter);
app.use('/contacto',contactoRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
