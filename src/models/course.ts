import ICourse from "../interfaces/courseInterface.js";
import mysql, { ConnectionOptions } from "mysql2";
import { Query } from "../config/database.js";

export default class Course implements ICourse {
  id_course: number;
  register_course: string;
  name: string;
  description: string;
  status: number;

  constructor(
    register_course: string,
    name: string,
    description: string,
    status: number,
    id_course?: number
  ) {
    this.id_course = id_course ? id_course : 0;
    this.register_course = register_course;
    this.name = name;
    this.description = description;
    this.status = status;
  }

  async insertOne(connection: mysql.Connection) {
    let sqlQuery = `
    INSERT INTO course (register_course , name , description , status) 
    VALUES (${this.register_course} , ${this.name}  , ${this.description} , ${this.status}) `;

    const result = await Query(connection, sqlQuery);
    return result;
  }

  static async findAll(connection: mysql.Connection) {
    let sqlQuery = "SELECT * FROM course;";
    
    const result = await Query(connection , sqlQuery);
    return result;
  }
}
