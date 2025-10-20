require("dotenv").config();
const { Client } = require("pg");

const SQL = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        username VARCHAR ( 35 ) UNIQUE,
        first_name VARCHAR ( 35 ),
        last_name VARCHAR ( 35 ),
        password CHAR ( 60 ),
        membership_status BOOLEAN,
        admin BOOLEAN
    );

    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        title VARCHAR ( 255 ),
        content VARCHAR ( 500 ),
        timestamp TIMESTAMPTZ,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
    );
`;

async function main() {
  const client = new Client({
    connectionString: process.env.DB_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
}

main();
