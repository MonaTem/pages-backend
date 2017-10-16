const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('kcors');
const logger = require('koa-logger');
const mongoose = require('mongoose');
const passport = require('./auth.js');
const router = require('./router.js');
const session = require('koa-session');

// MongoDB setup.
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/pages', {useMongoClient: true});

const app = new Koa();
app.proxy = true;

app.keys = ['secret'];
app
    .use(logger())
    .use(session(app))
    .use(passport.initialize())
    .use(passport.session())
    .use(bodyParser())
    .use(cors())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);
console.log('listening on 3000');
