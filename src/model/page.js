const mongoose = require('mongoose');

const pageSchema = mongoose.Schema({
  url: String,
  raw_content: String,
  date: { type: Date, default: Date.now },
});

const Page = mongoose.model('Page', pageSchema);

exports.pageSchema = pageSchema;
exports.Page = Page;
