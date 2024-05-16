import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2";
import { getUserById, getUserEmail, registerUser } from "../services/user.js";
import { createHash, isValidPass } from "../utils/bcryptPassword.js";

const localStrategy = local.Strategy;

export const initialPassport = () => {
  passport.use(
    "register",
    new localStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, userName, password, done) => {
        try {
          const { confirmPassword } = req.body;

          if (password !== confirmPassword) {
            return done(null, false);
          }

          const user = await getUserEmail(userName);

          if (user) {
            return done(null, false);
          }

          req.body.password = createHash(password);

          const newUser = await registerUser({ ...req.body });

          if (newUser) return done(null, newUser);
          return done(null, false);
        } catch (error) {
          done(error);
        }
      }
    )
  );
  passport.use(
    "login",
    new localStrategy(
      { usernameField: "email" },
      async (userName, password, done) => {
        try {
          const user = await getUserEmail(userName);

          if (!user) {
            done(null, false);
          }
          if (!isValidPass(password, user.password)) {
            return done(null, false);
          }
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await getUserById(id);
    done(null, user);
  });
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv23li7Z4j3K7cLwgcsL",
        clientSecret: "190f02a2abebd85e2f434980431493dbc21b1945",
        callbackURL: "http://localhost:8080/login-github-callack",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile._json.email;
          const user = await getUserEmail(email);

          if (user) return done(null, user);

          const newUser = {
            name: profile._json.name,
            email,
            password: ".$",
            image: profile._json.avatar_url,
            github: true,
          };

          const result = await registerUser({ ...newUser });

          return done(null, result);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};
