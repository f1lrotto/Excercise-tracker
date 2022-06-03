const express = require("express");
const router = express.Router();

const userController = require("./../controllers/users");
const excerciseController = require("./../controllers/excercises");

// get all users - return usernames and IDs
router.get("/api/users/", async (req, res) => {
  const result = await userController.getAllUsers();
  res.status(200).send(result);
});

// create a new user - return username and ID
router.post("/api/new-user/", async (req, res) => {
  const { username } = req.body;
  const result = await userController.createNewUser(username);
  res.status(201).send(result);
});

// delete specific user
router.delete("/api/:username/delete/", (req, res) => {
  let username = Object.values(req.params);
  userController.deleteUser(username);
  res.status(200).send({ "deleted user": username });
});

// create a new excercise as a user - return the success
router.post("/api/:username/excercises/", (req, res) => {
  const username = Object.values(req.params);
  excerciseController.addExcercise(username, req.body);
  res.status(201).send({"excercise added": true})
});

// TODO NOT DONE
// get all excercises of a user
// - return array of all exc and count of all excercises
//      - optional from-to parameter are dates in yyyy-mm-dd
//      - optional limit returns
// let { userId, from, to, limit } = req.query;
router.get("/api/:username/logs/", async (req, res) => {
  const {from, to, limit } = req.query;
  console.log( from, to, limit)
  const username = Object.values(req.params);
  logs = await excerciseController.getAllExcercises(username, from, to, limit);
  res.status(200).send(logs);
});

// TODO NOT DONE
// update excercise of a user
router.put("/api/:username/update/:excerciseName", (req, res) => {});

// TODO NOT DONE
// delete excercise of a user
router.delete("/api/:username/delete/:excerciseName", (req, res) => {});

module.exports = router;
