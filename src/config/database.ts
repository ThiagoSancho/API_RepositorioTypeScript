import mysql, { ConnectionOptions } from "mysql2";
import dotenv from "dotenv";

dotenv.config()

const access: ConnectionOptions = {
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
};

const Connect = async () =>
  new Promise<mysql.Connection>((resolve, reject) => {
    const connection = mysql.createConnection(access);
    connection.connect((error) => {
      if (error) {
        reject(error);
      }
    });

    resolve(connection);
  });

const Query = async (connection: mysql.Connection, query: string) =>
  new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(result);
    });
  });

export { Connect, Query };
