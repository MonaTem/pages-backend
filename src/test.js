const {save, findAll} = require('./dao/pageDao.js');
const {Page} = require('./model/page.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pages', {useMongoClient: true});

const b = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(123);
    }, 3000);
  });
};

const saveTest = async () => {
  const data = await b();
  console.log(data);
}

saveTest();
