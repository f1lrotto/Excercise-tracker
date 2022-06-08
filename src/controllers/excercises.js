const userDatabase = require("../models/users.mongo");

function filterLogs(object, id) {
  var getLogs = ({ logs }) => ({ logs });
  var logs = getLogs(object);
  logs = Object.values(logs);
  logs = logs[0];
  var log = logs.find((x) => x.id == id);
  if (log != undefined) {
    let date = (log.date).toISOString().substring(0, 10);    
    var newLog = {
      description: log.description,
      duration: log.duration,
      date: date,
      id: log.id
    }
  }
  return newLog;
}

async function addExcercise(username, excercise) {
  await userDatabase.updateOne(
    { username: username },
    { $push: { logs: excercise } }
  );
}

async function getExcercise(username, id) {
  const user = await userDatabase.findOne({
    username: username,
  });
  const logs = filterLogs(user, id);
  return await logs;
}

async function editExcercise(username, id, excercise) {
  await userDatabase.updateOne(
    { username: username, logs: { $elemMatch: { id: id } } },
    {
      $set: {
        "logs.$.description": excercise.description,
        "logs.$.duration": excercise.duration,
        "logs.$.date": excercise.date,
      },
    }
  );
}

async function deleteExcercise(username, id) {
   await userDatabase.updateOne(
     { username: username, logs: { $elemMatch: { id: id } } },
     {
       $pull: {
         logs: {id: id}
       },
     }
   );
}

async function getAllExcercises(username, from, to, limit) {
  let getLogs = ({ logs }) => ({ logs });
  const user = await userDatabase.findOne({ username }).lean();
  const logs = getLogs(await user);
  return await logs; //Object.values(logs);
}

module.exports = {
  addExcercise,
  getExcercise,
  editExcercise,
  deleteExcercise,
  getAllExcercises,
};
