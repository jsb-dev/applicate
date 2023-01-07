import { mongoose, Schema } from 'mongoose';
import UniqueUrl from './uniqueUrl.js';

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
    type: Schema.Types.Mixed,
    default: [
      {
        type: 'paragraph',
        children: [
          {
            text: 'Start typing here...',
          },
        ],
      },
    ],
  },
  collaborators: {
    type: Array,
    default: [],
  },
  uniqueUrl: {
    type: String,
  },
});

documentSchema.methods.generateUrl = async function () {
  if (this.fileName.trim().length === 0 || this.fileName === undefined) {
    throw new Error('Invalid fileName');
  }

  // Use a loop to keep generating a new uniqueUrl until it is not found in the database
  let uniqueUrl;
  let urlFound = true;
  while (urlFound) {
    // Generate a new uniqueUrl using the fileName and a random string
    uniqueUrl = `${this.fileName
      .toLowerCase()
      .replace(/ /g, '')}-${randomString()}`;

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

export default mongoose.model('Document', documentSchema);
