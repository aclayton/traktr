import passport from 'passport';
import {Strategy as TraktStrategy} from 'passport-trakt';

export function setup(User, config) {
  passport.use(new TraktStrategy({
    clientID: config.trakt.clientID,
    clientSecret: config.trakt.clientSecret,
    callbackURL: config.trakt.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('profile', profile);
    console.log('done', done);


    // User.findOne({'google.id': profile.id}).exec()
    //   .then(user => {
    //     if(user) {
    //       return done(null, user);
    //     }
    //
    //     user = new User({
    //       name: profile.displayName,
    //       email: profile.emails[0].value,
    //       role: 'user',
    //       username: profile.emails[0].value.split('@')[0],
    //       provider: 'google',
    //       google: profile._json
    //     });
    //     user.save()
    //       .then(savedUser => done(null, savedUser))
    //       .catch(err => done(err));
    //   })
    //   .catch(err => done(err));
  }));
}
