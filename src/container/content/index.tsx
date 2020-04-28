import React, { Component } from 'react';
import { Layout } from 'antd';
import Menu from "@/container/menu";
import "./index.less";
import { demo } from "@/api"
const { Header, Content, Sider } = Layout;

class content extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  componentWillMount() {
    this._demo()
  }
  async _demo() {
    try {
      console.log(5555)
      let data = await demo({ name: 1 })
      console.log(data, 2222)
    } catch (err) {

    }
  }
  public render() {
    return (
      <Layout className="layout">
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo" />
          <Menu></Menu>
        </Sider>
        <Layout>
          <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
          <Content style={{ margin: '24px 16px 0' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default content;
