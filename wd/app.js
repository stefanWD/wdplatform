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
var userAccount=require('./controllers/UserAccount.js');
var inviteUser= require('./controllers/InviteUser.js');
var cities= require("./controllers/Cities.js");
var countries= require("./controllers/Countries.js");
var editMyAccountUser=require("./controllers/EditUserAccount.js");
// request's JSON


//util's
var checkRole= require('./util/CheckRole.js');
var checkInvitation= require('./util/CheckInvitation.js');

//util's

// create DB connection
var mongodb=null;
mongoClient.connect('mongodb://dev.wiredelta.com:3100', function(err, db) {
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
    var email= req.user.emails[0].value;
      if(checkRole(email)===undefined)
        res.redirect('/log-in');
      else
       checkInvitation(mongodb,email,function(result){
        //if result is undefined it means an invitation has not been sent, so the user is unauthorized
        console.log(result);
        if(result)
          res.redirect('/first-login');
        else
          res.redirect('/log-out');
       });
  });


app.all('/get-countries',ensureAuthenticated,function(req,res,next){
var controller = new countries(req,res,next);
controller.run();
});

app.all('/get-cities',ensureAuthenticated,function(req,res,next){
var controller = new cities(req,res,next);
controller.run();
});


app.all('/sign-up',ensureAuthenticated,function(req,res,next){
var controller = new userAccount(req,res,next);
controller.run();
});


app.all('/edit-myaccount-user',ensureAuthenticated,function(req,res,next){
var controller = new editMyAccountUser(req,res,next);
controller.run();
});

app.all('/first-login',ensureAuthenticated,function(req,res,next){
res.render('my-account.html');

});


app.all('/invite-user',function(req,res,next){
  var controller= new inviteUser(req,res,next);
  req.db=mongodb;
  controller.run();
});


app.all('/log-in',function(req,res,next){
  var controller= new test(req,res,next);
  controller.run();

});
app.all('/log-out',ensureAuthenticated,function(req,res,next){
  req.logout();
  res.redirect('/');

});



app.all('/',function(req,res,next){
  var handle = new index(req,res,next);
  handle.run();
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



console.log(config.port+''+config.host);
app.listen(config.port,config.host);
//https.createServer(options,app).listen(8080);
//module.exports = app;
