import React, { Component } from 'react';
import {Menu} from 'antd';
import { NavLink } from "react-router-dom";
const MENUARR = [
  {
    path:"/content/home",key:"1",label:"首页"
  },
  {
    path:"/content/chart",key:"2",label:"图表"
  }
]
class menu extends Component {
  public render() {
    return (
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        {MENUARR.map(v=>{
          return (<Menu.Item key={v.key}>
          <NavLink to={ v.path }>{ v.label }</NavLink>
        </Menu.Item>)
        })}
      </Menu>
    );
  }
}
export default menu;
