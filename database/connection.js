//connection of database
import mysql from "mysql2/promise";

import 'dotenv/config';

const connection = mysql.createPool({
  host: process.env.HOSTNAME,
  port: process.env.DB_PORT || 3306,
  user: process.env.DATABASE_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined
});

export default connection;
