import mongoose from "mongoose";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
const db = async () => {
    try {
        mongoose.set('strictQuery', true)
        const mongoUrl = process.env.NODE_ENV === 'production' ? process.env.MONGO_URL_PRODUCTION : process.env.MONGO_URL;
        await mongoose.connect(mongoUrl, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.log(error);
    }
    finally {
        await mongoose.disconnect();
    }
    
}


export default db