const { Strategy } = require("passport-github2");

const GithubPassport = new Strategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    passReqToCallback: true,
    scope: ["profile", "user:email"],
  },
  async (request, accessToken, refreshToken, profile, done) => {
    const dataSave = {
      provider: profile?.provider,
      name: profile?.displayName,
      email: profile?.emails[0]?.value,
      thumbnail: profile?._json?.avatar_url,
    };
    return done(null, dataSave);
  }
);

module.exports = GithubPassport;
