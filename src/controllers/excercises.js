const userDatabase = require("../models/users.mongo");

async function addExcercise(username, excercise) {
  await userDatabase.updateOne(
    { username: username },
    { $push: { logs: excercise } }
  );
}

async function getExcercise(username, id) {
  await userDatabase.findOne(
    { username: username },{})
}

async function editExcercise(username, id, excercise) {
  await userDatabase.updateOne({ username: username }, {});
}

async function deleteExcercise(username, id) {
  // kokot neviem teraz
}

async function getAllExcercises(username, from, to, limit) {
  // TODO add filters
  let getLogs = ({ logs }) => ({ logs });
  const user = await userDatabase.findOne({ username }).lean();
  const logs = getLogs(await user);
  return await logs; //Object.values(logs);
}

module.exports = {
  addExcercise,
  editExcercise,
  getAllExcercises,
};
