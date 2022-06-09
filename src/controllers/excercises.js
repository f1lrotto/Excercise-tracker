const userDatabase = require("../models/users.mongo");

// 3. alebo este krajsie je dostat logs rovno z argument: function filterLogs({logs}, id) {
function filterLogs(object, id) {

  // 1. hod ked tak tuto funckiu hore ako normalnu funckiu, alebo si vytvor file ze helpers.js a do toho to hod
  var getLogs = ({ logs }) => ({ logs });

  var logs = getLogs(object);
  // 2. alebo ako to je ovela krajsie, je var {logs} = object
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

  // cela tato funkcia mi pride troll ked toto za teba vie robit pekne Mongo aggregacia cez relacie
  // https://stackoverflow.com/questions/56358603/how-to-get-parent-to-child-relation-with-mongodb-aggregation
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
  const logs = filterLogs(user, id); // fakt toto musis spravit cez aggregation, si zober ze by si mal 10 milionov exercises v DB, to chces vsetky nacitat a filterovat na Backende ?
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

async function getAllExcercises(username, from, to, limit) {  // je dobre si toto pripravit na pagination do buducna ;) 
  let getLogs = ({ logs }) => ({ logs });
  const user = await userDatabase.findOne({ username }).lean();
  const logs = getLogs(await user);
  return await logs; // make the dates better with for each (delete time, leave only date)
}

module.exports = {
  addExcercise,
  getExcercise,
  editExcercise,
  deleteExcercise,
  getAllExcercises,
};
