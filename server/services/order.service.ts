import { Response } from "express";
import { Order } from "../models/order.model";

export const newOrder = async (data: any, res: Response) => {
  try {
    const order = await Order.create(data);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// get all orders
export const getAllOrdersService = async(res: Response)=>{
  try{
      const orders = await Order.find().sort({createdAt: -1});
      
      res.status(200).json({
          success: true,
          orders
      })
  }catch(err:any){
      res.status(500).json({
          success: false,
          error: err.message
      })
  }
}