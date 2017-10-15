const {Page} = require('./../model/page.js');


/**
 * Saves data.
 * @param {!Object} data
 * @return {!Promise}
 */
const save = (data) => {
  if (!data) {
    return;
  }
  const page = new Page(data);
  return page.save();
};

/**
 * Queries all pages.
 * @return {!Promise}
 */
const findAll = () => {
  return Page.find().exec();
};

exports.save = save;
exports.findAll = findAll;
