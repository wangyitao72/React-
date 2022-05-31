import React from 'react'
import { Button, Form, Input, Select } from 'antd';
import './Login.scss'
import { useDispatch } from 'react-redux'
import { login } from '../../store/modules/user'
import { useNavigate } from 'react-router-dom'
const { Option } = Select;
const handleChange = (value) => {
  console.log(`selected ${value}`);
};

export default function Login() {
  let dispatch = useDispatch();
  let navigate = useNavigate()
  const onFinish = (values) => {
    console.log('Success:', values);

    dispatch(login(values)).then((res) => {
      if (res) {
        navigate('/home')
      }
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const goRegister = () => {
    navigate('/register')
  }
  return (
    <>
      <Form
        className="Login"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}

        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        validateTrigger="onBlur"
        initialValues={{
          "role":"员工"
        }}
      >
        <h2>登陆</h2>
        <Form.Item
          label="账号："
          name="username"
          rules={[
            {
              required: true,
              message: '请输入您的用户名!',
            },
          ]}
        >
          <Input placeholder='请输入您的用户名' autoComplete="off" />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: '请输入您的密码!',
            },
          ]}
        >
          <Input.Password placeholder='请输入您的密码！' autoComplete="off" />
        </Form.Item>

        <Form.Item
          name="role"
          label="身份"
        >
          <Select
          // defaultValue="员工"
            style={{
              width: 120,
            }}
            onChange={handleChange}
          >
            <Option value="员工">员工</Option>
            <Option value="管理员">管理员</Option>
          </Select>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            登录
          </Button>

          <Button className='rbtn' onClick={goRegister}>
            注册成为员工
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
