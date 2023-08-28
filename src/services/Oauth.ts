
import passport from "passport";
import { ModelUsers } from "~/models/model/users.model";

/* eslint-disable @typescript-eslint/no-var-requires */
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

// passport.use(new GoogleStrategy({
//   clientID: '270205800501-afavvuqj940q1hpkt9npstl6r5i3c9fd.apps.googleusercontent.com',
//   clientSecret: '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',
//   callbackURL: "/api/auth/google/callback"
// },
//  async function (access_token:string , refresh_token:string, profile: any, cb: any) {
//     try{
//         const result = await ModelUsers.findOne({email:profile.email})
//         if(!result){
          
//           await ModelUsers.create({
//             _id:profile.id,
//             email:profile._json.email,
//             name:profile.displayName,
//             avatar:profile?.photos?.[0]?.value,
//             username:profile.displayName,
//             password:"Anhyeuem1234!",
//             verify:'1'
//           })
//         }
      
//       return cb(null ,profile)
//     }
//     catch(e) {
//       console.log(e)
//     }
//   }
// ));


passport.use(new FacebookStrategy({
  clientID: '165591933234451',
  clientSecret: '06758a7e3ef1819af6e158c496131db9',
  callbackURL: "/api/auth/facebook/callback",
  profileFields:['emails','photos','id','displayName']
},
function(accessToken:string, refreshToken:string, profile:any, cb:any) {
  console.log(profile)
 return cb(null,profile);
}
));

export default passport;
