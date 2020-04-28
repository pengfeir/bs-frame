import React, { Component } from 'react';
import { Input, Button } from 'antd';
import "./index.less"
class login extends Component {
  public render() {
    return (
      <>
        <div>222</div>
        <div className="app-login">
          <div>
            <label className="app-login-label">
              用户名
          </label>
            <Input placeholder="输入用户名" />
          </div>
          <div>
            <label className="app-login-label">
              密码
          </label>
            <Input.Password placeholder="输入密码" />
          </div>
          <Button>登录</Button>
        </div>
      </>
    );
  }
}
export default login;