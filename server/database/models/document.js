import { mongoose, Schema } from 'mongoose';
import UniqueUrl from './uniqueUrl.js';
import User from './user.js';

const documentSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    default: '',
  },
  styles: {
    type: String,
    default: 'font-size: 14pt;',
  },
  collaborators: {
    type: Array,
    default: [],
  },
  uniqueUrl: {
    type: String,
  },
});

documentSchema.methods.deleteDocument = function () {
  return this.delete();
};

documentSchema.methods.documentArraySave = function (userId) {
  User.findOne({ _id: userId }).then((user) => {
    user.documentArray.push(this._id);
    return user.save();
  });
};

documentSchema.methods.generateUrl = async function () {
  if (this.fileName.trim().length === 0) {
    throw new Error('Invalid fileName');
  }

  // Use a loop to keep generating a new uniqueUrl until it is not found in the database
  let uniqueUrl;
  let urlFound = true;
  while (urlFound) {
    // Generate a new uniqueUrl using the fileName and a random string
    uniqueUrl = `${this.fileName}-${randomString()}`;

    // Use the countDocuments method to check if the uniqueUrl already exists in the database
    const count = await UniqueUrl.countDocuments({ url: uniqueUrl }).exec();
    if (count === 0) {
      // If the uniqueUrl is not found, set urlFound to false to exit the loop
      urlFound = false;
    }
  }

  try {
    // Save the uniqueUrl to the document
    this.uniqueUrl = uniqueUrl;

    // Create a new UniqueUrl document with the uniqueUrl
    const newUrl = new UniqueUrl({ url: uniqueUrl });
    await newUrl.save();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

function randomString() {
  return Math.random().toString(36).substring(2, 15);
}

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
