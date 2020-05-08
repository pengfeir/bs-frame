import React from 'react';
import { Form, Input, Button } from 'antd';
import "./index.less"
const Login = () => {
  const [loginstatus, setLoginStatus] = React.useState<boolean>(false);
  const onFinish = (values: any) => {
    console.log('Success:', loginstatus);
    setLoginStatus(true)
  };

  const onFinishFailed = (errorInfo: any) => {
    setLoginStatus(true)
    console.log('Failed:', loginstatus);
  };
  const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 4 },
  };
  const tailLayout = {
    wrapperCol: { offset: 10, span: 4 },
  };
  return (
    <div className="app-login">
      <div>{loginstatus ? 1 : 2}</div>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="app-login-form"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入账号' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default Login;