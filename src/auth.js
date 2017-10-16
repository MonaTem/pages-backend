const passport = require('koa-passport');
const {User} = require('./model/user.js');


User.findOne({username: 'admin'}, (err, testUser) => {
  if (!testUser) {
    console.log('admin user did not exist; creating admin user...');
    testUser = new User({
      username: 'admin',
      password: 'password',
    });
    testUser.save();
  }
});

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, done);
});

const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({username: username, password: password}, done);
}));

const GoogleStrategy = require('passport-google-auth').Strategy;
passport.use(new GoogleStrategy({
    clientId: 'your-client-id',
    clientSecret: 'your-secret',
    callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/google/callback',
  },
  (token, tokenSecret, profile, done) => {
    // retrieve user
    User.findOne({google_id: profile.id}, done);
  }
));
