// A MongoDB database model for a user including a username, password, and email address.
// The password is hashed using bcryptjs and the email address is validated using validator.
// The model is exported as User.

// Import mongoose and bcryptjs
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

// Define a schema
const Schema = mongoose.Schema;

// Define a schema for a user
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: (value) => {
        return validator.isEmail(value);
      },
    },
  },
  {
    timestamps: true,
  }
);

// Define a pre-save hook for the user schema
userSchema.pre('save', function (next) {
  // Hash the password
  bcrypt.hash(this.password, 10, (error, hash) => {
    if (error) {
      next(error);
    }

    // Replace the password with the hash
    this.password = hash;
    next();
  });
});

// Define a method for the user schema to compare a password with the hashed password
userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

// Define a model
const User = mongoose.model('user', userSchema);

// Export the model
export default User;
