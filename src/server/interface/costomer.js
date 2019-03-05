const Router = require('koa-router')
const fetchApiData = require('../utils')


let router = new Router({prefix: '/api/customer'})

router.get('/info',async ctx=>{
  let query = ctx.request.query
  ctx.body = await fetchApiData({url:`https://d.apicloud.com/mcm/api/customers?filter=${JSON.stringify({limit:999,where:query})}`})
})
router.delete('/delete', async ctx => {
  await fetchApiData({
    method: 'DELETE',
    url: `https://d.apicloud.com/mcm/api/customers/${ctx.request.query.id}`
  })
  ctx.body = {
    message: 'delete success'
  }
})

router.post('/modify',async ctx => {
  let { id,username,region,telephone } = ctx.request.body

  await fetchApiData({
    method: 'PUT',
    url: `https://d.apicloud.com/mcm/api/customers/${id}`,
    data: {
      username,
      region,
      telephone
    }
  })

  ctx.body = {
    message: 'modify success'
  }
})

router.post('/addUser',async ctx => {
  await fetchApiData({
    url: `https://d.apicloud.com/mcm/api/customers`,
    method: "POST",
    data: ctx.request.body
  })

  ctx.body = {
    message: 'add success'
  }
})

module.exports = router
