import mongoose from "mongoose";


const db = async () => {
    try {
        mongoose.set('strictQuery', true)
        const mongoUrl = process.env.NODE_ENV === 'production' ? process.env.MONGO_URL_PRODUCTION : process.env.MONGO_URL;
        await mongoose.connect(mongoUrl);
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
}


export default db