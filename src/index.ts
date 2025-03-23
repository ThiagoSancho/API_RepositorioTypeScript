import express from "express";
import courseRoutes from "./routes/courseRoutes.js";
import dotenv from "dotenv";
import { logError, logInfo, logWarn, requestLogger } from "./config/logging.js";
import { Connect, Query } from "./config/database.js";
dotenv.config();

const router = express();

router.use(express.json());
router.use(requestLogger);
router.use("/repository", courseRoutes);

router.listen(process.env.API_PORT, () => {
  logInfo("INDEX", "Testando conexão ao banco de dados...");

  Connect()
    .then((connection) => {
      Query(connection, "SELECT * FROM course WHERE id_course=1;").then((value) => {
        logInfo("INDEX", "Servidor conectado ao banco de dados!");
        console.log(
          `Servidor rodando na porta ${process.env.API_PORT}: ${process.env.API_URL}`
        );
        connection.end();
      })
        .catch((error) => {
          logError(
            "INDEX",
            "Ocorreu um erro ao conectar ao banco de dados!",
            error
          );
          logWarn("INDEX", "Fechando o servidor!")
          process.exit();
        })
        .finally(() => {
          connection.end();
        })
    })
    .catch((error) => {
      logError(
        "INDEX",
        "Ocorreu um erro ao conectar ao banco de dados!",
        error
      );
      logWarn("INDEX", "Fechando o servidor!")
      process.exit();
    })
});
