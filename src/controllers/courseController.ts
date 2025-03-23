import { Request, Response, NextFunction } from "express";
import Course from "../models/course.js";
import { Connect } from "../config/database.js";
import { Connection } from "mysql2";
import { logError, logInfo } from "../config/logging.js";

const NAMESPACE = "COURSES";

export async function getAllCourses(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    logInfo(NAMESPACE, "Getting all courses...");
    const connection: Connection = await Connect();
    const result = await Course.findAll(connection);

    logInfo(NAMESPACE, "Closing connection...");
    connection.end();
    logInfo(NAMESPACE, "Returning data:");
    return res.json(result).status(200);
  } catch (error) {
    logError(NAMESPACE, "Server error", error);
    return res.json(error).status(500);
  }
}
