const express = require("express");
const bodyParser = require("body-parser");

const { connectMongo } = require("./services/mongo");
const userModel = require("./models/users.model");

require("dotenv").config();

connectMongo();

PORT = process.env.PORT || 6000;

const app = express();

app.use(bodyParser.json());

// get all users - return usernames and IDs
app.get("/api/users/", async (req, res) => {
  const result = await userModel.getAllUsers();
  res.status(200).send(result);
});

// create a new user - return username and ID
app.post("/api/new-user/", async (req, res) => {
  const { username } = req.body;
  const result = await userModel.createNewUser(username);
  res.status(201).send(result);
});

// TODO NOT DONE
// create a new excercise as a user - return the excercise
app.post("/api/:username/excercises/", (req, res) => {});

// TODO NOT DONE
// get all excercises of a user
// - return array of all exc and count of all excercises
//      - optional from-to parameter are dates in yyyy-mm-dd
//      - optional limit returns
// let { userId, from, to, limit } = req.query;
app.get("/api/:username/logs/", (req, res) => {});

// TODO NOT DONE
// delete specific user
app.delete("/api/:username/delete/", (req, res) => {});

// TODO NOT DONE
// delete excercise of a user
app.delete("/api/:username/delete/:excerciseName", (req, res) => {});

// TODO NOT DONE
// update excercise of a user
app.put("/api/:username/update/:excerciseName", (req, res) => {});

app.listen(PORT, console.log(`Server listening on port ${PORT}`));
