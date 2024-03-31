require("dotenv").config();
import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { error } from './middleware/error';
import userRouter from './routes/user.route';
import courseRouter from './routes/course.route';
import orderRouter from './routes/order.route';
import notificationRouter from './routes/notification.route';
import analyticsRouter from './routes/analytics.route';
import layoutRouter from './routes/layout.router';

export const app = express();

// Body Parser
app.use(express.json({'limit': '50mb'}));

// Cookie Parser
app.use(cookieParser());

// CORS setup
app.use(cors({
    'origin': ['http://localhost:3000'],
    'credentials': true
}))

// TEST API
app.use("/test", (req: Request, res: Response, next: NextFunction)=>{
    res.cookie('my_cookie', '123', { maxAge: 900000, httpOnly: true });
    req.cookies.my_cookie = "123";
    // res.json({
    //     success: true,
    //     message: "Test api created successfully!"
    // })
    next();
})

// All Routes
app.use("/api/v1", userRouter);
app.use("/api/v1", courseRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", notificationRouter);
app.use("/api/v1", analyticsRouter);
app.use("/api/v1", layoutRouter);

// Not found route
app.use("*", (req: Request, res: Response, next: NextFunction)=>{
    const err = new Error(`${req.originalUrl} is not found!`) as any;
    err.statusCode = 404;
    next(err);
})

// Error handler
app.use(error)