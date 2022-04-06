// const env = require('/config/env');
import {env} from '/config/env'
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const appModule = express();

import {LOAD_WEBAPP} from '/config/define'

export default () => {
  if (!LOAD_WEBAPP){
    return appModule
  }else{
// view engine setup
    appModule.set('port', env.port)

    appModule.set('views', path.join(__dirname, 'views'));
    appModule.set('view engine', 'jade');

    appModule.use(logger('dev'));
    appModule.use(express.json());
    appModule.use(express.urlencoded({ extended: false }));
    appModule.use(cookieParser());
    appModule.use(express.static(path.join(__dirname, 'public')));

    appModule.use('/', indexRouter);
    appModule.use('/users', usersRouter);

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

    return appModule
  }
}


