import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";

export const error = (err: any, req: Request, res: Response, next: NextFunction)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // MongoDB error
    if(err.name === "CastError"){
        const message = `Resouce not found. Invalid id: ${err.path}`;
        err = new ErrorHandler(message, 404);
    }
    
    // Duplicate key error
    if(err.code === 11000){
        const message = `Duplicate key: ${Object.keys(err.keyValue)}`;
        err = new ErrorHandler(message, 404);
    }

    // jsonwebtoken error
    if(err.name === "JsonWebTokenError"){
        const message = "Invalid token";
        err = new ErrorHandler(message, 401);
    }

    // Token expired error
    if(err.name === "TokenExpiredError"){
        const message = "Token has been expired";
        err = new ErrorHandler(message, 401);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
}