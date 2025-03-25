import mysql, { ConnectionOptions } from "mysql2/promise.js";
import dotenv from "dotenv";

dotenv.config()

const access: ConnectionOptions = {
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
};

async function Connect(): Promise<mysql.Connection> {
  const connection: mysql.Connection = await mysql.createConnection(access)
  return connection;
}

async function Query(connection: mysql.Connection, query: string, values?: any[]) {
  if (values) {
    return await connection.execute(query, values);

  } else {
    return await connection.execute(query);
  }
}

export { Connect, Query };
