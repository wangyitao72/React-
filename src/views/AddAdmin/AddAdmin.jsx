import React from 'react'
import { Button, Form, Input, Select } from 'antd';
import { useDispatch } from 'react-redux'
import { register } from '../../store/modules/user'
import './AddAdmin.scss'

export default function AddAdmin() {
  const { Option } = Select;
  let dispatch = useDispatch();
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };
  const onFinish = (values) => {
    console.log('Success:', values);
    dispatch(register(values)).then((res) => {
      setTimeout(()=>{
        onReset()
      },500)
    })
  
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 2,
      }}
      wrapperCol={{
        span: 8,
      }}
      initialValues={{
        remember: true,
        role: '员工'
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="身份"
        name="role"
        rules={[
          {
            required: true,
            message: '请选择用户的身份！',
          },
        ]}
      >
        <Select
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
          offset: 2,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          添加
        </Button>
      </Form.Item>
    </Form>
  )
}
