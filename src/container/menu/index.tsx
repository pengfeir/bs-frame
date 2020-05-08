import React from 'react';
import { Menu } from 'antd';
import { NavLink } from "react-router-dom";
const MENUARR = [
  {
    path: "/content/home", key: "1", label: "首页"
  },
  {
    path: "/content/chart", key: "2", label: "图表"
  },
  {
    path: "/content/form", key: "3", label: "表单"
  }
]
const SideMenu: React.FC = () => {
  let path = window.location.pathname,
    pathKey = MENUARR.find(v => v.path === path) || MENUARR[0];
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={[pathKey.key]}>
      {MENUARR.map(v => {
        return (<Menu.Item key={v.key}>
          <NavLink to={v.path}>{v.label}</NavLink>
        </Menu.Item>)
      })}
    </Menu>
  );
}
export default SideMenu;
