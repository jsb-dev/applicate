// A MongoDB model for a user that accepts an email and password
// The user has a method to generate an auth token using JWT
// The user method will be exported as User
// Password hashing and validation will be handled by controllers/signup.js

// Import mongoose
import { mongoose, Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a new schema for a user
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
  },
  tokens: [
    {
      type: String,
      required: true,
    },
  ],
});

// Create a method to generate an auth token for the user
UserSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: '1 day',
  });
};

//export the model
export default mongoose.model('User', UserSchema);
