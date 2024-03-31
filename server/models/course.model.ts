import mongoose, { Document, Schema, Model } from "mongoose";
import { IUser } from "./user.model";

interface IComment extends Document{
    user: IUser,
    question: string,
    questionReplies?: IComment[],
}

interface IReview extends Document{
    user: object,
    rating: number,
    comment: string,
    commentReplies?: IComment[]
}

interface ILink extends Document{
    title: string,
    url: string,
}

interface ICourseData extends Document{
    title: string,
    description: string,
    links: ILink[],
    videoUrl: string,
    videoSection: string,
    videoLength: number,
    videoPlayer: string,
    suggestion: string,
    questions: IComment[],
}

interface ICourse extends Document{
    name: string,
    description: string,
    price: number,
    category: string;
    estimatedPrice?: number,
    thumbnail: {public_id: string, url: string},
    tags: string,
    level: string,
    demoUrl: string,
    prerequisites: {title: string}[],
    benefits: {title: string}[],
    reviews: IReview[],
    courseData: ICourseData[],
    ratings?: number,
    purchased?: number,
}

const reviewSchema: Schema<IReview> = new mongoose.Schema({
    user: Object,
    rating: {
        type: Number,
        default: 0,
    },
    comment: String,
    commentReplies: [],
})

const linkSchema: Schema<ILink> = new mongoose.Schema({
    title: String,
    url: String,
})

const commentSchema: Schema<IComment> = new mongoose.Schema({
    user: Object,
    question: String,
    questionReplies: [Object],
})

const courseDataSchema: Schema<ICourseData> = new mongoose.Schema({
    title: String,
    description: String,
    links: [linkSchema],
    videoUrl: String,
    videoSection: String,
    videoLength: Number,
    videoPlayer: String,
    suggestion: String,
    questions: [commentSchema],
})

const courseSchema: Schema<ICourse> = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    estimatedPrice: Number,
    thumbnail: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    tags: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
    demoUrl: {
        type: String,
        required: true,
    },
    prerequisites: [{title: String}],
    benefits: [{title: String}],
    reviews: [reviewSchema],
    courseData: [courseDataSchema],
    ratings: {
        type: Number,
        default: 0,
    },
    purchased: {
        type: Number,
        default: 0,
    },
}, {timestamps: true})

export const Course: Model<ICourse> = mongoose.model("Course", courseSchema);