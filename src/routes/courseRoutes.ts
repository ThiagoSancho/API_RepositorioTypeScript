import express from "express";
import { getAllCourses } from "../controllers/course/getAllCourses.js";
import { getOneCourse } from "../controllers/course/getOneCourses.js";
const router = express.Router();

router.get("/courses", getAllCourses);
router.get("/courses/:idCourse", getOneCourse);

export default router;
