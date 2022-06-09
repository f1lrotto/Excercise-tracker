const userDatabase = require("../models/users.mongo");
const bcrypt = require("bcrypt");

async function register(username, email, password) {
  const exists = await userDatabase.exists({ username: username });
  if (exists) {
    return false;
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) return next(err);
      try {
        await userDatabase.create({
          username: username,
          email: email,
          password: hash,
        });
        return true;
      } catch (error) {
        console.error(error);
        return "err";
      }
    });
  });
}

module.exports = register;
