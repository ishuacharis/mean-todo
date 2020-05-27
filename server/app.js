const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan');
const session = require('express-session')
const passport = require('passport')
const cors = require('cors')


const indexRouter = require('./routes/index')
const authRouter  = require('./routes/auth')
const usersRouter = require('./routes/user')
const todosRouter  = require('./routes/todos')

const app = express();
const TWO_HOURS = 1000 * 60 * 60 * 2
const {
  NODE_ENV = 'development',
  SESS_NAME = 'sid',
  SESS_SECRET = 'secret',
  SESS_LIFETIME = TWO_HOURS
} = process.env
const IN_PROD  = NODE_ENV === 'production'
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

require('./auth/passport')
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
//app.use(express.static(path.join(__dirname, 'public')));

//this is suitable for server side application with nodejs as the client and server
/*app.use(session({
  name: SESS_NAME,
  resave: false,
  saveUninitialized: false,
  secret: SESS_SECRET,
  cookie:{
    maxAge: SESS_LIFETIME,
    sameSite: true,
    secure: IN_PROD
  }
}))*/
app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/user' ,
passport.authenticate('jwt', {
  session: false
}),
usersRouter);

app.use('/todos', passport.authenticate('jwt', {
  session: false
}), 
todosRouter)

app.use(function (err, req, res, next) {
  if(err){
    console.log(err.message)
  }
  /*res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
    status: err.status
  });*/
});

/*
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

*/

module.exports = app;
