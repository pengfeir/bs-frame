import React, { useState } from 'react';
import { Layout, Breadcrumb } from 'antd';
import SideMenu from "@/container/menu";
import "./index.less";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
const { Header, Content, Sider } = Layout;
const View: React.FC = props => {
  const [state, setState] = useState({ collapsed: false });

  return (
    <Layout className="layout" >
      <Sider trigger={null} collapsible collapsed={state.collapsed}>
        <div className="logo" />
        <SideMenu></SideMenu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setState({ collapsed: !state.collapsed }),
          })}
        </Header>
        <Content
          style={{
            margin: '0 16px'
          }}
        ><Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {props.children}
          </div>
        </Content>
      </Layout>
    </Layout >
  )
}
export default View;

