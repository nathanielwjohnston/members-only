const bcrypt = require("bcryptjs");

async function generateHash(password) {
  // TODO:try/catch
  const saltLength = 10;
  const hashedPassword = await bcrypt.hash(password, saltLength);
  return hashedPassword;
}

async function validatePassword(password, hashedPassword) {
  const match = await bcrypt.compare(password, hashedPassword);
}

module.exports = { generateHash, validatePassword };
