import { mongoose, Schema } from 'mongoose';

const uniqueUrlSchema = new Schema({
  url: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model('UniqueUrl', uniqueUrlSchema);
