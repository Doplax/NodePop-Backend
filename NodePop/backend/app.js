var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('./lib/connectMongoose');

const Agente = require('./models/Agente')
const agentes = Agente.find().then((results) => {
  console.log(results);
}).catch((err) => console.log(err));



//var indexRouter = ;
//var usersRouter = ;

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.locals.title = 'NodeApp';

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/pdfs', express.static(path.join(__dirname, 'public')));

//app.use((req, res, next) => {
//  console.log('Ha llegado una petición a', req.url);
//  next();
//})

/**
 * Rutas del API
 */


app.use('/api/agentes', require('./routes/api/agentes'));


/**
 * Rutas del website
 */
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

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
