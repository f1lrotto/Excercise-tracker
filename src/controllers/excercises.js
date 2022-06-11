const userDatabase = require("../models/users.mongo");
const moment = require("moment");


async function addExcercise(username, excercise) {
  await userDatabase.updateOne(
    { username: username },
    { $push: { logs: excercise } }
  );
}

async function getExcercise(username, id) {
  const log = await userDatabase.aggregate([
    { $match: { username: username } },
    { $unwind: "$logs" },
    { $match: { "logs.id": { $eq: id } } },
    { $replaceWith: "$logs" },
    {
      $project: {
        id: 1,
        description: 1,
        duration: 1,
        created_at: {
          $dateToString: { format: "%Y-%m-%d", date: "$created_at" },
        },
      },
    },
  ]);
  return await log[0];
}

async function editExcercise(username, id, excercise) {
  await userDatabase.updateOne(
    { username: username, logs: { $elemMatch: { id: id } } },
    {
      $set: {
        "logs.$.description": excercise.description,
        "logs.$.duration": excercise.duration,
        "logs.$.created_at": excercise.created_at,
      },
    }
  );
}

async function deleteExcercise(username, id) {
  await userDatabase.updateOne(
    { username: username, logs: { $elemMatch: { id: id } } },
    {
      $pull: {
        logs: { id: id },
      },
    }
  );
}

function prettyTime(logs) {
  for (const log in logs) {
    logs[log].forEach(element => {
      element.created_at = moment(element.created_at).format('ddd Do MMM YYYY')
    });
  }
  return logs
}

async function getAllExcercises(username, from, to, limit) {
  let logs = await userDatabase
    .findOne({ username }, { _id: 0, logs: 1 })
    .lean();
  logs = prettyTime(logs)
  console.log(logs)
  return await logs;
}

module.exports = {
  addExcercise,
  getExcercise,
  editExcercise,
  deleteExcercise,
  getAllExcercises,
};
