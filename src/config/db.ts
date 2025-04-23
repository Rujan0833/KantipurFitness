import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    
    // First try with MongoClient to test raw connection
    const client = new MongoClient(process.env.MONGODB_URI as string);
    await client.connect();
    console.log('MongoDB Client Connected successfully');
    await client.close();
    
    // Then connect with mongoose
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(`MongoDB Mongoose Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error('MongoDB Connection Error:');
      console.error(`Error Name: ${error.name}`);
      console.error(`Error Message: ${error.message}`);
      if (error.stack) {
        console.error('Stack:', error.stack);
      }
    } else {
      console.error('An unknown error occurred:', error);
    }
    process.exit(1);
  }
};

export default connectDB; 