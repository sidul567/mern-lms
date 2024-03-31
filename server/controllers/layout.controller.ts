import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import cloudinary from 'cloudinary';
import { Layout } from "../models/layout.model";
import ErrorHandler from "../utils/ErrorHandler";

// Create layout
export const createLayout = catchAsyncError(async(req: Request, res: Response, next: NextFunction)=>{
    const {type} = req.body;
    const isExistType = await Layout.findOne({type: type});

    if(isExistType){
        return next(new ErrorHandler(`${type} already exists`, 400));
    }

    if(type === 'banner'){
        const {image, title, subtitle} = req.body;
        const myCloud = await cloudinary.v2.uploader.upload(image,{
            'folder': 'layout'
        })

        const banner = {
            title,
            subtitle,
            image: {
                public_id: myCloud.public_id,
                url: myCloud.url
            }
        }

        await Layout.create({type, banner});
    }

    if(type === 'faq'){
        const {faq} = req.body;
        await Layout.create({type, faq});
    }

    if(type === 'categories'){
        const {categories} = req.body;
        await Layout.create({type, categories});
    }

    res.status(200).json({
        success: true,
        message: 'Layout created successfully'
    })
})

// Update layout
export const updateLayout = catchAsyncError(async(req: Request, res: Response, next: NextFunction)=>{
    const {type} = req.body;

    if(type === 'banner'){
        const bannerData = await Layout.findOne({type: 'banner'}) as any;
        const {image, title, subtitle} = req.body;
        const banner = {
            title,
            subtitle,
            image
        }
        
        if(!image.startsWith("http")){
            await cloudinary.v2.uploader.destroy(bannerData.banner.image.public_id);
            const myCloud = await cloudinary.v2.uploader.upload(image,{
                'folder': 'layout'
            })
            banner.image = {
                public_id: myCloud.public_id,
                url: myCloud.url
            }
        }else{
            banner.image = bannerData.banner.image;
        }

        await Layout.findByIdAndUpdate(bannerData?._id, {type, banner});
    }

    if(type === 'faq'){
        const {faq} = req.body;
        const faqItem = await Layout.findOne({type: 'faq'});
        await Layout.findByIdAndUpdate(faqItem?._id, {type, faq});
    }

    if(type === 'categories'){
        const {categories} = req.body;        
        const categoryItem = await Layout.findOne({type: 'categories'});
        await Layout.findByIdAndUpdate(categoryItem?._id, {type, categories});
    }

    res.status(200).json({
        success: true,
        message: 'Layout updated successfully'
    })
})

// Get layout by type
export const getLayoutByType = catchAsyncError(async(req: Request, res: Response, next: NextFunction) => {
    const {type} = req.params;
    const layout = await Layout.findOne({type});

    if(!layout){
        return next(new ErrorHandler('Invalid layout type', 404));
    }

    res.status(200).json({
        success: true,
        layout
    })
})