import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URI_DB = process.env.URI_DB;

const connectDB = async () => {
    try {
        await mongoose.connect(URI_DB);
        console.info("Conexión con la DB");
    } catch (error) {
        console.error({ error });
        process.exit(1);
    }
};

export default connectDB;
