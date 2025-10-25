const bcrypt = require("bcryptjs");

async function generateHash(password) {
  // TODO:try/catch
  const saltLength = 10;
  const hashedPassword = await bcrypt.hash(password, saltLength);
  return hashedPassword;
}

module.exports = { generateHash };
