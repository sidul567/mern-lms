import { Response } from "express";
import { redis } from "../utils/redis";
import { User } from "../models/user.model";

// Get user by ID
export const getUserById = async (id: string, res: Response) => {
    try{
        const userJson = await redis.get(id);
    const user = userJson? JSON.parse(userJson) : null;
    res.status(200).json({
        success: true,
        user
    })
    }catch(err:any){
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

// get all users
export const getAllUsersService = async(res: Response)=>{
    try{
        const users = await User.find().sort({createdAt: -1});
        
        res.status(200).json({
            success: true,
            users
        })
    }catch(err:any){
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

// Update user role
export const updateUserRoleService = async(res: Response, email: string, role: string)=>{
    try{
        const user = await User.findOneAndUpdate({email}, {role}, {new: true})
        
        res.status(200).json({
            success: true,
            user
        })
    }catch(err:any){
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}