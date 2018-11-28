const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const {MongoClient} = require('mongodb');

const app = new Koa();

const {MONGO_HOST = 'localhost'} = process.env;

app.context.db = new MongoClient(`mongodb://${MONGO_HOST}:27017`, {useNewUrlParser: true, reconnectTries: 60, reconnectInterval: 1000})
  .connect()
  .then(client => client.db('farts'));

app.use(bodyParser());

app.use(async ctx => {
  console.log(ctx.method, ctx.url);
  if (ctx.url === '/') {
    let body
    if (ctx.request.method === 'POST' && ctx.request.body != null && typeof (body = ctx.request.body).date === 'string') {
      let date = Date.parse(body.date);
      if (!isNaN(date)) {
        date = new Date(date);
        const db = await ctx.db;
        const r = await db.collection('farts').insertOne({date});
        ctx.response.body = '';
        return;
      }
    }
    ctx.response.status = 405;
    return;

  } else if (ctx.url === '/list' || ctx.url === '/list') {
    const db = await ctx.db;
    const r = await db.collection('farts').find({}).sort({date: -1}).limit(10).toArray();
    ctx.response.body = r;
    return;
  } else if (ctx.url === '/clear' || ctx.url === '/clear/') {
    const db = await ctx.db;
    const r = await db.collection('farts').remove();
    ctx.response.body = '';
    return;
  } else {
    ctx.response.status = 400;
  }
});

app.listen(3000);
