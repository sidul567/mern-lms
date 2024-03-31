import { Redis } from "ioredis";

const redisClient = ()=>{
    if(process.env.REDIS_URL){
        console.log("Redis client connected");
        return process.env.REDIS_URL;
    }
    throw new Error("Redis client not connected");
}

export const redis = new Redis(redisClient());