const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('kcors');
const mongoose = require('mongoose');
const passport = require('koa-passport');
const session = require('koa-session');
const {save, findAll} = require('./dao/pageDao.js');

require('./auth.js');

// MongoDB setup.
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/pages', {useMongoClient: true});

const app = new Koa();
app.proxy = true;

app.keys = ['secret'];
app.use(session({}, app));

app.use(passport.initialize());
app.use(passport.session());

const router = new Router();
router
    .post('/login',
        passport.authenticate('local', {
          successRedirect: '/page/search',
          failureRedirect: '/',
        })
    )
    .get('/logout', async (ctx) => {
      ctx.logout();
      ctx.redirect('/');
    })
    .get('/', async (ctx) => {
      ctx.body = '<h1>Home Get</h1>';
    })
    .post('/', async (ctx) => {
      ctx.body = `<h1>Home Post</h1><p>${JSON.stringify(ctx.request.body)}</p>`;
    })
    .post('/page/save', async (ctx) => {
      if (ctx.isAuthenticated()) {
        try {
          ctx.body = await save(ctx.request.body.data);
        } catch (err) {
          console.log(`Save Error: ${err}`);
          ctx.body = `error: ${err}`;
        }
      } else {
        ctx.redirect('/');
      }
    })
    .get('/page/search', async (ctx) => {
      if (ctx.isAuthenticated()) {
        try {
          ctx.body = await findAll();
        } catch (err) {
          console.log(`Search Error: ${err}`);
          ctx.body = `error: ${err}`;
        }
      } else {
        ctx.redirect('/');
      }
    });

app
    .use(bodyParser())
    .use(cors())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);
console.log('listening on 3000');
