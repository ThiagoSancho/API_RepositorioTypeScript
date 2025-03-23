import express from "express";
import { getAllCourses } from "../controllers/course/getAllCourses.js";
const router = express.Router();

router.get("/courses", getAllCourses);

export default router;
