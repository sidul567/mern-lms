import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import { Notification } from "../models/notification.model";
import cron from 'node-cron';

// Get all notifications
export const getNotifications = catchAsyncError(async(req: Request, res: Response, next: NextFunction)=>{
    const notifications = await Notification.find().sort({createdAt: -1});

    res.status(200).json({
        success: true,
        notifications
    })
})

// Update notification
export const updateNotification = catchAsyncError(async(req: Request, res: Response, next: NextFunction) => {
    const {notificationId} = req.params;

    await Notification.findByIdAndUpdate(notificationId, {status: 'read'} , {new: true});

    const notifications = await Notification.find().sort({createdAt: -1});

    res.status(200).json({
        success: true,
        notifications
    }) 
})

cron.schedule("0 0 0 * * *", async ()=>{
    const thiryDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    await Notification.deleteMany({
        status: 'read',
        createdAt: {
            $lt: thiryDaysAgo
        }
    })
    console.log("Read notifications deleted!")
})