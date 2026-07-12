import { Router } from 'express';
import {
    addLectureToCourseById,
    createCourse,
    getAllCourses,
    getLectureByCourseId,
    getCourseById,
    removeCourse,
    updateCourse
} from '../controllers/course.controller.js';

import { authorizedRoles, isLoggedIn } from '../middlewares/auth.middleware.js';
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.route('/')
    .get(
        isLoggedIn,
        authorizedRoles('ADMIN', 'USER'),
        getAllCourses
    )
    .post(
        isLoggedIn,
        upload.single('thumbnail'),
        createCourse
    );

router.route('/:id')
    .get(isLoggedIn, getCourseById)
    .put(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        upload.single('thumbnail'),
        updateCourse
    )
    .delete(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        removeCourse
    )
    .post(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        upload.single('lecture'),
        addLectureToCourseById
    );

export default router;