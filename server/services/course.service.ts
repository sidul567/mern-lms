import { Response } from "express";
import { Course } from "../models/course.model";
import { redis } from "../utils/redis";

export const uploadCourse = async (data: any, res: Response) => {
  try {
    const course = await Course.create(data);
    const courses = await Course.find().select("-courseData.suggestion -courseData.questions -courseData.links -courseData.videoUrl");
    await redis.set("allCourses", JSON.stringify(courses));
    res.status(200).json({
      success: true,
      course,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// get all courses
export const getAllCourseService = async(res: Response)=>{
  try{
      const courses = await Course.find().sort({createdAt: -1});
      
      res.status(200).json({
          success: true,
          courses
      })
  }catch(err:any){
      res.status(500).json({
          success: false,
          error: err.message
      })
  }
}

// get single coursee
export const getSingleCourseService = async(res: Response, courseId: string)=>{
  try{
      const course = await Course.findById(courseId);
      
      res.status(200).json({
          success: true,
          course
      })
  }catch(err:any){
      res.status(500).json({
          success: false,
          error: err.message
      })
  }
}