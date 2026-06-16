import Course from "../models/course.model.js"
import AppError from '../utils/error.util.js';
import cloudinary from "cloudinary";
import fs from 'fs/promises';

const getAllCourses = async (req, res, next) => {
    try {

        const courses = await Course.find({}).select('-lectures');

        if (!courses || courses.length === 0) {
            return next(
                new AppError('No courses found', 404)
            );
        }

        res.status(200).json({
            success: true,
            message: 'All courses fetched successfully',
            courses
        });

    } catch (err) {
        return next(
            new AppError(err.message, 500)
        );
    }
};

const getLectureByCourseId = async (req, res, next) => {
    try {

        const { id } = req.params;

        if (!id) {
            return next(
                new AppError('Course ID is required', 400)
            );
        }

        const course = await Course.findById(id);

        if (!course) {
            return next(
                new AppError('Course does not exist', 404)
            );
        }

        if (!course.lectures || course.lectures.length === 0) {
            return next(
                new AppError('No lectures found for this course', 404)
            );
        }

        res.status(200).json({
            success: true,
            message: 'Lectures fetched successfully',
            lectures: course.lectures
        });

    } catch (err) {
        return next(
            new AppError(err.message, 500)
        );
    }
};

const createCourse = async (req, res, next) => {
    try {
        const { title, description, category, createdBy } = req.body;

        if (!title || !description || !category || !createdBy) {
            return next(
                new AppError('All fields are required', 400)
            );
        }

        if (!req.file) {
            return next(
                new AppError('Thumbnail is required', 400)
            );
        }

        let result;

        try {
            result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'lms'
            });

            await fs.rm(req.file.path);

        } catch (err) {
            return next(
                new AppError('Thumbnail upload failed', 500)
            );
        }

        const course = await Course.create({
            title,
            description,
            category,
            createdBy,
            thumbnail: {
                public_id: result.public_id,
                secure_url: result.secure_url
            }
        });

        res.status(201).json({
            success: true,
            message: 'Course created successfully',
            course
        });

    } catch (err) {
        return next(
            new AppError(err.message, 500)
        );
    }
};

const updateCourse = async (req, res, next) => {
    try {
        const { id } = req.params;

        const course = await Course.findByIdAndUpdate(
            id,
            {
                $set: req.body
            },
            {
                runValidators: true
            }
        );

        if (!course) {
            return next(
                new AppError('Course with given id does not exist', 404)
            );
        }

        res.status(200).json({
            success: true,
            message: 'Course updated successfully!',
            course
        });

    } catch (e) {
        return next(
            new AppError(e.message, 500)
        );
    }
};

const removeCourse = async (req, res, next) => {
    try {
        const { id } = req.params;

        const course = await Course.findById(id);

        if (!course) {
            return next(
                new AppError('Course with given id does not exist', 404)
            );
        }

        const deletedCourse = await Course.findByIdAndDelete(id);

        if (!deletedCourse) {
            return next(
                new AppError('Failed to delete course', 500)
            );
        }

        res.status(200).json({
            success: true,
            message: 'Course deleted successfully'
        });

    } catch (e) {
        return next(
            new AppError(e.message, 500)
        );
    }
};

const addLectureToCourseById = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const { id } = req.params;

        if (!title || !description) {
            return next(
                new AppError('All fields are required', 400)
            );
        }

        const course = await Course.findById(id);

        if (!course) {
            return next(
                new AppError('Course with given id does not exist', 404)
            );
        }

        const lectureData = {
            title,
            description,
            lecture: {}
        };

        if (req.file) {
            try {
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: 'lms'
                });

                if (result) {
                    lectureData.lecture = {
                        public_id: result.public_id,
                        secure_url: result.secure_url
                    };
                }

                await fs.rm(`uploads/${req.file.filename}`);

            } catch (err) {
                return next(
                    new AppError('Thumbnail upload failed', 500)
                );
            }
        }

        course.lectures.push(lectureData);
        course.numberOfLectures = course.lectures.length;

        await course.save();

        res.status(200).json({
            success: true,
            message: 'Lecture successfully added to the course',
            course
        });

    } catch (err) {
        return next(
            new AppError(err.message, 500)
        );
    }
};

export {
    getAllCourses,
    getLectureByCourseId,
    createCourse,
    updateCourse,
    removeCourse,
    addLectureToCourseById
}