const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User= require('../api/models/employees')
const config= require('../config/main.js')

// var cookieExtractor = function(req) {
//   var token = null;
//   if (req && req.cookies) token = req.cookies['jwt'];
//   return token;
// };
passport.use(new JWTStrategy({
      jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("jwt"),
      secretOrKey: config.secret_key 
      },function(jwt_payload, done) {
      
      User.findOne({id: jwt_payload.id}, function(err, user) {
        if (err) {
          return done(err, false);
        } 
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
  }));

 
passport.use(new LocalStrategy(
    function(username, password, cb) {
              //Assume there is a DB module pproviding a global UserModel
      return User.findOne({username:username})
      .then(user => {
          if (!user) {
              return cb(null, false, {message: 'Incorrect username or password.'});
          }

          return cb(null, user, {
              message: 'Logged In Successfully'
          });
      })
      .catch(err => {
          return cb(err);
      })
  }
));
