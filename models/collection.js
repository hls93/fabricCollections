const mongoose = require('mongoose');

// get a reference to Schema
const Schema = mongoose.Schema;

// create a schema for a contact
const collectionSchema = new Schema({
  typeOf: { type: String, required: true },
  yards: { type: Number, required: true },
  description: {
    color: String,
    sparkly: Boolean,
    patterned: Boolean
  },
  purchased: ['Joann', 'Michaels', 'AC Moore', 'Etsy']
});

// create a model for a Contact
const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;
