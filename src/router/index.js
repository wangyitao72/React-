import {lazy} from 'react'

const Index = lazy(()=> import('../views/Index/Index'))
const Login = lazy(()=> import('../views/Login/Login'))
const Register = lazy(()=>import('../views/Register/Register'))
// import Index from '../views/Index/Index'
// import Login from '../views/Login/Login'
// import Register from '../views/Register/Register'

const Home = lazy(()=>import('../views/Home/Home'))
const ListView = lazy(()=>import('../views/ListView/ListView'))
const Test = lazy(()=>import('../views/Test/Test'))


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
                path:'list',
                component:ListView,
                meta:{
                    auth:true
                },
            },
            {
                path:'action/test',
                component:Test,
                meta:{
                    auth:true
                },
            }
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