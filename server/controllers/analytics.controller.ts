import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import { generateLast12MonthsData } from "../utils/analytics.generator";
import { User } from "../models/user.model";
import { Course } from "../models/course.model";
import { Order } from "../models/order.model";

// Get users analytics -- admin
export const getUsersAnalytics = catchAsyncError(async(req: Request, res: Response, next: NextFunction)=>{
    const users = await generateLast12MonthsData(User);

    res.status(200).json({
        success: true,
        users
    })
})

// Get courses analytics -- admin
export const getCoursesAnalytics = catchAsyncError(async(req: Request, res: Response, next: NextFunction)=>{
    const courses = await generateLast12MonthsData(Course);

    res.status(200).json({
        success: true,
        courses
    })
})

// Get orders analytics -- admin
export const getordersAnalytics = catchAsyncError(async(req: Request, res: Response, next: NextFunction)=>{
    const orders = await generateLast12MonthsData(Order);

    res.status(200).json({
        success: true,
        orders
    })
})