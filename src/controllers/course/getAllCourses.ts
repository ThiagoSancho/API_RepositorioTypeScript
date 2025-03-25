import { Request, Response, NextFunction } from "express";
import Course from "../../models/course.js";
import { Connect } from "../../config/database.js";
import { Connection } from "mysql2/promise.js";
import { logError, logInfo } from "../../config/logging.js";
import { errorResponse, successResponse } from "../../config/responseHelper.js";

const NAMESPACE = "COURSES";

export async function getAllCourses(req: Request, res: Response): Promise<any> {
  let connection: Connection | null = null;

  try {
    logInfo(NAMESPACE, "Getting all courses...");
    connection = await Connect();

    const result = await Course.findAll(connection);

    logInfo(NAMESPACE, "Closing connection...");
    logInfo(NAMESPACE, "Returning data:");

    return successResponse(res, "Cursos recuperados com sucesso!", 200, result);
  } catch (error) {
    logError(NAMESPACE, "Server error", error);
    return errorResponse(res, error);
  } finally {
    if (connection) {
      connection.end();
    }
  }
}
