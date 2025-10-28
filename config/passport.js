const passport = require("passport");
const db = require("../db/queries");
const LocalStrategy = require("passport-local").Strategy;
const { validatePassword } = require("../lib/passwordUtils");

const verifyCallback = async (username, password, done) => {
  try {
    const user = await db.getUserByName(username);
    if (!user) return done(null, false);
    const isValid = validatePassword(password, user.password);
    if (isValid) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    done(error);
  }
};

const strategy = new LocalStrategy(verifyCallback);
passport.use(strategy);

// Puts the user into the session (referenceable by the id)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Takes the user from the database via the reference in the session (as above)
passport.deserializeUser(async (userId, done) => {
  try {
    const user = await db.getUser(userId);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
