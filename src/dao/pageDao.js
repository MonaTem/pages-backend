const {Page} = require('./../model/page.js');
const mongoose = require('mongoose');

const EMPTY_FUNCTION = () => {};

/**
 * Saves data.
 * @returns {!Promise}
 */
const save = (data, onError, onSuccess) => {
  if (!data) {
    return;
  }
  const page = new Page(data);
  return page.save();
};

/**
 * Queries all pages.
 * @returns {!Promise}
 */
const findAll = () => {
  return Page.find().exec();
};

exports.save = save;
exports.findAll = findAll;