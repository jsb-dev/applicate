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
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Start typing here...',
              },
            ],
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

  let uniqueUrl;
  let urlFound = true;
  while (urlFound) {
    uniqueUrl = `${this.fileName
      .toLowerCase()
      .replace(/ /g, '')}-${randomString()}`;

    const count = await UniqueUrl.countDocuments({ url: uniqueUrl }).exec();
    if (count === 0) {
      urlFound = false;
    }
  }

  try {
    this.uniqueUrl = uniqueUrl;
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
