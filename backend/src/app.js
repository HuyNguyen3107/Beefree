var createError = require("http-errors");
require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const flash = require("connect-flash");
const cors = require("cors");
const passport = require("passport");

const whitelist = require("./src/utils/cors");

const validateMiddleware = require("./src/middlewares/validate.middleware");

const apiRouter = require("./src/routes/api/index");
var indexRouter = require("./routes/index");

const userService = require("./src/services/user.service");

const passportGoogle = require("./src/passports/passport.google");
const passportGithub = require("./src/passports/passport.github");

var corsOptions = {
  origin: function (origin, callback) {
    const env = process.env.NODE_ENV || "development";
    if (env === "production") {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
      return;
    }

    callback(null, true);
  },
};

var app = express();

app.use(
  session({
    name: "beefree",
    secret: "21aba181cc4d",
    resave: false,
    saveUninitialized: true,
    // cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use("github", passportGithub);
passport.use("google", passportGoogle);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  const user = await userService.findByPk(id);
  done(null, user);
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(validateMiddleware);
app.use("/api", cors(corsOptions), apiRouter);
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render({ error: err });
});

module.exports = app;
