import Vue from 'vue'
import Router from 'vue-router'
import Buy from '../components/Buy'
import Sell from '../components/Sell'
import QuerySell from '../components/query/QuerySell'
import QueryBuy from '../components/query/QueryBuy'
import UserList from '../components/query/UserList'
import UserInfo from '../components/user/UserInfo'
import AddUser from '../components/user/AddUser'
import GoodType from '../components/good/GoodType'
import GoodKind from '../components/good/GoodKind'
import TypeInfo from '../components/good/TypeInfo'
import AddType from '../components/good/AddType'
import AddKind from "../components/good/AddKind"
import PrintDetail from "../components/GoodDetail"

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect:'/sell'
    },
    {
      path: '/buy',
      name: 'Buy',
      component: Buy
    },
    {
      path: '/sell',
      name: 'Sell',
      component: Sell
    },
    {
      path: '/query/sell',
      name: 'QuerySell',
      component: QuerySell
    },
    {
      path: '/query/buy',
      name: 'QueryBuy',
      component: QueryBuy
    },
    {
      path: '/query/user',
      name: 'UserList',
      component: UserList
    },
    {
      path: '/user/userInfo/:id',
      name: 'UserInfo',
      component: UserInfo
    },
    {
      path: '/user/addUser',
      name: 'AddUser',
      component: AddUser
    },
    {
      path: '/good/type',
      name: 'GoodType',
      component: GoodType
    },
    {
      path: '/good/addType',
      name: 'AddType',
      component: AddType
    },
    {
      path: '/good/typeInfo/:id',
      name: 'TypeInfo',
      component: TypeInfo
    },
    {
      path: '/good/kind',
      name: 'GoodKind',
      component: GoodKind
    },
    {
      path: '/good/addKind',
      name: 'AddKind',
      component: AddKind
    },
    {
      path: '/print/detail',
      name: 'PrintDetail',
      component: PrintDetail
    }
  ]
})
