import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

export function logInfo(
  namespace: string,
  message: string,
  objcet?: any
): void {
  if (objcet) {
    console.info(`[${getTimeStamp()}] [${namespace}] ${message}`, objcet);
  } else {
    console.info(`[${getTimeStamp()}] [${namespace}] ${message}`);
  }
}

export function logWarn(
  namespace: string,
  message: string,
  object?: any
): void {
  if (object) {
    console.warn(
      `[${getTimeStamp()}] [WARN] [${namespace}] ${message}`,
      object
    );
  } else {
    console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`);
  }
}

export function logError(
  namespace: string,
  message: string,
  object?: any
): void {
  if (object) {
    console.error(
      `[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`,
      object
    );
  } else {
    console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`);
  }
}

export function logDebug(
  namespace: string,
  message: string,
  object?: any
): void {
  if (object) {
    console.debug(
      `[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`,
      object
    );
  } else {
    console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`);
  }
}

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  console.log(
    `[${getTimeStamp()}] [SERVER] METHOD: ${req.method} - URL: ${
      req.url
    } - IP: ${req.socket.remoteAddress}`
  );
  console.log(`[${getTimeStamp()}] [SERVER] BODY: ${JSON.stringify(req.body)}`);
  console.log(
    `[${getTimeStamp()}] [SERVER] PARAMS: ${JSON.stringify(req.params)}\n`
  );
  next();

  res.on("finish", () => {
    console.log(
      `[${getTimeStamp()}] [SERVER] METHOD: ${req.method} - URL: ${
        process.env.API_URL
      }${req.url} - IP: ${req.socket.remoteAddress}`
    );
    console.log(`[${getTimeStamp()}] [SERVER] STATUS: ${res.statusCode}\n`);
  });
}

function getTimeStamp(): string {
  return new Date().toISOString();
}
