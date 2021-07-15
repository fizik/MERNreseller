import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreteIndex: true,
    });
    console.log(`MongoDB connected : ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error:${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
