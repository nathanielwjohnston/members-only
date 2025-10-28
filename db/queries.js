const pool = require("../config/pool");

// TODO: try/catch?

// Users

async function insertUser(
  username,
  firstName,
  lastName,
  passwordHash,
  membership,
  admin
) {
  await pool.query(
    `
    INSERT INTO users (username, first_name, last_name, password, membership, admin)
    VALUES ($1, $2, $3, $4, $5, $6)
    `,
    [username, firstName, lastName, passwordHash, membership, admin]
  );
}

async function getUser(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  const user = rows[0];
  return user;
}

async function getUserByName(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  const user = rows[0];
  return user;
}

async function upgradeToMember(id) {
  await pool.query("UPDATE users SET membership = TRUE WHERE id = $1", [id]);
}

// Messages

async function insertMessage(title, content, userId) {
  const timestamp = new Date();
  await pool.query(
    "INSERT INTO messages (title, content, timestamp, user_id) VALUES ($1, $2, $3, $4)",
    [title, content, timestamp, userId]
  );
  return;
}

async function deleteMessage(messageId) {
  await pool.query("DELETE FROM messages WHERE id = $1", [messageId]);
  return;
}

async function getMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  const messages = rows.map((row) => {
    const { user_id: userId, ...rest } = row;
    return {
      ...rest,
      userId,
    };
  });
  return messages;
}

// Exports

module.exports = {
  insertUser,
  getUser,
  getUserByName,
  upgradeToMember,

  insertMessage,
  deleteMessage,
  getMessages,
};
