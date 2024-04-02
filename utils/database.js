import mongoose from "mongoose";

let isConnected = false; // track database connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected')
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "shared_prompts",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log('MongoDB is connected')
    } catch (error) {
        console.log('MongoDB connection error', error)
    }
}

