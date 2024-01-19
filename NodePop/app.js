var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const MongoStore = require('connect-mongo');

const session = require('express-session');
const sessionAuthMiddleware = require('./lib/sessionAuthMiddleware')
const cors = require('cors');
const i18n = require('./lib/i18nConfigure');
const FeaturesController = require('./controller/FeaturesController')
const LangController = require('./controller/LangController')
const LoginController = require('./controller/LoginController')
const PrivadoController = require('./controller/PrivadoController')
const AgentesController = require('./controller/AgentesController')


require('./lib/connectMongoose')


//const basicAuthMiddleware = require('./lib/basicAuthMiddleware'); // Para control de inicio de sesión
const swaggerMiddleware = require('./lib/swaggerUIMiddleware');
const { Session } = require('inspector');

require('./lib/connectMongoose');


var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.locals.title = 'NodeApp';

// Middleware
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




/**
 * Rutas del website
 */

const featuresController = new FeaturesController();
const langController = new LangController();
const loginController = new LoginController();
const privadoController = new PrivadoController();
const agentesController = new AgentesController();

app.use(i18n.init)

app.use(session({
  name: 'nodeapp-session', // nombre de la cookie
  secret: 'as98987asd98ashiujkasas768tasdgyy',
  saveUninitialized: true, // Forces a session that is "uninitialized" to be saved to the store
  resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 2 // 2d - expiración de la sesión por inactividad
  },
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI})
}));

// Hacemos que el objeto session esté disponible al renderizar las vistas
app.use((req,res,next) => {
  res.locals.session = req.session;
  next();
});
app.use('/', require('./routes/index'));
app.get('/features', featuresController.index)
app.get('/change-locale', langController.changeLocale)
app.get('/login', loginController.index)
app.post('/login', loginController.post)
app.get('/logout', loginController.logout)
app.get('/privado', sessionAuthMiddleware, privadoController.index)
app.get('/agentes-new', sessionAuthMiddleware, agentesController.new)


//app.use('/create-product', require('./routes/createProduct'));

// catch 404 and forward to error handler
//app.use('/api-doc', swaggerMiddleware);
//app.use('/api/products', require('./routes/api/products'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // comprobar si es un error de validación
  if (err.array){
    const errorInfo = err.array[0];
    console.log(errorInfo);
    err.message = `Error en ${errorInfo.location}, parámetro ${errorInfo.path} ${errorInfo.msg}`;
    err.status = 422
  }

  // Si lo que ha fallado es una perición al api, responder con un JSON
  if (req.originalUrl.startsWith('/api/')){
    res.json({error: err.message});
    return; // Para que no se siga ejecutando el código de abajo
  }

  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
