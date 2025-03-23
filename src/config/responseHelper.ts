import { Response } from "express";


const DEFAULT_ERROR_MESSAGE = "Erro de servidor, tente novamente mais tarde!"
export function successResponse(res: Response, message: String, statusCode: number = 200, data?: any) {
    let response;
    if (data) {
        response = {
            status: "SUCCESS",
            statusCode: statusCode,
            message: message,
        }

    } else {
        response = {
            status: "SUCCESS",
            statusCode: statusCode,
            message: message,
            data: data
        };
    }

    return res.status(statusCode).json(response);
}

export function errorResponse(res: Response, message: String = DEFAULT_ERROR_MESSAGE, statusCode: number = 500, data?: any) {
    let response;
    if (data) {
        response = {
            status: "ERROR",
            statusCode: statusCode,
            message: message,
        }

    } else {
        response = {
            status: "ERROR",
            statusCode: statusCode,
            message: message,
            data: data
        };
    }

    return res.status(statusCode).send(response);
}