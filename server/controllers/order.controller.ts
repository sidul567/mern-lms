import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import { IOrder } from "../models/order.model";
import ErrorHandler from "../utils/ErrorHandler";
import { Course } from "../models/course.model";
import { getAllOrdersService, newOrder } from "../services/order.service";
import sendMail from "../mails/sendMail";
import { User } from "../models/user.model";
import { Notification } from "../models/notification.model";

// Create order
export const createOrder = catchAsyncError(async(req: Request, res: Response, next: NextFunction)=>{
    const{courseId, paymentInfo} = req.body as IOrder;
    const user = await User.findById(req.user?._id);

    const courseExist = user?.courses.some((course: any)=>course.courseId.toString() === courseId);

    if(courseExist){
        return next(new ErrorHandler("Course already exists!", 400));
    }

    const course = await Course.findById(courseId);

    if(!course){
        return next(new ErrorHandler("Course not found!", 404));
    }

    const orderData: any = {
        userId: req?.user?._id,
        courseId,
        paymentInfo
    }

    const mailData: any = {
        user: {
            name: user?.name,
        },
        order: {
            _id: course._id.toString().toUpperCase(),
            name: course.name,
            price: course.price,
            date: new Date().toLocaleDateString('en-US', {'year': 'numeric', 'month': 'long', 'day': 'numeric'})
        }
    }

    await sendMail({
        to: user?.email || "",
        subject: "Order Confirmation - Mern-LMS",
        template: 'orderConfirmation.ejs',
        data: mailData
    })

    user?.courses.push({courseId});

    await user?.save();

    await Notification.create({
        title: "New Order",
        message: `${user?.name} has placed an order for ${course?.name}`,
        user: user?._id
    })

    course.purchased = (course.purchased || 0) + 1;

    await course?.save();

    newOrder(orderData, res);
})

// Get all orders -- admin
export const getAllOrders = catchAsyncError(async(req: Request, res: Response, next: NextFunction) => {
    getAllOrdersService(res);
})