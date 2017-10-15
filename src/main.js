const {save, findAll} = require('./dao/pageDao.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pages', {useMongoClient: true});

// const data = {
//   raw_content: '<html>test</html>',
// };

// save(data);

findAll(
  console.log,
  console.log
);
