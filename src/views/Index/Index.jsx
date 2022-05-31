import {
  AppstoreOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RobotOutlined,
  BankOutlined,
  HomeOutlined,
  BorderlessTableOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Spin, Breadcrumb } from 'antd';
import React, { useState, useEffect, Suspense } from 'react';
import { store } from '../../store'
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux'
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom'
import './Index.scss'
const { Header, Sider, Content } = Layout;


export default function Index() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [username, setUsername] = useState('')
  const location = useLocation();
  const match = location.pathname.match(/^\/[a-z]+/);
  let prevPathname = '';
  if (match) {
    prevPathname = match[0];
  }
  let logout = () => {
    dispatch({
      type: 'user/updateToken',
      payload: ''
    })
    navigate('/login')
  }

  useEffect(() => {
    let token = store.getState().user.token
    var decode = jwt_decode(token)
    setUsername(
      decode.username
    )
  }, [])
  return (
    <Layout className='Index'>

      <Sider trigger={null} collapsible collapsed={collapsed} className='side'>
        {collapsed ? <h3 className='title'>博物馆</h3> : <h2 className='title'>博物馆管理系统</h2>}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          defaultOpenKeys={[prevPathname]}
          items={[
            {
              key: '/home',
              icon: <BankOutlined />,
              label: <Link to={'/home'}>Home</Link>
            },
            {
              key: '/list',
              icon: <BorderlessTableOutlined />,
              label: <Link to={'/list'}>List</Link>

            },
            {
              key: '/action',
              icon: <AppstoreOutlined />,
              label: '没想好写啥功能',
              children: [
                {
                  key: '/action/test',
                  icon: <RobotOutlined />,
                  label: <Link to={'/action/test'}>Test</Link>
                }
              ]
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <div className='userbox'>{username}  <span onClick={logout}>登出</span> </div>

          <Breadcrumb className='board'>
            <Breadcrumb.Item href="">
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href={location.pathname}>{(location.pathname).substr(1)}</a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >

          <Suspense fallback={<Spin className='spin'></Spin>}>
            <Outlet></Outlet>
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
}
