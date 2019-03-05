
const GoodSell = require('../dbs/models/goodsell')
const UserSell = require('../dbs/models/usersell')
const Router = require('koa-router')


const fetchApiData = require('../utils')
let router = new Router({prefix: '/api/goods'})


router.post('/addType',async ctx=>{
  await fetchApiData({
    url: `https://d.apicloud.com/mcm/api/goodtypes`,
    method: 'POST',
    data: ctx.request.body
  })
  ctx.body = {
    message: 'success'
  }
})

router.post('/modifyType',async ctx=>{
  const { id, typeName, price } = ctx.request.body
  await fetchApiData({
    url: `https://d.apicloud.com/mcm/api/goodtypes/${id}`,
    method: "PUT",
    data: {
      typeName,
      price
    }
  })
  ctx.body = {
    message: 'success'
  }
})

router.get('/typeInfo', async ctx => {
  let query = ctx.request.query
  ctx.body = await fetchApiData({
    url: `https://d.apicloud.com/mcm/api/goodtypes?filter=${JSON.stringify(query)}`,
  })
})

router.delete('/deleteType', async ctx => {
  await fetchApiData({
    url: `https://d.apicloud.com/mcm/api/goodtypes/${ctx.request.query.id}`,
    method: "DELETE"
  })
  ctx.body = {
    message: 'delete success'
  }
})

router.post('/kind/add', async ctx => {
  await fetchApiData({
    url: `https://d.apicloud.com/mcm/api/goodkinds`,
    method: "POST",
    data: ctx.request.body
  })
  ctx.body = {
    message: 'kind add success'
  }
})

router.delete('/kind/delete', async ctx => {
  await fetchApiData({
    url: `https://d.apicloud.com/mcm/api/goodkinds/${ctx.request.query.id}`,
    method: "DELETE"
  })
  // await GoodKind.deleteOne({id: ctx.request.query.id})
  ctx.body = {
    message: 'kind delete success'
  }
})

router.get('/kind/type',async ctx => {
  let type = ctx.request.query.id
  ctx.body = await fetchApiData({
    url: `https://d.apicloud.com/mcm/api/goodkinds?filter=${JSON.stringify({where:{type},limit:999})}`
  })
})

router.post('/sell/add', async ctx => {
  const {goods,user,comments,date} = ctx.request.body

  let userSave = await fetchApiData({
    url: `https://d.apicloud.com/mcm/api/usersells`,
    data: {
      name: user.name,
      date,
      comments,
    },
    method: "POST"
  })
  // let userSave = await UserSell.create({
  //   name: user.name,
  //   date,
  //   comments
  // })
  goods.map(async good => {
    await fetchApiData({
      url: `https://d.apicloud.com/mcm/api/goodsells`,
      method: "POST",
      data: {
          manifest: userSave.id,
          name: good.name,
          count: good.count,
          price: good.price,
          meter: good.meter,
          total: good.total,
          goodTime: good.date,
          buyTime: date,
          totalMeter: good.totalMeter,
          comments: good.comments,
          type: good.type
      }
    })
    // await GoodSell.create({
    //   manifest: userSave.id,
    //   name: good.name,
    //   count: good.count,
    //   price: good.price,
    //   meter: good.meter,
    //   total: good.total,
    //   goodTime: good.date,
    //   buyTime: date,
    //   totalMeter: good.totalMeter,
    //   comments: good.comments,
    //   type: good.type
    // })
  })
  ctx.body = {
    message: 'success'
  }
})

router.post('/buy/add',async ctx => {
  const { goods, date } = ctx.request.body
  goods.map( async good => {
    await await fetchApiData({
      url: `https://d.apicloud.com/mcm/api/buygoods`,
      data: {
          name: good.name,
          count: good.count,
          buyTime: date,
          goodTime: good.date,
          comments: good.comments
      },
      method: "POST"
    })
    // await BuyGood.create({
    //   name: good.name,
    //   count: good.count,
    //   buyTime: date,
    //   goodTime: good.date,
    //   comments: good.comments
    // })
  })
  ctx.body = {
    message: 'success'
  }
})

router.get('/buy/query',async ctx => {
  // let buyRes = await BuyGood.find({})
  let buyRes = await fetchApiData({
    url: `https://d.apicloud.com/mcm/api/buygoods?filter=${JSON.stringify({limit:999})}`
  })
  // let kindRes = await GoodKind.find({})
  let kindRes = await fetchApiData({
    url: `https://d.apicloud.com/mcm/api/goodkinds?filter=${JSON.stringify({limit:999})}`
  })
  let kindArr = {}
  let label = ''
  let dateArr = []
  kindRes.map( kind => {
    label = ''
    if (kind.nickname) {
      if (kind.name) {
        label = kind.name+'-'+kind.nickname
      } else {
        label = kind.nickname
      }
    } else {
      label = kind.name
    }
    kindArr[kind.id] = {
      name: label
    }
  })

  let tempArr = []

  buyRes.map( item => {
    let tempObj = {}
    dateArr.push(item.buyTime)
    tempObj = {
      id: item.id,
      name: item.name,
      fullname: kindArr[item.name].name,
      count: item.count,
      buyTime: item.buyTime,
      goodTime: item.goodTime,
      comments: item.comments
    }
    tempArr.push(tempObj)
  })

  ctx.body = {
    goodArr: tempArr,
    dateArr: [...new Set(dateArr)]
  }
})

router.delete('/buy/delete', async ctx => {
  // await BuyGood.deleteOne({id: ctx.request.query.id})
  await fetchApiData({
    url: `https://d.apicloud.com/mcm/api/buygoods/${ctx.request.query.id}`,
    method: 'DELETE'
  })
  ctx.body = {
    message: 'success'
  }
})

