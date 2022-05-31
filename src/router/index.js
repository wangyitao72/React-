import {lazy} from 'react'

const Index = lazy(()=> import('../views/Index/Index'))
const Login = lazy(()=> import('../views/Login/Login'))
const Register = lazy(()=>import('../views/Register/Register'))
const Home = lazy(()=>import('../views/Home/Home'))
const ListView = lazy(()=>import('../views/ListView/ListView'))
const AddAdmin = lazy(()=>import('../views/AddAdmin/AddAdmin'))
const AddRelic = lazy(()=>import('../views/AddRelic/AddRelic'))
const Extract = lazy(()=>import('../views/Extract/Extract')) 
const Approval = lazy(()=>import('../views/Approval/Approval'))

const routes = [
    {
        path:'/',
        component:Index,
        meta:{
            auth:true
        },
        children:[
            {
                path:'home',
                component:Home,
                meta:{
                    auth:true
                },
            },
            {
                path:'/relic/list',
                component:ListView,
                meta:{
                    auth:true
                },
            },
            {
                path:'/relic/addrelic',
                component:AddRelic,
                meta:{
                    auth:true
                },
            },
            {
                path:'/relic/extract',
                component:Extract,
                meta:{
                    auth:true
                },
            },
            {
                path:'/action/addadmin',
                component:AddAdmin,
                meta:{
                    auth:true
                },
            },
            {
                path:'/action/approval',
                component:Approval,
                meta:{
                    auth:true
                },
            },
            
        ]
    },
    {
        path:'/login',
        component:Login,
        meta:{
            auth:false
        }
    },
    {
        path:'/register',
        component:Register,
        meta:{
            auth:false
        }
    }
]
const beforeEach = (meta,token) => {
    
    if(meta?.auth === true && !token){
        return '/login';
      }
  };

export { 
    routes,
    beforeEach
  }