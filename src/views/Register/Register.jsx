import React from 'react'
import { Button, Form, Input } from 'antd';
import './Register.scss'
import {useDispatch} from 'react-redux'
import {register} from '../../store/modules/user'
import {useNavigate} from 'react-router-dom'

export default function Register() {
  let dispatch = useDispatch();
  let navigate = useNavigate()

  const onFinish = (values) => {
    console.log('Success:', values);

    dispatch(register(values)).then((res)=>{
        console.log(res)
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const goRegister = ()=>{
    navigate('/login')
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
      >
          <h2>员工注册-注册成为员工</h2>
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
          <Input placeholder='请输入您的用户名' />
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
          <Input.Password  placeholder='请输入您的密码！'/>
        </Form.Item>


        <Form.Item
        
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            注册
          </Button>

          <Button className='rbtn' onClick={goRegister}>
            返回登陆
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
