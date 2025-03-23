import express from "express";
import courseRoutes from "./routes/courseRoutes.js";
import dotenv from "dotenv";
import { requestLogger } from "./config/logging.js";
dotenv.config();

const router = express();

router.use(express.json());
router.use(requestLogger);
router.use("/repository", courseRoutes);

router.listen(process.env.API_PORT, () => {
  console.log(
    `Servidor rodando na porta ${process.env.API_PORT}: ${process.env.API_URL}`
  );
});
