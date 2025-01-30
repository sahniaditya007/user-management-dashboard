import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Test the connection
    await mongoose.connection.db.admin().ping();
    console.log('Database ping successful');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.error('Full error:', error);
    process.exit(1);
  }
};

export default connectDB;
// In backend/config/db.js
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected!');
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected!');
});