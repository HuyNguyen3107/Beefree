require("dotenv").config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;

module.exports = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true,
    scope: ["email", "profile"],
  },
  async (req, accessToken, refreshToken, profile, done) => {
    const dataSave = {
      provider: profile?.provider,
      name: profile?.displayName,
      email: profile?.emails[0].value,
      thumbnail: profile?._json?.picture,
    };
    return done(null, dataSave);
  }
);
