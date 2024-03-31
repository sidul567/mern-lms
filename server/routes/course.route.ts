import express from 'express';
import { addAnswer, addQuestion, addReview, addReviewReply, createCourse, deleteCourse, generateVideoUrl, getAllCourses, getAllCoursesByAdmin, getCourseByUser, getSingleCourse, getSingleCourseByAdmin, updateCourse } from '../controllers/course.controller';
import { authorizedRoles, isAuthenticate } from '../middleware/auth';
import { updateAccessToken } from '../controllers/user.controller';

const courseRouter = express.Router();

// Create course
courseRouter.post('/course/create', updateAccessToken, isAuthenticate, authorizedRoles("admin"), createCourse);

// Update course
courseRouter.put('/course/update/:courseId', updateAccessToken, isAuthenticate, authorizedRoles("admin"), updateCourse);

// Get single course - without purchasing
courseRouter.get('/course/get/:courseId', getSingleCourse);

// Get single course - without purchasing
courseRouter.get('/course/getAllCourses', getAllCourses);

// Get course content - purchasing user
courseRouter.get('/course/getContent/:courseId', updateAccessToken, isAuthenticate, getCourseByUser);

// Add question to course content
courseRouter.put('/course/addQuestion', updateAccessToken, isAuthenticate, addQuestion);

// Add answer to question
courseRouter.put('/course/addAnswer', updateAccessToken, isAuthenticate, addAnswer);

// Add review to course
courseRouter.put('/course/addReview/:courseId', updateAccessToken, isAuthenticate, addReview);

// Add replies to review
courseRouter.put('/course/addReviewReply', updateAccessToken, isAuthenticate, authorizedRoles("admin"), addReviewReply);

// Get all courses -- admin
courseRouter.get('/courses', updateAccessToken, isAuthenticate, authorizedRoles("admin"), getAllCoursesByAdmin);

// Get single course -- admin
courseRouter.get('/admin/course/:courseId', updateAccessToken, isAuthenticate, authorizedRoles("admin"), getSingleCourseByAdmin);

// Delete course -- admin
courseRouter.delete('/course/:courseId', updateAccessToken, isAuthenticate, authorizedRoles("admin"), deleteCourse);

// Genere video otp
courseRouter.post('/course/generateVdoOtp', generateVideoUrl);

export default courseRouter;