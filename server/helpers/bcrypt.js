const bcrypt = require("bcrypt");

function hashPassword(instance) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(instance.password, salt);
}

function comparePassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

module.exports = {
  hashPassword,
  comparePassword,
};
