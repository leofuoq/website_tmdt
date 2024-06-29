
const express = require('express')
const app = express()
const path = require('path')
const configViewEngine = require('./config/viewEngine')
const webRoutes = require('./routes/web')
require('dotenv').config();
const port = process.env.PORT || 8081
const hostname = process.env.HOST_NAME
const bodyParser = require('body-parser');
const session = require('express-session')

const redis = require('redis');
const redisClient = redis.createClient();
const redisStore = require('connect-redis')(session);
const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback",
    passReqToCallback: true
  },
  function(accessToken, refreshToken, profile, cb,done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    done(null,profile);
  }
));

passport.serializeUser(function(user,done){
    done(null,user)
});

passport.deserializeUser(function(user,done){
    done(null,user);
})