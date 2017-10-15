const {Page} = require('./../model/page.js');
const mongoose = require('mongoose');

const EMPTY_FUNCTION = () => {};

/**
 * Saves data.
 * @param {!Object} data
 * @param {!Function=} onError
 * @param {!Function=} onSuccess
 */
const save = (data, onError, onSuccess) => {
  if (!data) {
    return;
  }
  onError = onError || EMPTY_FUNCTION;
  onSuccess = onSuccess || EMPTY_FUNCTION;

  const page = new Page(data);
  page.save(function (err, page) {
    if (err) {
      onError(err);
      return;
    }
    onSuccess(page);
  });
};

/**
 * Queries all pages.
 * @param {!Function=} onError
 * @param {!Function=} onSuccess
 */
const findAll = (onError, onSuccess) => {
  onError = onError || EMPTY_FUNCTION;
  onSuccess = onSuccess || EMPTY_FUNCTION;

  Page.find((err, pages) => {
    if (err) {
      onError(err);
      return;
    }
    onSuccess(pages);
  });
};

exports.save = save;
exports.findAll = findAll;