import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import cloudinary from 'cloudinary';
import { getAllCourseService, getSingleCourseService, uploadCourse } from "../services/course.service";
import { Course } from "../models/course.model";
import { redis } from "../utils/redis";
import ErrorHandler from "../utils/ErrorHandler";
import mongoose from "mongoose";
import sendMail from "../mails/sendMail";
import { Notification } from "../models/notification.model";
import axios from "axios";

// Create course
export const createCourse = catchAsyncError(async(req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const thumbnail = data.thumbnail;
    if(thumbnail){
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
            folder: 'courses'
        })

        data.thumbnail = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    }
    uploadCourse(data, res); 
})

// Update course
export const updateCourse = catchAsyncError(async(req: Request, res: Response, next: NextFunction)=>{
    const data = req.body;
    const thumbnail = data.thumbnail;
    const courseId = req.params.courseId;
    let course = await Course.findById(courseId) as any;
    console.log(course);
    
    if(thumbnail && !thumbnail.startsWith("http")){
        await cloudinary.v2.uploader.destroy(course.thumbnail.public_id);

        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
            folder: 'courses'
        })
        
        data.thumbnail = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    }else{
        data.thumbnail = course?.thumbnail;
    }
    
    course = await Course.findByIdAndUpdate(courseId, data, {
        new: true,
        runValidators: true,
    })

    res.status(200).json({
        success: true,
        course
    })
})

// Get single course - without purchasing
export const getSingleCourse = catchAsyncError(async(req: Request, res: Response, next: NextFunction)=>{
    const courseId = req.params.courseId;

    // const isCacheExist = await redis.get(courseId);
    // let course;

    // if(isCacheExist){
    //    course = JSON.parse(isCacheExist);
    // }else{
       const course = await Course.findById(courseId).select("-courseData.suggestion -courseData.questions -courseData.links -courseData.videoUrl");
       await redis.set(courseId, JSON.stringify(course), "EX", 604800);
    // }

    res.status(200).json({
        success: true,
        course
    })
})

// Get all course - without purchasing
export const getAllCourses = catchAsyncError(async(req: Request, res: Response, next: NextFunction)=>{
    // const isCacheExist = await redis.get("allCourses");
    // let courses;

    // if(isCacheExist){
    //     courses = JSON.parse(isCacheExist);
    //  }else{
        const courses = await Course.find().select("-courseData.suggestion -courseData.questions -courseData.links -courseData.videoUrl");
        await redis.set("allCourses", JSON.stringify(courses));
    //  }

    res.status(200).json({
        success: true,
        courses
    })
})

// Get course by user - purchasing course
export const getCourseByUser = catchAsyncError(async(req: Request, res: Response, next: NextFunction) => {
    const userCourseList = req.user?.courses;
    const courseId = req.params.courseId;

    const courseExist = userCourseList?.find((course: any)=>course.courseId.toString() === courseId);

    if(!courseExist) {
        return next(new ErrorHandler("You are not eligible for this course", 404));
    }

    const course = await Course.findById(courseId);
    const content = course?.courseData;

    res.status(200).json({
        success: true,
        content
    })
})

interface IAddQuestion{
    courseId: string,
    contentId: string,
    question: string
}

// Add question to course content
export const addQuestion = catchAsyncError(async(req: Request, res: Response, next: NextFunction)=>{
    const {courseId, contentId, question} = req.body as IAddQuestion;

    if(!mongoose.Types.ObjectId.isValid(contentId)){
        return next(new ErrorHandler("Invalid content id", 400));
    }

    const course = await Course.findById(courseId);
    const content = course?.courseData.find((item)=>item._id.toString() === contentId);

    if(!content){
        return next(new ErrorHandler("Invalid content id", 400));
    }

    const newQuestion: any = {
        user: req.user,
        question,
        questionReplies: [],
    }

    content.questions.push(newQuestion);

    await Notification.create({
        title: "New Question",
        message: `${req.user?.name} has added a question to ${content.title}`,
        user: req.user?._id,
    })

    await course?.save();

    res.status(200).json({
        success: true,
        course
    })
})

interface IAddAnswerData{
    answer: string,
    courseId: string,
    contentId: string,
    questionId: string,
}

