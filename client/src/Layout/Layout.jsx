import React from 'react';
import { Divider } from 'antd';
import './Layout.scss';


const AppLayout = ({ children }) => {

  return (

    <div className="app-container">{children}<Divider /></div>
  )
};

export default AppLayout;
