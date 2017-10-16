const Router = require('koa-router');
const fs = require('fs');
const passport = require('koa-passport');
const path = require('path');
const {save, findAll} = require('./dao/pageDao.js');


const router = new Router();
router
    .get('/login', async (ctx) => {
      ctx.type = 'html';
      ctx.body = fs.readFileSync(path.join(__dirname, './view/login.html'),
          'utf8');
    })
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

module.exports = router;
