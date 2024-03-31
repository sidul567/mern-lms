import mongoose, { Document, Schema, Model } from "mongoose";

interface FAQItem extends Document {
    question: string,
    answer: string
}

interface Category extends Document{
    title: string,
}

interface BannerImage extends Document{
    public_id: string,
    url: string
}

interface Layout extends Document{
    type: string,
    faq: FAQItem[],
    categories: Category[],
    banner: {
        title: string,
        subtitle: string,
        image: BannerImage
    }
}

const faqSchema: Schema<FAQItem> = new mongoose.Schema({
    question: String,
    answer: String,
})

const categorySchema: Schema<Category> = new mongoose.Schema({
    title: String,
})

const bannerImageSchema: Schema<BannerImage> = new mongoose.Schema({
    public_id: String,
    url: String,
})

const layoutSchema: Schema<Layout> = new mongoose.Schema({
    type: String,
    faq: [faqSchema],
    categories: [categorySchema],
    banner: {
        title: String,
        subtitle: String,
        image: bannerImageSchema,
    }
})

export const Layout: Model<Layout> = mongoose.model("Layout", layoutSchema);