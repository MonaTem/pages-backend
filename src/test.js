const {save, findAll} = require('./dao/pageDao.js');
const {Page} = require('./model/page.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pages', {useMongoClient: true});

const saveTest = async () => {
  const data = await save({raw_content: 'async await'});
  console.log(data);
}

saveTest();