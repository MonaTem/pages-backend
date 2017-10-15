const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('kcors');
const Koa = require('koa');
const mongoose = require('mongoose');
const router = new Router();
const {save, findAll} = require('./dao/pageDao.js');


// MongoDB setup.
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/pages', {useMongoClient: true});

const app = new Koa();

router
    .get('/', async (ctx) => {
      ctx.body = '<h1>Home Get</h1>';
    })
    .post('/', async (ctx) => {
      ctx.body = `<h1>Home Post</h1><p>${JSON.stringify(ctx.request.body)}</p>`;
    })
    .post('/page/save', async (ctx) => {
      try {
        ctx.body = await save(ctx.request.body.data);
      } catch (err) {
        console.log(`Save Error: ${err}`);
        ctx.body = `error: ${err}`;
      }
    })
    .get('/page/search', async (ctx) => {
      try {
        ctx.body = await findAll();
      } catch (err) {
        console.log(`Search Error: ${err}`);
        ctx.body = `error: ${err}`;
      }
    });

app
    .use(bodyParser())
    .use(cors())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);
console.log('listening on 3000');
