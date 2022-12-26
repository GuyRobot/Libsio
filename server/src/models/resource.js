import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;
const ResourceSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  tags: [
    {
      type: String
    }
  ],
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

ResourceSchema.plugin(mongoosePaginate);

ResourceSchema.statics.findByRef = async function (refModelName, refName, queryParams, company) {
  const Model = mongoose.model(refModelName);
  const docs = await Model.find({ 'slug': company }).exec();
  if (docs != null && docs.length != 0) {
    const merge = {};
    for (const doc of docs) {
      Object.assign(merge, queryParams, {
        [refName]: {
          $in: [
            doc._id
          ]
        }
      });
    }

    return merge;
  }
  return queryParams
}

module.exports = mongoose.model('Resource', ResourceSchema);
