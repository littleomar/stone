const Koa = require('koa')
const Router = require('koa-router')
const mongoose = require('mongoose')
const koaBodyparser = require('koa-bodyparser')
const cors = require('koa2-cors')



const dbconfig = require('./dbs/config')
const costomerRouter = require('./interface/costomer')
const goodRouter = require('./interface/goods')

const app = new Koa();
app.use(koaBodyparser())
app.use(cors())

mongoose.connect(dbconfig.dbs,{
  useNewUrlParser: true
})



app.use(costomerRouter.routes()).use(costomerRouter.allowedMethods())
app.use(goodRouter.routes()).use(goodRouter.allowedMethods())


app.listen(3000,'0.0.0.0')
