
import passport from "passport";
import { ModelUsers } from "~/models/model/users.model";
import { hashPassword } from "~/utils/hashPassword";


/* eslint-disable @typescript-eslint/no-var-requires */
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;

passport.use(new GoogleStrategy({
  clientID: '270205800501-afavvuqj940q1hpkt9npstl6r5i3c9fd.apps.googleusercontent.com',
  clientSecret:'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',
  callbackURL: "/api/auth/google/callback"
},
  async function (access_token: string, refresh_token: string, profile: any, cb: any) {
    try {
      const result = await ModelUsers.findOne({ email: profile._json.email })
      const randomPassowrd = (Math.random() * 100).toString()
      if (!result) {
        await ModelUsers.create({
          _id: profile.id,
          email: profile._json.email,
          name: profile.displayName,
          avatar: profile?.photos?.[0]?.value,
          username: profile.displayName,
          password: hashPassword(randomPassowrd),
          verify: '1'
        })
      } else {
        await ModelUsers.findOneAndUpdate({ email: profile._json.email }, {
          $set: {
            name: profile.displayName,
            _id: profile.id,
            avatar: profile?.photos?.[0]?.value,
            username: profile.displayName,
          },
          $currentDate: {
            updated_at: true
          }
        }, {
          new: true
        })
      }
      return cb(null, profile)
    }
    catch (e) {
      console.log(e)
    }
  }
));


passport.use(new FacebookStrategy({
  clientID: '832891101761795',
  clientSecret: '5cf2c2213121a15e870cf375cfda9fc8',
  callbackURL: "/api/auth/facebook/callback",
  profileFields: ['emails', 'photos', 'id', 'displayName']
},

  function (accessToken: string, refreshToken: string, profile: any, cb: any) {
    console.log(profile)
    return cb(null, profile);
  }
));

passport.use(new GitHubStrategy({
  clientID: '5367ff7abe6052e3bb86',
  clientSecret: '3fe82700c08aa397a2913e479281c7c442bff48c',
  callbackURL: "/api/auth/github/callback"
},
  function (accessToken: string, refreshToken: string, profile: any, done: any) {
    console.log(profile)
    return done(null, profile)
  }
));

export default passport;
