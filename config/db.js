import mongoose from 'mongoose';

const connectDB = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URI, {});
  console.log(`MongoDB connected: ${connection.connection.host}`.green.bold);
};

export default connectDB;