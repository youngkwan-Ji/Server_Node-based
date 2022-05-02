const env = require('config/env');
const define = require('config/define')
const debug = require('debug')('webapplication:server');
const createError = require('http-errors');
const express = require('express');
const httpModule = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const marketRouter = require('./routes/market');

const appModule = express();
var http;


var port = normalizePort(process.env.PORT || '3000');

if (!define.LOAD_WEBAPP){

}else{

  appModule.set('port', port);
  appModule.set('views', path.join(__dirname, 'views'));
  // appModule.set('view engine', 'jade');

  appModule.use(logger('dev'));
  appModule.use(express.json());
  appModule.use(express.urlencoded({ extended: false }));
  appModule.use(cookieParser());
  appModule.use(express.static(path.join(__dirname, 'public')));

  appModule.use('/', indexRouter);
  // appModule.use('/users', usersRouter);
  appModule.use('/market', marketRouter);


// catch 404 and forward to error handler
  appModule.use(function(req, res, next) {
    next(createError(404));
  });

// error handler
  appModule.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  createHTTPServer(appModule)
}



function createHTTPServer(webApp){
  /**
   * Create HTTP server.
   */
  http = httpModule.createServer(webApp);

  /**
   * Listen on provided port, on all network interfaces.
   */
  http.listen(port);
  http.on('error', onError);
  http.on('listening', onListening);
}

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = http.address();
  var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
  debug('Listening on ' + bind);
}



module.exports = http

