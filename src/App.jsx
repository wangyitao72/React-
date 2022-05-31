import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { routes, beforeEach } from './router';
import { store } from './store'
import { Spin } from 'antd';
import {Suspense} from 'react'
import './App.css';


function App() {
  let location = useLocation()
  let ret = [];
  routes.forEach((route) => {
    ret.push(route);
    if (route.children) {
      route.children.forEach((childRoute) => {
        let cloneChildRoute = { ...childRoute };
        cloneChildRoute.path = route.path + childRoute.path
        ret.push(cloneChildRoute);
      })
    }
  })
  let meta = ret.find((v) => v.path === location.pathname)?.meta;
  const token = store.getState().user.token;
  let navigateUrl = beforeEach(meta, token)
  return (
    <div className="App">
      <Suspense fallback={<Spin className='spin'></Spin>}>
      <Routes>
        {
          routes.map((v) => {
            return (
              <Route path={v.path} key={v.path} element={navigateUrl ? <Navigate to={navigateUrl} /> : <v.component />}>
                {v.children && v.children.map((v) => {
                  return <Route path={v.path} key={v.path} element={navigateUrl ? <Navigate to={navigateUrl} /> : <v.component />} />
                })}
              </Route>
            )
          })
        }
        <Route path="*" element={<Navigate to='/home'></Navigate>}></Route>
      </Routes>
      </Suspense>
    </div>
  );
}

export default App;
