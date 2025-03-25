import { Request, Response } from "express";
import { Connection } from "mysql2/promise.js";
import { logError, logInfo } from "../../config/logging.js";
import { errorResponse, successResponse } from "../../config/responseHelper.js";
import { Connect } from "../../config/database.js";
import Course from "../../models/course.js";

const NAMESPACE = "COURSES";

export async function getOneCourse(req: Request, res: Response): Promise<any> {
    logInfo(NAMESPACE, "Getting one course...");
    let connection: Connection | null = null;
    try {
        const idCourse = req.params.idCourse;
        connection = await Connect();

        const result = await Course.findOneByRegister(connection, idCourse);
        if (result.length == 0) {
            return errorResponse(res, [], "Nenhum curso foi encontrado!", 404)
        }


        return successResponse(res, "Curso recuperado com sucesso!", 200, result);
    } catch (error) {
        logError(NAMESPACE, "Server error", error);
        return errorResponse(res, error);
    }
    finally {
        if (connection) {
            connection.end();
        }
    }
}