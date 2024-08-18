import mongoose, {Document, Schema, Model} from "mongoose";

export interface IOrder extends Document{
    userId: string,
    courseId: string,
    paymentInfo: object
}

const orderSchema: Schema<IOrder> = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    courseId: {
        type: String,
        required: true,
    },
    paymentInfo: {
        type: Object,
        required: true,
    },
}, {timestamps: true})

export const Order: Model<IOrder> = mongoose.model("Order", orderSchema);