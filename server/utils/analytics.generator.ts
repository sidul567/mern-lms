import { Document, Model } from "mongoose";

interface MonthData {
    month: string,
    count: number
}

export async function generateLast12MonthsData<T extends Document>(model: Model<T>): Promise<{last12Months: MonthData[]}>{
    const last12Months = [];
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate()+1);

    for(let i = 11; i >= 0; i--){
        const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - i * 28);
        const startDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() - 28);

        const dateFormat = endDate.toLocaleString("default", {
            month: "short",
            year: "numeric",
            day: "numeric",
        })

        const count = await model.countDocuments({
            createdAt: {
                $gte: startDate,
                $lt: endDate
            }
        })
        last12Months.push({month: dateFormat, count});
    }
    return {last12Months};
}