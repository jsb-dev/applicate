import { mongoose, Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

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
  documentArray: {
    type: Array,
    default: [],
  },
  tokens: [
    {
      type: String,
      required: true,
    },
  ],
});

UserSchema.methods.generateAuthToken = function () {
  console.log(process.env.JWT_SECRET);
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: '1 day',
  });
};

UserSchema.statics.findById = function (id, cb) {
  return this.find({ _id: id }, cb);
};

export default mongoose.model('User', UserSchema);