router.get('/sell/query', async ctx => {
  let receiptList = []
  let label = ''
  let kindArr = {}
  // let userSellRes = await UserSell.find({})
  let userSellRes = await fetchApiData({
    url: `https://d.apicloud.com/mcm/api/usersells?filter=${JSON.stringify({limit:999})}`
  })
  // let kindRes = await GoodKind.find({})
  let kindRes = await fetchApiData({
    url: `https://d.apicloud.com/mcm/api/goodkinds?filter=${JSON.stringify({limit:999})}`
  })
  kindRes.map( kind => {
    label = ''
    if (kind.nickname) {
      if (kind.name) {
        label = kind.name+'-'+kind.nickname
      } else {
        label = kind.nickname
      }
    } else {
      label = kind.name
    }
    kindArr[kind.id] = label
  })


  for (let i = 0; i < userSellRes.length; ++i ){
    let totalPrice = 0
    // let goodRes = await GoodSell.find({manifest: userSellRes[i].id})
    let goodRes = await fetchApiData({
      url: `https://d.apicloud.com/mcm/api/goodsells?filter=${JSON.stringify({limit:999,where:{manifest: userSellRes[i].id}})}`
    })
    let tempObj = {
      id: userSellRes[i].id,
      username: userSellRes[i].name,
      date: userSellRes[i].date,
      comments: userSellRes[i].comments,
      goodArr: []
    }
    goodRes.map( good => {
      totalPrice += parseInt(good.total)
      tempObj.goodArr.push({
        id: good.id,
        fullname: kindArr[good.name],
        goodId: good.name,
        count: good.count,
        meter: good.meter,
        totalMeter: good.totalMeter,
        price: good.price,
        manifest: good.manifest,
        buyTime: good.buyTime,
        goodTime: good.goodTime,
        total: good.total,
        comments: good.comments
      })
    })
    tempObj.totalPrice = totalPrice


    receiptList.push(tempObj)
  }
  ctx.body = {
    receiptList
  }
})

router.get('/sell/user', async ctx => {
  // let userRes = await UserSell.find({})
  let userRes = await fetchApiData({
    url: `https://d.apicloud.com/mcm/api/usersells?filter=${JSON.stringify({limit:999})}`
  })
  let username = []
  let userArr = []
  userRes.map(user=>{
    username.push(user.name)
  })

  username = [...new Set(username)]


  for (let i = 0; i < username.length; ++i ) {
    let tempObj = {
      value: '',
      manifestArr: []
    }
    tempObj.value = username[i]
    // let userSellRes = await UserSell.find({name:username[i]})
    let userSellRes = await fetchApiData({
      url: `https://d.apicloud.com/mcm/api/usersells?filter=${JSON.stringify({limit:999,name:username[i]})}`
    })
    for (let j = 0;j<userSellRes.length; ++j ) {
      tempObj.manifestArr.push(userSellRes[j].id)
    }
    userArr.push(tempObj)
  }

  ctx.body = {
    userArr
  }
})

router.post('/sell/goodlist', async ctx => {
  let manifestArr = ctx.request.body.manifestArr
  let receiptList = []
  let label = ''
  let kindArr = {}
  // let kindRes = await GoodKind.find({})
  let kindRes = await fetchApiData({
    url: `https://d.apicloud.com/mcm/api/goodkinds?filter=${JSON.stringify({limit:999})}`
  })
  kindRes.map( kind => {
    label = ''
    if (kind.nickname) {
      if (kind.name) {
        label = kind.name+'-'+kind.nickname
      } else {
        label = kind.nickname
      }
    } else {
      label = kind.name
    }
    kindArr[kind.id] = label
  })


  for (let i = 0; i < manifestArr.length; ++i ){
    let totalPrice = 0

    let userSellRes = await UserSell.find({id:manifestArr[i]})
    let goodRes = await GoodSell.find({manifest: manifestArr[i]})
    let tempObj = {
      id: userSellRes[0].id,
      username: userSellRes[0].name,
      date: userSellRes[0].date,
      comments: userSellRes[0].comments,
      goodArr: []
    }

    goodRes.map( good => {
      totalPrice += parseInt(good.total)
      tempObj.goodArr.push({
        id: good.id,
        fullname: kindArr[good.name],
        goodId: good.name,
        count: good.count,
        meter: good.meter,
        totalMeter: good.totalMeter,
        price: good.price,
        manifest: good.manifest,
        buyTime: good.buyTime,
        goodTime: good.goodTime,
        total: good.total,
        comments: good.comments
      })
    })
    tempObj.totalPrice = totalPrice


    receiptList.push(tempObj)
  }
  ctx.body = {
    receiptList
  }
})

router.delete('/sell/delete',async ctx => {
  let id = ctx.request.query.id
  await fetchApiData({
    url: `https://d.apicloud.com/mcm/api/usersells/${id}`,
    method: 'DELETE'
  })

  let deleRes = await fetchApiData({
    url: `https://d.apicloud.com/mcm/api/usersells?filter=${JSON.stringify({limit:999,manifest:id})}`
  })

  deleRes.map(async res=>{
    await fetchApiData({
      url: `https://d.apicloud.com/mcm/api/goodsells/${res.id}`,
      method: "DELETE"
    })
  })
  // await UserSell.deleteOne({id})
  // await GoodSell.deleteMany({manifest: id})
  ctx.body = {
    message: 'delete success'
  }
})


module.exports = router
