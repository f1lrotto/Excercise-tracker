const userDatabase = require("./../models/users.mongo");

async function addExcercise(username, excercise) {
  await userDatabase.updateOne(
    { username: username },
    { $push: { logs: excercise } }
  );
}

async function getAllExcercises(username, from, to, limit) {
  // TODO add filters
  let getLogs = ({ logs }) => ({ logs });
  const user = await userDatabase.findOne({ username });
  const logs = getLogs(await user);
  return await Object.values(logs);
}

module.exports = {
  addExcercise,
  getAllExcercises,
};
