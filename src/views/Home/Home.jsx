import React, { useState, useEffect,useRef } from 'react';
import {
  Form,
  Input,
  Button,
} from 'antd';
import { store } from '../../store';
import jwt_decode from "jwt-decode";
import {updatePassword} from '../../store/modules/user'
import { useDispatch } from 'react-redux'
import './Home.scss'

export default function Home() {
  let dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const  form = useRef()
  const onFinish = (values) => {
    console.log('Success:', values);
    dispatch(updatePassword(values))
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  useEffect(() => {
    let token = store.getState().user.token
    var decode = jwt_decode(token)
    let name = decode.username;
    let ro = decode.role;
    setUsername(name)
    setRole(ro)
    
  }, [])
useEffect(()=>{
  form.current.setFieldsValue({username:username})
  form.current.setFieldsValue({role:role})
},[username,role])
  return (
    <Form
      ref={form}
      name="basic"
      labelCol={{
        span: 1,
      }}
      wrapperCol={{
        span: 8,
      }}
      initialValues={{
        remember: true
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className='Home'
    >
      <h2>{username}</h2>
      <Form.Item
        label="账号"
        name="username"
      >
        <Input disabled={true}/>
      </Form.Item>

      <Form.Item
        label="身份"
        name="role"
        initialValue={role}
      >
        <Input disabled={true}/>
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
        rules={[
          {
            required: true,
            message: '修改密码时，新密码不能为空！',
          },
        ]}
      >
        <Input placeholder='若想要修改密码，可于此输入新的密码' />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 1,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" className='btn'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