// Add a new answer
export const addAnswer = catchAsyncError(async(req: Request, res: Response, next: NextFunction)=>{
    const {answer, courseId, contentId, questionId} = req.body as IAddAnswerData;

    if(!mongoose.Types.ObjectId.isValid(contentId)){
        return next(new ErrorHandler("Invalid content id", 400));
    }

    const course = await Course.findById(courseId);
    const content = course?.courseData.find((item)=>item._id.toString() === contentId);

    if(!content){
        return next(new ErrorHandler("Invalid content id", 400));
    }

    const question = content.questions.find((item)=>item._id.toString() === questionId);
    
    if(!question){
        return next(new ErrorHandler("Invalid question id", 400));
    }

    const newAnswer: any = {
        user: req.user,
        answer,
    }
    
    question?.questionReplies?.push(newAnswer);

    await course?.save();

    if(req.user?._id === question.user._id){
        await Notification.create({
            title: "New question answer reply",
            message: `${req.user?.name} has replied to your question`,
            user: req.user?._id,
        })
    }else{
        const data = {
            username: question.user.name,
            videoTitle: content.title,
            question: question.question,
            answer: newAnswer.answer,
        }
        await sendMail({
            to: question.user.email,
            subject: "New answer on your question",
            template: "questionReply.ejs",
            data
        })
    }

    res.status(200).json({
        success: true,
        course
    })
})

interface IAddReview{
    review: string,
    rating: number,
    userId: string
}

// Add review to course
export const addReview = catchAsyncError(async(req: Request, res: Response, next: NextFunction)=>{
    const {review, rating} = req.body as IAddReview;
    const {courseId} = req.params;

    const userCourseList = req.user?.courses;

    const courseExist = userCourseList?.some((course)=>course.courseId.toString() === courseId);

    if(!courseExist){
        return next(new ErrorHandler("You are not eligible for this course", 404));
    }

    const course = await Course.findById(courseId);

    const newReview: any = {
        user: req.user,
        comment: review,
        rating,
    }

    course?.reviews.push(newReview);

    let avg = 0;

    course?.reviews.forEach((review)=>{
        avg += review.rating;
    })

    if(course){
        course.ratings = avg / course?.reviews.length;
    }

    await course?.save();

    const notification = {
        title: 'New Review Added',
        message: `${req.user?.name} has given a new review in course ${course?.name}`
    }

    // Create notification

    res.status(200).json({
        success: true,
        course
    })
})

interface IAddReviewReply{
    comment: string,
    courseId: string,
    reviewId: string
}

// Add replies to review
export const addReviewReply = catchAsyncError(async(req: Request, res: Response, next: NextFunction)=>{
    const {comment, courseId, reviewId} = req.body as IAddReviewReply;
    
    const course = await Course.findById(courseId);

    if(!course){
        return next(new ErrorHandler("Invalid course id", 400));
    }

    const review = course.reviews.find((item)=>item._id.toString() === reviewId);

    if(!review){
        return next(new ErrorHandler("Invalid review id", 400));
    }

    const newReply: any = {
        user: req.user,
        comment,
    }

    review?.commentReplies?.push(newReply);

    await course?.save();

    res.status(200).json({
        success: true,
        course
    })
})

// Get all courses -- admin
export const getAllCoursesByAdmin = catchAsyncError(async(req: Request, res: Response, next: NextFunction) => {
    getAllCourseService(res);
})

// Get single course -- admin
export const getSingleCourseByAdmin = catchAsyncError(async(req: Request, res: Response, next: NextFunction)=>{
    const courseId = req.params.courseId; 
    getSingleCourseService(res, courseId);
})

// Delete course -- admin
export const deleteCourse = catchAsyncError(async(req: Request, res: Response, next: NextFunction) => {
    const {courseId} = req.params;
    if(!courseId){
      return next(new ErrorHandler("Course not found!", 400));
    }

    const course = await Course.findById(courseId);
    if(course){
        await cloudinary.v2.uploader.destroy(course.thumbnail.public_id);
    }
  
    await Course.findByIdAndDelete(courseId);
    await redis.del(courseId);
  
    res.status(200).json({
      success: true,
      message: "Course deleted successfully!",
    })
  }) 


// Generate Video Url
export const generateVideoUrl = catchAsyncError(async(req: Request, res: Response, next: NextFunction)=> {
    const {videoId} = req.body;
    const response = await axios.post(`https://dev.vdocipher.com/api/videos/${videoId}/otp`, {
        ttl: 300
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Apisecret ${process.env.VDOCIPHER_API_SECRET}`
        }
    })

    res.json(response.data);
}) 