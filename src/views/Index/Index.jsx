import {
  LaptopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserAddOutlined,
  HomeOutlined,
  AntDesignOutlined,
  DatabaseOutlined,
  SendOutlined,
  ImportOutlined,
  IdcardOutlined,
  CodeSandboxOutlined,
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
  const [role, setRole] = useState('')
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
    setRole(
      decode.role
    )
  }, [])

  let board = () => {
    switch (location.pathname) {
      case '/action/addadmin':
        return <div>管理员操作  /  新增成员</div>
      case '/action/approval':
        return <div>管理员操作  /  文物审批</div>
      case '/relic/list':
        return <div>文物管理  /  文物列表</div>
      case '/home':
        return <div>个人信息</div>
      case '/relic/addrelic':
        return <div>文物管理  /  添加文物</div>
      case '/relic/extract':
        return <div>文物管理  /  取出文物</div>

      default:
        return <div>您进入到未知的领域了呢</div>
    }
  }
  let auth = () => {
    if (role === '管理员') {
      return false;
    } else {
      return true
    }
  }
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
              icon: <IdcardOutlined />,
              label: <Link to={'/home'}>个人信息</Link>
            },
            {
              key: '/relic',
              icon: <AntDesignOutlined />,
              label: '文物管理',
              children: [
                {
                  key: '/relic/list',
                  icon: <DatabaseOutlined />,
                  label: <Link to={'/relic/list'}>文物列表</Link>
                },
                {
                  key: '/relic/addrelic',
                  icon: <SendOutlined />,
                  label: <Link to={'/relic/addrelic'}>添加文物</Link>
                },
                {
                  key: '/relic/extract',
                  icon: <ImportOutlined />,
                  label: <Link to={'/relic/extract'}>取出文物</Link>
                }
              ]
            },
            {
              key: '/action',
              icon: <LaptopOutlined />,
              label: '管理员操作',
              disabled: auth(),
              children: [
                {
                  key: '/action/addadmin',
                  icon: <UserAddOutlined />,
                  label: <Link to={'/action/addadmin'}>新增成员</Link>
                },
                {
                  key: '/action/approval',
                  icon: <CodeSandboxOutlined />,
                  label: <Link to={'/action/approval'}>文物审批</Link>
                },
              ],

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
              {/* <a href={location.pathname}>{(location.pathname).substr(1)}</a> */}

              {
                board()
              }
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
