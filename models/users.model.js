const userDatabase = require("./users.mongo");

async function createNewUser(username) {
  user = await userDatabase.findOne({ username });
  if (await user) {
    return {
      error: "username already exists, please choose another one",
    };
  } else {
    newUser = await userDatabase.create({ username });
    return await {
      username: newUser.username,
      id: newUser._id,
    };
  }
}

async function getAllUsers() {
  const users = await userDatabase.find({}).select({
    username: 1,
    _id: 1,
  });
  return users;
}

module.exports = {
  createNewUser,
  getAllUsers,
};
