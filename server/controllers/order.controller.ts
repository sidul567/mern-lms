import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import { IOrder } from "../models/order.model";
import ErrorHandler from "../utils/ErrorHandler";
import { Course } from "../models/course.model";
import { getAllOrdersService, newOrder } from "../services/order.service";
import sendMail from "../mails/sendMail";
import { User } from "../models/user.model";
import { Notification } from "../models/notification.model";
import Stripe from "stripe";
import { redis } from "../utils/redis";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

// Create order
export const createOrder = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { courseId, paymentInfo } = req.body as IOrder;
    const user = await User.findById(req.user?._id);

    if (!paymentInfo) {
      return next(new ErrorHandler("paymentInfo is required.", 400));
    }
    if (!courseId) {
      return next(new ErrorHandler("courseId is required.", 400));
    }

    if (paymentInfo) {
      if ("id" in paymentInfo) {
        const paymentIntent = await stripe.paymentIntents.retrieve(
          String(paymentInfo.id)
        );

        if (paymentIntent.status !== "succeeded") {
          return next(new ErrorHandler("Unauthorized payment!", 400));
        }
      }
    }

    const courseExist = user?.courses.some(
      (course: any) => course.courseId.toString() === courseId
    );

    if (courseExist) {
      return next(new ErrorHandler("Course already exists!", 400));
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return next(new ErrorHandler("Course not found!", 404));
    }

    const orderData: any = {
      userId: req?.user?._id,
      courseId,
      paymentInfo,
    };

    const mailData: any = {
      user: {
        name: user?.name,
      },
      order: {
        _id: course._id.toString().toUpperCase(),
        name: course.name,
        price: course.price,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      },
    };

    await sendMail({
      to: user?.email || "",
      subject: "Order Confirmation - Mern-LMS",
      template: "orderConfirmation.ejs",
      data: mailData,
    });

    user?.courses.push({ courseId });

    await user?.save();

    await redis.set(req?.user?._id, JSON.stringify(user));

    await Notification.create({
      title: "New Order",
      message: `${user?.name} has placed an order for ${course?.name}`,
      user: user?._id,
    });

    course.purchased = (course.purchased || 0) + 1;

    await course?.save();

    newOrder(orderData, res);
  }
);

// Get all orders -- admin
export const getAllOrders = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    getAllOrdersService(res);
  }
);

// send stripe publishable key
export const getStripePublishableKey = catchAsyncError(
  async (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  }
);

// new payment
export const newPayment = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { amount } = req.body;

    if (!amount) {
      return next(new ErrorHandler("Amount is required!", 400));
    }

    const myPayment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      metadata: {
        company: "MERN-LMS",
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(201).json({
      success: true,
      clientSecret: myPayment.client_secret,
    });
  }
);
