const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const hbs = require("express-handlebars");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const { connectMongo } = require("./services/mongo");
const routes = require("./routes/router");
const userDatabase = require("./models/users.mongo");

const app = express();

require("dotenv").config();

// Connect to the database
connectMongo();

// Default middleware
app.engine("hbs", hbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id); // not implemented
});

passport.deserializeUser((id, done) => {
  userDatabase.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new localStrategy((username, password, done) => {
    userDatabase.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username!" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (err) {
          return done(err);
        }
        if (res === false) {
          return done(null, false, { message: "Incorrect password!" });
        }
        return done(null, user);
      });
    });
  })
);

// Routes
app.use("/", routes);

const PORT = process.env.PORT || 6000;
app.listen(PORT, console.log(`Server listening on port ${PORT}`));
