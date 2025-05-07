// import { Client } from "pg";

import pkg from "pg";
const { Client } = pkg;

import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  ssl: { rejectUnauthorized: false }, // important for AWS
});

client
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => {
    console.error(`Can't connect to PostgreSQL: ${err}`);
  });

export default client;
