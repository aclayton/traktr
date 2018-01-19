import passport from 'passport';
import {Strategy as TraktStrategy} from 'passport-trakt';

export function setup(User, config) {
  passport.use(new TraktStrategy({
    clientID: config.trakt.clientID,
    clientSecret: config.trakt.clientSecret,
    callbackURL: config.trakt.callbackURL
  },
  function(accessToken, refreshToken, params, profile, done) {
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('params', params);
    console.log('profile', profile);
    console.log('done', done);


    User.findOne({'trakt.id': profile.id}).exec()
      .then(user => {
        if(user) {
          return done(null, user);
        }

        user = new User({
          name: profile._json.username,
          // email: profile.emails[0].value,
          role: 'user',
          username: profile._json.username,
          provider: 'trakt',
          trakt: profile._json
        });

        user.save()
          .then(savedUser => done(null, savedUser))
          .catch(err => done(err));
      })
      .catch(err => done(err));
  }));
}
