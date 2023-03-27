require('dotenv').config({ path: "./.env" });
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport")
passport.use(
	new GoogleStrategy(
		{
			clientID: '178073120610-37o8quh3tv2n44i41q06apg04gk7mvag.apps.googleusercontent.com',
			clientSecret: "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",
			callbackURL: "https://backend-sj2s.onrender.com/home",
			scope: ["profile", "email"],
			passReqToCallback: true
		},
		function (accessToken, refreshToken, profile, callback, done) {
			return done(null, profile);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
