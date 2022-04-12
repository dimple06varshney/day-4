/**
 * Express is a Node.js web application framework
 */
 const express = require("express");
 var path = require('path');
 var createError = require('http-errors');
 const profileRouter = require('./controllers/profile.controller');
 
 const app = express();
 
 /**
  * Initializing the mongoose connection.
  */
 
 // view engine setup
 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'jade');
 app.use(express.json());
 app.use(express.urlencoded({ extended: false }));
 app.use('/profile',profileRouter)
 
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