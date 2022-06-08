const express = require("express");
const passport = require("passport");
const router = express.Router();

const excerciseController = require("../controllers/excercises");
const { isLoggedIn, isLoggedOut } = require("./loggedInOut");
const register = require("../controllers/register");

router.get("/", isLoggedIn, (req, res) => {
  res.render("index", { title: "Home" });
});

// email, password
router.get("/login", isLoggedOut, (req, res) => {
  const response = {
    title: "Login",
    error: req.query.error,
  };

  res.render("login", response);
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login?error=true",
  })
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/register", (req, res) => {
  const response = {
    title: "Register",
    error: req.query.error,
  };
  res.render("register", response);
});

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = await register(username, email, password);
  if ((await newUser) === false) {
    const response = {
      title: "Register",
      error: "User already exists",
    };
    res.status(401).render("register", response);
  } else {
    res.status(200).redirect("/login");
  }
});

router.get("/excercises", isLoggedIn, async (req, res) => {
  const username = req.user.username;
  let logs = await excerciseController.getAllExcercises(username);
  res.render("excercises", logs);
});

router.get("/new-excercise", isLoggedIn, (req, res) => {
  res.render("newExcercise");
});

router.post("/new-excercise", isLoggedIn, async (req, res) => {
  const excercise = req.body;
  const username = req.user.username;
  await excerciseController.addExcercise(username, excercise);
  res.redirect("/excercises");
});

router.get("/edit/:id", isLoggedIn, async (req, res) => {
  const id = req.params.id;
  const username = req.user.username;
  const excercise = await excerciseController.getExcercise(username, id);
  res.render("editExcercise", excercise);
});

router.post("/edit/:id", isLoggedIn, async (req, res) => {
  const excercise = req.body;
  const id = req.params.id;
  const username = req.user.username;
  await excerciseController.editExcercise(username, id, excercise);
  res.redirect("/excercises");
});

router.use("/delete/:id", isLoggedIn, async (req, res) => {
  const id = req.params.id;
  const username = req.user.username;
  await excerciseController.deleteExcercise(username, id);
  res.redirect("/excercises");
});

module.exports = router;
