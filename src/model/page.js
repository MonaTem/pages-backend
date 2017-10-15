const mongoose = require('mongoose');


// eslint-disable-next-line
const pageSchema = mongoose.Schema({
  url: String,
  raw_content: String,
  date: {type: Date, default: Date.now},
});

const Page = mongoose.model('Page', pageSchema);

exports.Page = Page;
