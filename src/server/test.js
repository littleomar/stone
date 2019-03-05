// const axios = require('axios')
// const SHA1 = require('sha1')
// const appId = "A6006299967411"
// const appKey =  "8FE2F17B-6CF4-6070-5AFC-CAAA683FA170"
// let now = Date.now()
//
// var realAppKey = SHA1(appId+"UZ"+appKey+"UZ"+now)+"."+now
//
// axios.get('https://d.apicloud.com/mcm/api/customers/count?filter=%7B%22where%22%3A%7B%7D%7D',{
//   "cache": false,
//   "headers": {
//     "X-APICloud-AppId": appId,
//     "X-APICloud-AppKey": realAppKey
//   }
// }).then(res=>{
//   console.log(res.data);
// })

const fetchApiData = require('./utils')


fetchApiData({url:'https://d.apicloud.com/mcm/api/customers?filter={}'}).then(res=>{
  console.log(res.data.length)
})
