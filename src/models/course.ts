import ICourse from "../interfaces/courseInterface.js";
import { Query } from "../config/database.js";
import { Connection } from "mysql2/promise.js";
import { RowDataPacket } from "mysql2";
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

  async insertOne(connection: Connection) {
    const sqlQuery = `
    INSERT INTO course (register_course , name , description , status) 
    VALUES (${this.register_course} , ${this.name}  , ${this.description} , ${this.status}) `;

    const result = await Query(connection, sqlQuery);
    return result;
  }

  static async findAll(connection: Connection) {
    const sqlQuery = "SELECT * FROM course;";

    const [rows, fields] = await Query(connection, sqlQuery) as [RowDataPacket[], any];
    return rows;
  }

  static async findOneByRegister(connection: Connection, registerCourse: String) {
    const sqlQuery = `SELECT * FROM course WHERE register_course = ?`;
    const values = [registerCourse];

    const [rows, fields] = await Query(connection, sqlQuery, values) as [RowDataPacket[], any];
    return rows;
  }
}

