var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var bodyParser = require('body-parser');
var engine = require('ejs-mate');

var routes = require('./routes/route');
// var routes = require('./routes/web_router');

var app = express();

// view engine setup
app.engine('html',engine);  //引入ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('xiaocc__'));

app.use(session({
	store: new RedisStore({
		host: '127.0.0.1',
		port: 6379,
		// pass: 'yu'
	}),
	resave: false,
	saveUninitialized: false,
	secret: 'keyboard cat'
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  if (!req.session) {
    console.log('出错了');
	}
	console.log('504');
  console.log(req.session.user);
  app.locals.current_user = req.session.user;
  next() // otherwise continue
})

// app.get('/signup',routes.signup);
// app.post('/signup',routes.dlSignup);
// app.get('/signin',routes.signin);
// app.post('/signin',routes.dlSignin);
// app.get('/signout',routes.signout);
// app.get('/', index);
// app.locals.md = md;
// app.locals.config = config;
// app.use(function(req, res, next){
//   // // console.log(app.locals);
//   // if(req.session.user){
//   //   // return res.redirect("/signin");
//   //   console.log('haha');
//   // }
//   console.log(req.session);
//   console.log('-------')
//   app.locals.current_user = req.session.user;
//   next();
// });

// app.use(function (req, res, next) {
//   if (!req.session) {
//    console.log("出错了");
//   }
//   console.log('对了');
//   console.log( req.session.user);
//   app.locals.current_user = req.session.user;
//   next(); // otherwise continue
// })

app.use('/',routes);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  // res.render('error', {
  //   message: err.message,
  //   error: {}
  // });
});


module.exports = app ;
