import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "./catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { redis } from "../utils/redis";

// Authenticated User
export const isAuthenticate = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;
    
    if (!token) {
      return next(new ErrorHandler("Please login at first!", 401));
    }

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN as Secret
    ) as JwtPayload;

    if(!decoded){
        return next(new ErrorHandler("Invalid token!", 401));
    }

    const user = await redis.get(decoded.id);

    if(!user){
        return next(new ErrorHandler("Please login at first!", 401));
    }

    req.user = JSON.parse(user);
    next();
  }
);


// Authorize user role
export const authorizedRoles = (...roles: string[])=>{
    return catchAsyncError(async(req: Request, res: Response, next: NextFunction)=>{
        if(!roles.includes(req.user?.role || '')){
            return next(new ErrorHandler("You are not authorized to access this route!", 401));
        }
        next();
    })
}