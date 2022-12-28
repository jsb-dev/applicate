// import mongoose and dotenv
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Use process.env object to access environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// Set strictQuery to false to allow for partial matching
mongoose.set('strictQuery', true);

// Connect to MongoDB database
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connection object
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => {
  console.log('Connected to MongoDB database');
});

// Export the connection
export default connection;
