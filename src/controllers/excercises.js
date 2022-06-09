const userDatabase = require("../models/users.mongo");

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

async function getAllExcercises(username, from, to, limit) {
  const logs = await userDatabase
    .findOne({ username }, { _id: 0, logs: 1 })
    .lean();
  return await logs; // jebat toto, to si uz frontendaci poriesia :D
}

module.exports = {
  addExcercise,
  getExcercise,
  editExcercise,
  deleteExcercise,
  getAllExcercises,
};
