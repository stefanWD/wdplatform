var express = require('express'),path = require('path'),favicon = require('static-favicon'), logger = require('morgan'),
cookieParser = require('cookie-parser'), bodyParser = require('body-parser'),
fs = require('fs'), https=require('https'), passport= require('passport'),
GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
cookieSession=require('cookie-session'),mongoClient=require('mongodb').MongoClient;


var config= require('./configuration/configuration.js')();

// request's HTML
var index =require('./controllers/Index.js');
var test= require('./controllers/Test.js');

//HTML
///request's JSON
var firstLogIn=require('./controllers/FirstLogIn.js');
var inviteUser= require('./controllers/InviteUser.js');
// request's JSON
var mongodb=null;
mongoClient.connect('mongodb://' + config.mongo.host + ':' + config.mongo.port + '/WD_Platform', function(err, db) {
mongodb=db;
});


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({

    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {

      return done(null, profile);
    });
  }
));


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { 
    req.db=mongodb;
    return next(); }
  res.redirect('/');
}

var options = {
  key: fs.readFileSync(config.Key),
  cert: fs.readFileSync(config.Cert)
};


var app = express();

// view engine setup

app.set('views', path.join(__dirname, 'templates'));
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(cookieSession({secret: '3/912&621(Das3@#/"#4asdasd_213Asdvq321sa_2314r1SADq2erf@e42q34sE12'}));
app.use(passport.initialize());
app.use(passport.session());




app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile',
                                            'https://www.googleapis.com/auth/userinfo.email'] }),
  function(req, res){

  });


app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {

    res.redirect('/log-in');
  });

app.all('/first-login',ensureAuthenticated,function(req,res,next){
var page= new firstLogIn(req,res,next);
page.run();


});


app.all('/invite-user',ensureAuthenticated,function(req,res,next){
  var page= new inviteUser(req,res,next);
  page.run();
});


app.all('/log-in',function(req,res,next){
  var page= new test(req,res,next);
  page.run();

});
app.all('/log-out',ensureAuthenticated,function(req,res,next){
  req.logout();
  res.redirect('/');

});



app.all('/',function(req,res,next){
  var page = new index(req,res,next);
  page.run();
});



// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json(500, {
        message: err.message,
        error: {}
    });
});




app.listen(config.port);
//https.createServer(options,app).listen(8080);
//module.exports = app;
